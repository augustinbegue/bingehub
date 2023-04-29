const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.4f705224.js","imports":["_app/immutable/entry/start.4f705224.js","_app/immutable/chunks/index.1fbcc1c5.js","_app/immutable/chunks/singletons.7bb68545.js","_app/immutable/chunks/control.e7f5239e.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.9a51a40c.js","imports":["_app/immutable/entry/app.9a51a40c.js","_app/immutable/chunks/index.1fbcc1c5.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./chunks/0-e996bd08.js'),
			() => import('./chunks/1-22e73c3e.js'),
			() => import('./chunks/2-8b8ade77.js'),
			() => import('./chunks/3-f60a45d3.js'),
			() => import('./chunks/4-cfd26161.js'),
			() => import('./chunks/5-2c4544e3.js'),
			() => import('./chunks/6-27296413.js'),
			() => import('./chunks/7-6c40d2b0.js'),
			() => import('./chunks/8-54482f82.js'),
			() => import('./chunks/9-6af1127e.js'),
			() => import('./chunks/10-23bec87a.js')
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
				endpoint: () => import('./chunks/_server.ts-f24bc838.js')
			},
			{
				id: "/api/auth/logout",
				pattern: /^\/api\/auth\/logout\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./chunks/_server.ts-6021e034.js')
			},
			{
				id: "/api/media/create",
				pattern: /^\/api\/media\/create\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./chunks/_server.ts-669dd20b.js')
			},
			{
				id: "/api/media/[uid]/stream",
				pattern: /^\/api\/media\/([^/]+?)\/stream\/?$/,
				params: [{"name":"uid","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./chunks/_server.ts-2959dac4.js')
			},
			{
				id: "/api/roles/create",
				pattern: /^\/api\/roles\/create\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./chunks/_server.ts-458cf15c.js')
			},
			{
				id: "/api/users/create",
				pattern: /^\/api\/users\/create\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./chunks/_server.ts-7c077aab.js')
			},
			{
				id: "/api/users/edit",
				pattern: /^\/api\/users\/edit\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./chunks/_server.ts-61bf1f1c.js')
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

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
