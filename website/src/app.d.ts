// See https://kit.svelte.dev/docs/types#app

import type { IStoredUser } from '$lib/types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: IStoredUser;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
