const { Schema, model } = require('mongoose');

const inventorySchema = new Schema(
    {
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
    }
)

const upvoteSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: true
        }
    }
)

const stallSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
          },
        upvotes: [upvoteSchema],
        inventory: [inventorySchema]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        }
      }
);

stallSchema.virtual('upvoteCount').get(function(){
    return this.upvotes.length;
});

const Stall = model('Stall', stallSchema);
const Inventory = model('Inventory', inventorySchema);
const Upvote = model('Upvote', upvoteSchema);
module.exports = {Stall, Inventory, Upvote};