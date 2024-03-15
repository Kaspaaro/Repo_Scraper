export const addRepository = `
  mutation AddRepository($input: RepositoryInput!) {
    addRepository(input: $input) {
      id
      name
      url
      updated_at
      node_id
    }
  }
`;
export const deleteRepository = `
  mutation Mutation($id: ID!) {
    removeRepository(id: $id) {
        id
     }
  }
`;
export const updateFavoriteRepos = `
  query Query {
   favorites {
    id
    name
    url
    updated_at
    node_id
    }
   }
`;
export const updateFavoriteReposStats = `
  mutation Mutation {
	updateRepositories{
	id
    name
    url
    updated_at
    node_id
    }
  }
`;