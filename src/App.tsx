import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Books from './Books';
import AddBook from './AddBook';
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})
function App() {
 
  return (
    <ApolloProvider client={client}>
      <div className="App">
<Books/>
<AddBook/>
      </div>
    </ApolloProvider>

  );
}

export default App;
