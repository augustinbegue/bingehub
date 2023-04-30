import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type RouteParams = { uid: string }
type RouteId = '/api/medias/[uid]/delete';

export type RequestHandler = Kit.RequestHandler<RouteParams, RouteId>;
export type RequestEvent = Kit.RequestEvent<RouteParams, RouteId>;