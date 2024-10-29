

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.1dcef066.js","_app/immutable/chunks/scheduler.2f406207.js","_app/immutable/chunks/index.bfebb1fe.js","_app/immutable/chunks/stores.f3693643.js","_app/immutable/chunks/singletons.74c8dbea.js","_app/immutable/chunks/index.926cde60.js"];
export const stylesheets = [];
export const fonts = [];
