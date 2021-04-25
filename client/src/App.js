import React from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import SongList from './components/SongList';
import { ApolloProvider } from '@apollo/client/react';
import './App.less';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <SongList />
      </div>
    </ApolloProvider>
  )
}

export default App
