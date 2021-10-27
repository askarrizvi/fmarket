import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  {
    getUsers {
      username
      stall {
        _id
        name
        description
        image
        upvotes
        products {
          _id
          details {
            _id
            name
            description
            image
          }
          price
          quantity
        }
      }
    }
  }
`

export const QUERY_STALL = gql`
query stall {
  stall(_id: $_id) {
    _id
    name
    upvotes
    products {
      details {
        name
        description
        image
        category
      }
      price
      quantity
    }
  }
}
`

export const QUERY_STALLS = gql`
{
  getAllStalls {
    _id
    name
    upvotes
    products {
      _id
      details {
        name
        description
        image
        category{
          name
        }
      }
      price
      quantity
    }
  }
}
`

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
 {
  user {
    _id
    firstName
    lastName
    email
    username
    stall {
      _id
      name
      upvotes
      products {
        _id
        details {
          _id
          description
          image
          category {
            _id
            name
          }
        }
      }

    }
    
}
}
`

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_USER_BY_ID = gql`
    query getUserbyId ($id: ID!) {
      getUserbyId (id: $_id) {
        _id
        firstName
        lastName
        email
        username
        stall {
          _id
          name
          upvotes
          products {
            _id
            details {
              _id
              description
              image
              category {
                _id
                name
              }
            }
          }

        }
        
    }
  }
`