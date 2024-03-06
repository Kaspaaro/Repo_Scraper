
const registerquery =
    `mutation Mutation($user: UserInput!) {
						  register(user: $user) {
							message
							user {
							  id
							  user_name
							  email
							}
						  }
						}`;
export default registerquery;