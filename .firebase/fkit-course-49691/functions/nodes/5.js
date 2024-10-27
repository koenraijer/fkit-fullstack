import * as server from '../entries/pages/_username_/bio/_page.server.ts.js';

export const index = 5;
export const component = async () => (await import('../entries/pages/_username_/bio/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/[username]/bio/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.65c32483.js","_app/immutable/chunks/scheduler.e4fe527f.js","_app/immutable/chunks/index.bdfbb633.js","_app/immutable/chunks/stores.f8473358.js","_app/immutable/chunks/singletons.c557ba60.js","_app/immutable/chunks/index.10b7c612.js","_app/immutable/chunks/parse.bee59afc.js"];
export const stylesheets = [];
export const fonts = [];
