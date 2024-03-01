import fetch from 'node-fetch';

export default {
	Query: {
		githubUser: async (_parent: undefined, args: {username: string}) => {
			const response = await fetch('https://api.github.com/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				},
				body: JSON.stringify({
					query: `
            query ($username: String!) { 
              user(login: $username) {
                name
                id
                email
              }
            } 
          `,
					variables: { username: 'Kaspaaro'},
				}),
			});
			const { data, errors } = await response.json();
			if (errors) {
				throw new Error(errors[0].message);
			}
			return data.user;
		},
	},
};