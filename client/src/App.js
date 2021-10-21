import React from 'react';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';


import Header from './components/Header';
import Footer from './components/Footer';
import NoMatch from './components/NoMatch';
import Stall from './components/Stall';

import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MyStall from './pages/MyStall';
import Signup from './pages/Signup';
import ViewOneStall from './pages/ViewOneStall';


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
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/mycart" component={Cart} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Login} />
            <Route exact path="/profile/:username?" component={MyStall} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/dashboard/:id" component={ViewOneStall} />
            <Route exact path="/stall" component={Stall} />

            <Route component={NoMatch} />
          </Switch>
        </div>
        <Footer />
      </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
