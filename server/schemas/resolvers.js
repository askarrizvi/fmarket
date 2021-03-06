const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order, Stall } = require('../models');
const StallProduct = require('../models/StallProduct');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
stripe.timeout = 10000;
const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        /*const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;*/

        const user = await User.findById(context.user._id);


        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    getUsers: async () => {
      return await User.find().populate('stall.products.details')
    },
    getUserbyId: async (parent, { _id }) => {
      return await User.findById(_id);
    },
    getStallbyId: async (parent, { _id }) => {
      return await Stall.findById(_id);
    },
    getStallbyProdId: async (parent, { prodId }) => {
      const stallparent = Stall.findOne({ 'products._id': prodId }).populate('products.details');
      console.log(stallparent.name);
      return stallparent;
    },
    getAllStalls: async () => {
      const stalls = await Stall.find().populate('products.details');
      return stalls;
    },
    stall: async (parent, { _id }) => {
      return await User.findById(_id).populate('stall.products.details')
    },
    stallProduct: async (parent, { _id }) => {
      return await StallProduct.findById(_id).populate('details');
    },
    order: async (parent, { _id }, context) => {
      return await Order.findById(_id).populate('products');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      //const order = await Order.create({ products: temp });
      //const { products } = await order.populate('products').execPopulate();
      const line_items = [];

      //console.log(args);

      for (let i = 0; i < args.products.length; i++) {
        const prodStallId = args.products[i];
        const stallparent = await Stall.findOne({ 'products._id': prodStallId });
        const stallpop = await stallparent.populate('details').execPopulate();

        var result = stallpop.products.filter(obj => {
          return obj._id == prodStallId
        })

        const prodId = result[0].details;
        const productget = await Product.findById(prodId);
        /* DEBUGGING FOR FOR LOOP
        console.log("j"+j + ":");
        console.log("args ID: "+prodStallId)*/
        //console.log("stal ID: "+compare)
        //const prodId = stallpop.products[j].details;
        //const productget = await Product.findById(prodId);
        /* DEBUGGING FOR STRIPE PRODUCTS
        console.log("--Stripe Products Input--");
        console.log("name: "+ productget.name);
        console.log("description: "+ productget.description);
        console.log("image: "+ `${url}/images/${productget.image}`);*/
        const product = await stripe.products.create({
          name: productget.name,
          description: productget.description,
          images: [`${url}/images/${productget.image}`]
        });

        // generate price id using the product id

        /* DEBUGGING FOR STRIPE PRICES
        console.log("--Stripe Prices Input--");
        console.log("product: "+ product.id);
        console.log("unit_amount: "+ stallpop.products[j].price*100);*/
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: result[0].price * 100,
          currency: 'usd',
        });

        // add price id to the line items array
        /* DEBUGGING FOR LINE ITEMS
        console.log("--Stripe line_items Input--");
        console.log("price: "+ price.id);*/
        line_items.push({
          price: price.id,
          quantity: 1
        });

      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addStall: async (parent, { name, description }, context) => {
      if (context.user) {
        const stall = await Stall.create({ name, description });
        console.log(context.user._id);

        await User.findByIdAndUpdate(context.user._id, { stall: stall }, { new: true }, function (err, result) {
          console.log("error:" + err);
          console.log("result:" + result);
        });

        console.log(stall);

        return stall;
      }
      throw new AuthenticationError('Not logged in');
    },
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    addLike: async (parent, { _id }) => {
      return await Stall.findOneAndUpdate(_id, { $inc: { 'upvotes': 1 } })
    },
    removeLike: async (parent, { _id }) => {
      return await Stall.findOneAndUpdate(_id, { $inc: { 'upvotes': -1 } })
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateStall: async (parent, { _id, productId, price, quantity }, context) => {
      if (context.user) {
        const stallProduct = await StallProduct.create({ productId: productId, price: price, quantity: quantity });

        //console.log(Stall.findById(context.user.stall._id));
        console.log(User.findById(context.user._id));

        await Stall.findByIdAndUpdate(_id, { $push: { products: stallProduct } }, { new: true });

        console.log(stallProduct);
        return stallProduct.populate('productId');
      }
      throw new AuthenticationError('Not logged in');
    },
    updateStallProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;
      return await StallProduct.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    // updateUpvote : async () => {

    // },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
