import { get } from 'svelte/store';
import { currentUser } from '.';

export function hasRole(role: string, user = get(currentUser)) {
	console.log('hasRole', role, user);

	return !!user?.roles?.find((r) => r.name === role);
}

export function isLogged(user = get(currentUser)) {
	return !!user;
}
