const { Schema, model } = require('mongoose');

const cartItemSchema = new Schema(
    {
        stallId: {
            type: Schema.Types.ObjectId,
            ref: 'Stall'
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

const cartSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        cartItems: [cartItemSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

cartSchema.virtual('totalPrice').get(function () {
    let total = 0;
    this.cartItems.forEach(item => {
        total = total + item.price;
    });
    return total;
});

const CartItem = model('CartItem', cartItemSchema)
const Cart = model('Cart', cartSchema);
module.exports = { Cart, CartItem };