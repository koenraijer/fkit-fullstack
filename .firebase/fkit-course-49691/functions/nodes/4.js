import * as universal from '../entries/pages/_username_/_page.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_username_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/[username]/+page.ts";
export const imports = ["_app/immutable/nodes/4.cb973e70.js","_app/immutable/chunks/firebase.7efdf944.js","_app/immutable/chunks/index.926cde60.js","_app/immutable/chunks/scheduler.2f406207.js","_app/immutable/chunks/control.c2cf8273.js","_app/immutable/chunks/index.bfebb1fe.js","_app/immutable/chunks/each.e59479a4.js"];
export const stylesheets = [];
export const fonts = [];
