import * as server from '../entries/pages/_page.server.ts.js';

export const index = 3;
export const component = async () => (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/entry/_page.svelte.0628e600.js","_app/immutable/chunks/index.1fbcc1c5.js"];
export const stylesheets = [];
export const fonts = [];
