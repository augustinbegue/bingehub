import { get } from 'svelte/store';
import { currentUser } from '.';
import type { IStoredUser } from '$lib/types';

export function hasRole(role: string, user = get(currentUser)) {
	return isLogged(user) && !!user?.roles?.find((r) => r.name === role);
}

export function isLogged(user: IStoredUser | undefined = get(currentUser)) {
	return !!user && user.isActive;
}
