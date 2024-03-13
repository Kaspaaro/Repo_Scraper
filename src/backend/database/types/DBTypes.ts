import {Document, Types} from 'mongoose';
import {fetchReadme} from '../../api/github-queries/queries';

interface Repot {
    id: string;
    name: string;
    html_url: string;
    node_id: string;
    description: string;
    owner: {
        login: string;
    };
    contents_url: string;
}


type User = Partial<Document> & {
    id: Types.ObjectId | string;
    user_name: string;
    email: string;
    role: 'user' | 'admin';
    password: string;
};
type GithubUser = {
    data: {
        user: {
            name: string;
        };
    }
};

type Owner = {
    login: string;
}

type GithubRepository = {
    nodes: Node[];
}

type Languages = {
    nodes: {
        name: string;
    }[];
}
type RepoLanguages = {
    [key: string]: number;
}

type GithubOutputRepositories ={
    id: number;
    name: string;
    url: string;
    node_id: string;
    description: string | null;
    owner:{
        login: string;
    };
    content_url: string;
}
type Node = {
    id: string;
    name: string;
    url: string;
    description ? : string;
    updatedAt: Date;
    owner: Owner;
    languages: Languages;
}

type Testi = {
    repositoryCount: number;
    edges: {
        node: Node[];
    }[];
};

type UserRepositories = {
    user: {
        name: string;
        repositories: {
            nodes: Node[];
        }
    }
}

type GithubRepoType = {
    id: string;
    name: string;
    html_url: string;
    node_id: string;
    description: string;
    owner: {
        login: string;
    };
    contents_url: string;
}

type Repositories = {
    data: [Node]
}

type SearchRepositoriesOutput = {
    search: {
        edges: {
            node: {
                owner: {
                    login: string;
                }
                name: string;
                url: string;
                description: string;
                updatedAt: Date;
            };
        }[];
    };
}

type Repository = Partial<Document> & {
    id: Types.ObjectId | string;
    user: Types.ObjectId | string;
    name: string;
    url: string;
    node_id: string;
    updated_at: Date;
    description: string;
    owner:{
        login: string;
    };

}
type RepositoryTest = Partial<Repository>

type RepositoryInput = Omit<Repository, 'id'>;

type UserOutput = Omit<User, 'password' | 'role'>;

type UserInput = Omit<User, 'id' | 'role'>;

type UserTest = Partial<User>;

type LoginUser = Omit<User, 'password'>;

type Credentials = {
    user_name: string;
    email: string;
    password: string;
};

type TokenContent = {
    token: string;
    user: LoginUser;
};

export type {
	User,
	UserOutput,
	UserInput,
	UserTest,
	LoginUser,
	TokenContent,
	GithubUser,
	Repository,
	RepositoryInput,
	RepositoryTest,
	Credentials,
	GithubRepository,
	UserRepositories,
	Repositories,
	SearchRepositoriesOutput,
	GithubOutputRepositories,
	GithubRepoType,
	Repot,
	Node,
	Testi,
	Owner,
	Languages,
	RepoLanguages
};
