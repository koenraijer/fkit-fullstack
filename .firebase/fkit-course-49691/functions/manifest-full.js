export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["custom.png","favicon copy.png","favicon.png","github.png","linkedin.png","moth.gif","tiktok.png","twitter.png","user.png","youtube.png"]),
	mimeTypes: {".png":"image/png",".gif":"image/gif"},
	_: {
		client: {"start":"_app/immutable/entry/start.93c172be.js","app":"_app/immutable/entry/app.92426c2a.js","imports":["_app/immutable/entry/start.93c172be.js","_app/immutable/chunks/scheduler.2f406207.js","_app/immutable/chunks/singletons.74c8dbea.js","_app/immutable/chunks/index.926cde60.js","_app/immutable/chunks/control.c2cf8273.js","_app/immutable/entry/app.92426c2a.js","_app/immutable/chunks/scheduler.2f406207.js","_app/immutable/chunks/index.bfebb1fe.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/signin",
				pattern: /^\/signin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/signup",
				pattern: /^\/signup\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/signup/photo",
				pattern: /^\/signup\/photo\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/signup/username",
				pattern: /^\/signup\/username\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/[username]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"username","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
