import { FloodEndpoint, floodCookie, setCookie } from '.';

export async function authenticate(username?: string, password?: string) {
	if (floodCookie) {
		const validation = await fetch(`${FloodEndpoint}/auth/verify`, {
			credentials: 'include',
			headers: {
				cookie: floodCookie
			}
		});

		if (validation.ok) return;
	}

	const response = await fetch(`${FloodEndpoint}/auth/authenticate`, {
		method: 'POST',
		body: JSON.stringify({ username, password }),
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error(`Failed to authenticate: ${response.statusText}`);
	}

	setCookie(response.headers.getSetCookie().find((c) => c.startsWith('jwt=')));
}
