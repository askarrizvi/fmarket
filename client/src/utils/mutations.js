import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username:String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_STALL = gql`
  mutation addStall($name: String!,) {
    addStall(name: $name) {
      name
    }
  }
`;

// export const ADD_PRODUCT = gql`
//   mutation addProduct($product: String, $description, String) {
//     addProduct(product: $product, description: $description) {
//       product
//       description
//     }
//   }
// `;

export const ADD_LIKE = gql`
  mutation addLike($_id: ID!) {
    addLike(_id: $_id) {
      upvotes
    }
  }
`

export const REMOVE_LIKE = gql`
  mutation removeLike($_id: ID!) {
    removeLike(_id: $_id) {
      upvotes
    }
  }
`
