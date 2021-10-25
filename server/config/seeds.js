const db = require('./connection');
const { User, Stall, StallProduct, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Fruit' },
    { name: 'Vegetables' }
  ]);

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Apple x12',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id
    },
    {
      name: 'Pear x12',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'canned-coffee.jpg',
      category: categories[0]._id
    },
    {
      name: 'Green Pepper',
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'toilet-paper.jpg',
      category: categories[1]._id
    },
    {
      name: 'Red Pepper',
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'soap.jpg',
      category: categories[1]._id
    },
    {
      name: 'Carrot x24',
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'wooden-spoons.jpg',
      category: categories[1]._id
    },
    {
      name: 'Banana x6',
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      image: 'camera.jpg',
      category: categories[0]._id
    },
    {
      name: 'Orange x12',
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      image: 'tablet.jpg',
      category: categories[0]._id
    },
    {
      name: 'Cucumber',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      image: 'bedtime-book.jpg',
      category: categories[1]._id
    },
    {
      name: 'Strawberries x36',
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'spinning-top.jpg',
      category: categories[0]._id
    },
    {
      name: 'Raspberries x48',
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'plastic-horses.jpg',
      category: categories[0]._id
    }
  ]);

  console.log('products seeded');

  // await StallProduct.deleteMany()

  // const stallProducts = await StallProduct.insertMany([
  //   {
  //     productId: products[0].id,
  //   },
  //   {
  //     productId: products[1].id,
  //   },
  //   {
  //     productId: products[2].id,
  //   },
  //   {
  //     productId: products[3].id,
  //   },
  //   {
  //     productId: products[4].id,
  //   },
  //   {
  //     productId: products[5].id,
  //   },
  //   {
  //     productId: products[6].id,
  //   },
  //   {
  //     productId: products[7].id,
  //   },
  //   {
  //     productId: products[8].id,
  //   },
  //   {
  //     productId: products[9].id,
  //   }
  // ])
  //
  // console.log('Stall Products Seeded')

  await Stall.deleteMany()

  const stalls = await Stall.insertMany([
    {
      name: "Pam's Stall",
      upvotes: 50,
      products: [
        {productId: products[0]._id, price: 3.99, quantity: 200}, 
        {productId: products[1]._id, price: 2.99, quantity: 400}, 
        {productId: products[2]._id, price: 5.99, quantity: 150}]
    },
    {
      name: "Elijah's Stall",
      upvotes: 30,
      products: [
        {productId: products[0]._id, price: 4.99, quantity: 100}, 
        {productId: products[3]._id, price: 6.99, quantity: 325}, 
        {productId: products[7]._id, price: 2.99, quantity: 250},
        {productId: products[8]._id, price: 7.99, quantity: 50}]
    }
  ])

  console.log('Stalls Seeded')

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    username: 'PamPam123',
    email: 'pamela@testmail.com',
    password: 'password12345',
    stall: stalls[0]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    username: 'eholt123',
    email: 'eholt@testmail.com',
    password: 'password12345',
    stall: stalls[1]
  });

  console.log('users seeded');

  process.exit();
});
