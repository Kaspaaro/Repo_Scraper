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