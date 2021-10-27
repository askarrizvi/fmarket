import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
// import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Splash from './pages/Splash';
import Test from './pages/Test';
import Nav from './components/Nav';
import StallDetails from './pages/StallDetails'
import MyStall from './pages/MyStall'
import ProductForm from './components/ProductForm'
import { StoreProvider } from "./utils/GlobalState";
import OrderHistory from './pages/OrderHistory';
import Success from './pages/Success'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Switch>
              <Route exact path="/" component={Splash} />
              <div>
                <Nav />
                <Switch>
                <Route exact path="/test" component={Test} />
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/orderHistory" component={OrderHistory} />
                  <Route exact path="/stall/:id" component={StallDetails} />
                  <Route exact path="/myStall/" component={MyStall} />
                  <Route exact path="/myStall/products" component={ProductForm} />
                  <Route exact path="/success" component={Success} />
                  <Route component={NoMatch} />
                </Switch>
              </div>
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}
export default App;
