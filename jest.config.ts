import {Config} from '@jest/types';

const config: Config.InitialOptions = {
	testEnvironment: 'node',
	transform: {
		'^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
	},
};

export default config;
