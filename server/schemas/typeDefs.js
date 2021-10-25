const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Stall {
    _id: ID
    name: String
    upvotes: Int
    products: [StallProduct]
  }

  type StallProduct {
    _id: ID
    details: Product
    quantity: Int
    price: Float
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    username: String
    stall: Stall
    orders: [Order]
  }

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    getUsers: [User]
    stall(_id: ID!): Stall
    stallProduct(_id: ID!): StallProduct
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addStall(name: String!): Stall
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    updateStall(_id: ID! , products: [ID!]): Stall
    updateStallProduct(_id: ID!, quantity: Int): StallProduct
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
