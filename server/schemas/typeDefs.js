// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    stall: Stall
    cart: Cart
  }

  type Stall {
    _id: ID
    name: String
    upvotes: [Upvote]
    inventory: [Inventory]
  }

  type Upvote {
    _id: ID
    userId: [User]
  }

  type Inventory {
    _id: ID
    productId: Product
    price: Float
    quantity: Int
  }

  type Product {
    _id: ID
    name: String
    image: String
  }

  type Cart {
    _id: ID
    cartItems: [CartItems]
  }

  type CartItems {
      stallID: Stall
      productId: Product
      price: Float
      quantity: Int
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    stall(username: String): Stall
    cart(username: String): Cart
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addToCart()
    addThought(thoughtText: String!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
  }
`