export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.4f705224.js","imports":["_app/immutable/entry/start.4f705224.js","_app/immutable/chunks/index.1fbcc1c5.js","_app/immutable/chunks/singletons.7bb68545.js","_app/immutable/chunks/control.e7f5239e.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.9a51a40c.js","imports":["_app/immutable/entry/app.9a51a40c.js","_app/immutable/chunks/index.1fbcc1c5.js"],"stylesheets":[],"fonts":[]}},
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
			() => import('./nodes/9.js'),
			() => import('./nodes/10.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin/media",
				pattern: /^\/admin\/media\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin/requests",
				pattern: /^\/admin\/requests\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/roles",
				pattern: /^\/admin\/roles\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/admin/users",
				pattern: /^\/admin\/users\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/api/auth/login",
				pattern: /^\/api\/auth\/login\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/auth/login/_server.ts.js')
			},
			{
				id: "/api/auth/logout",
				pattern: /^\/api\/auth\/logout\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/auth/logout/_server.ts.js')
			},
			{
				id: "/api/media/create",
				pattern: /^\/api\/media\/create\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/media/create/_server.ts.js')
			},
			{
				id: "/api/media/[uid]/stream",
				pattern: /^\/api\/media\/([^/]+?)\/stream\/?$/,
				params: [{"name":"uid","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/media/_uid_/stream/_server.ts.js')
			},
			{
				id: "/api/roles/create",
				pattern: /^\/api\/roles\/create\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/roles/create/_server.ts.js')
			},
			{
				id: "/api/users/create",
				pattern: /^\/api\/users\/create\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/users/create/_server.ts.js')
			},
			{
				id: "/api/users/edit",
				pattern: /^\/api\/users\/edit\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/users/edit/_server.ts.js')
			},
			{
				id: "/auth/login",
				pattern: /^\/auth\/login\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 9 },
				endpoint: null
			},
			{
				id: "/watch/[uid]",
				pattern: /^\/watch\/([^/]+?)\/?$/,
				params: [{"name":"uid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 10 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export const prerendered = new Set([]);
