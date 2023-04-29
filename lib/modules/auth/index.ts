import type { IStoredUser } from '$lib/types';
import { writable } from 'svelte/store';

/**
 * Contains the current user when logged in or undefined when logged out
 */
export const currentUser = writable<IStoredUser | undefined>(undefined);
