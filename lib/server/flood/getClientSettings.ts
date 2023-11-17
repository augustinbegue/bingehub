import { FloodEndpoint, floodCookie } from '.';

export async function getClientSettings() {
	const response = await fetch(`${FloodEndpoint}/client/settings`, {
		headers: {
			cookie: floodCookie!
		}
	});

	if (!response.ok) throw new Error(`Failed to get client settings: ${response.statusText}`);

	return await response.json();
}
