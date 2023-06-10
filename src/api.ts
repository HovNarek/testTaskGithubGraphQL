import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

const httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
    },
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: ApolloLink.from([httpLink]),
    cache: new InMemoryCache(),
});

export default client;
