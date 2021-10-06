import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://critterpedia-db.herokuapp.com/",
  cache: new InMemoryCache(),
});

export default client;
