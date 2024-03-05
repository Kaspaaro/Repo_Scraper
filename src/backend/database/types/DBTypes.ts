import {Document, Types} from 'mongoose';

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

type Repository = Partial<Document> & {
    id: Types.ObjectId | string;
    user: Types.ObjectId | string;
    name: string;
    url: string;
}
type RepositoryTest = Partial<Repository>

type RepositoryInput = Omit<Repository, 'id'>;

type UserOutput = Omit<User, 'password' | 'role'>;

type UserInput = Omit<User, 'id' | 'role'>;

type UserTest = Partial<User>;

type LoginUser = Omit<User, 'password'>;

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
};
