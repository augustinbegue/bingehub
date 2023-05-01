import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/entry/_layout.svelte.dcc72ae2.js","_app/immutable/chunks/index.c7fa5583.js","_app/immutable/chunks/stores.1249a1df.js","_app/immutable/chunks/singletons.a77ac586.js","_app/immutable/chunks/index.03281ece.js","_app/immutable/chunks/alerter.a508b1c7.js","_app/immutable/chunks/index.5201c2eb.js","_app/immutable/chunks/utils.0deb44f8.js"];
export const stylesheets = ["_app/immutable/assets/_layout.b7487f56.css"];
export const fonts = [];
