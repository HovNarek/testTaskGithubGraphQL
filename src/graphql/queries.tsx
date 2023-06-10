import {gql} from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query SearchRepositories($searchQuery: String!) {
  search(query: $searchQuery, type: REPOSITORY, first: 100, after: null) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          id
          name
          stargazerCount
          updatedAt
          url
          owner {
            avatarUrl
            url
            login
          }
          languages(first: 5) {
            nodes {
              name
            }
          }
          description
        }
      }
    }
  }
}
`;
export const GET_REPOSITORY_BY_ID = gql`
  query GetRepositoryById($repositoryId: ID!) {
  node(id: $repositoryId) {
        ... on Repository {
      id
      name
      stargazerCount
      updatedAt
      url
      owner {
        avatarUrl
        url
        login
      }
      languages(first: 5) {
        nodes {
          name
        }
      }
      description
    }
  }
}
`;

export const GET_USER_REPOSITORIES = gql`
  query GetUserRepositories {
  viewer {
    id
    repositories(first: 100, after: null, orderBy: { field: UPDATED_AT, direction: DESC }) {
      totalCount
      edges {
        node {
          id
          name
          stargazerCount
          updatedAt
          url
          owner {
            avatarUrl
            url
            login
          }
          languages(first: 5) {
            nodes {
              name
            }
          }
          description
        }
      }
    }
  }
}
`;

