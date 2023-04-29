export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10')
];

export const server_loads = [0];

export const dictionary = {
		"/": [~3],
		"/admin": [4,[2]],
		"/admin/media": [~5,[2]],
		"/admin/requests": [6,[2]],
		"/admin/roles": [~7,[2]],
		"/admin/users": [~8,[2]],
		"/auth/login": [9],
		"/watch/[uid]": [~10]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';