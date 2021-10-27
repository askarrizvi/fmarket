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
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [StallProduct]
  }

  type Stall {
    _id: ID
    name: String
    description: String
    upvotes: Int
    image: String
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
    getUserbyId(_id: ID!): User
    stall(userid: ID!): User
    getStallbyId(_id: ID!): Stall
    getStallbyProdId(prodId: ID): Stall
    getAllStalls: [Stall]
    stallProduct(_id: ID!): StallProduct
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, username: String!, password: String!): Auth
    addStall(name: String!): Stall
    addOrder(products: [ID]!): Order
    addLike(_id: ID!): Stall
    removeLike(_id: ID!): Stall
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateStall(_id: ID! , productId: ID!, price: Float!, quantity: Int): StallProduct
    updateStallProduct(_id: ID!, quantity: Int): StallProduct
    addProduct(product: String): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;