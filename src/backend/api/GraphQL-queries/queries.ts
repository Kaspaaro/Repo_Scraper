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