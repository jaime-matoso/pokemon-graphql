import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route } from "react-router-dom";
import Index from './components/Index';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './services/apollo';


function App() {
  return (
    <Fragment>

      <ApolloProvider client={apolloClient}>

        <BrowserRouter>
          <CssBaseline />
          <Route path="/" exact component={Index} />
          <Route path="/PokemonDetails/:name" component={PokemonDetails} />
          <Route path="/PokemonList" component={PokemonList} />
        </BrowserRouter>

      </ApolloProvider>

    </Fragment>
  );
}

export default App;
