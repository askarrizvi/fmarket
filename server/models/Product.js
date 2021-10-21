const { Schema } = require('mongoose');

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)