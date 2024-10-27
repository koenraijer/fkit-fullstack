export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["custom.png","favicon copy.png","favicon.png","github.png","linkedin.png","moth.gif","tiktok.png","twitter.png","user.png","youtube.png"]),
	mimeTypes: {".png":"image/png",".gif":"image/gif"},
	_: {
		client: {"start":"_app/immutable/entry/start.a234e387.js","app":"_app/immutable/entry/app.d711225f.js","imports":["_app/immutable/entry/start.a234e387.js","_app/immutable/chunks/scheduler.e4fe527f.js","_app/immutable/chunks/singletons.c557ba60.js","_app/immutable/chunks/index.10b7c612.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.d711225f.js","_app/immutable/chunks/scheduler.e4fe527f.js","_app/immutable/chunks/index.bdfbb633.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/9.js')
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
				id: "/api/signin",
				pattern: /^\/api\/signin\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/signin/_server.ts.js')
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
			},
			{
				id: "/[username]/bio",
				pattern: /^\/([^/]+?)\/bio\/?$/,
				params: [{"name":"username","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/[username]/edit",
				pattern: /^\/([^/]+?)\/edit\/?$/,
				params: [{"name":"username","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
