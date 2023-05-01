export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.df4fdc78.js","imports":["_app/immutable/entry/start.df4fdc78.js","_app/immutable/chunks/index.c7fa5583.js","_app/immutable/chunks/singletons.a77ac586.js","_app/immutable/chunks/index.03281ece.js","_app/immutable/chunks/control.e7f5239e.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.6149a5af.js","imports":["_app/immutable/entry/app.6149a5af.js","_app/immutable/chunks/index.c7fa5583.js"],"stylesheets":[],"fonts":[]}},
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
			() => import('./nodes/10.js'),
			() => import('./nodes/11.js')
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
				id: "/admin/jobs",
				pattern: /^\/admin\/jobs\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin/media",
				pattern: /^\/admin\/media\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/requests",
				pattern: /^\/admin\/requests\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/admin/roles",
				pattern: /^\/admin\/roles\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/admin/users",
				pattern: /^\/admin\/users\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 9 },
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
				id: "/api/jobs/create",
				pattern: /^\/api\/jobs\/create\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/jobs/create/_server.ts.js')
			},
			{
				id: "/api/medias",
				pattern: /^\/api\/medias\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/medias/_server.ts.js')
			},
			{
				id: "/api/medias/create",
				pattern: /^\/api\/medias\/create\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/medias/create/_server.ts.js')
			},
			{
				id: "/api/medias/import",
				pattern: /^\/api\/medias\/import\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/medias/import/_server.ts.js')
			},
			{
				id: "/api/medias/[uid]/delete",
				pattern: /^\/api\/medias\/([^/]+?)\/delete\/?$/,
				params: [{"name":"uid","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/medias/_uid_/delete/_server.ts.js')
			},
			{
				id: "/api/medias/[uid]/edit",
				pattern: /^\/api\/medias\/([^/]+?)\/edit\/?$/,
				params: [{"name":"uid","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/medias/_uid_/edit/_server.ts.js')
			},
			{
				id: "/api/medias/[uid]/stream",
				pattern: /^\/api\/medias\/([^/]+?)\/stream\/?$/,
				params: [{"name":"uid","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/medias/_uid_/stream/_server.ts.js')
			},
			{
				id: "/api/medias/[uid]/[file]",
				pattern: /^\/api\/medias\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"uid","optional":false,"rest":false,"chained":false},{"name":"file","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/medias/_uid_/_file_/_server.ts.js')
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
				page: { layouts: [0], errors: [1], leaf: 10 },
				endpoint: null
			},
			{
				id: "/watch/[uid]",
				pattern: /^\/watch\/([^/]+?)\/?$/,
				params: [{"name":"uid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 11 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
