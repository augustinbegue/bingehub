export const FloodEndpoint = process.env['FLOOD_URL'];
export let floodCookie: string | undefined;

export function setCookie(cookie?: string) {
	floodCookie = cookie;
}

export function clearCookie() {
	floodCookie = undefined;
}

export interface FloodTorrent {
	hash: string;
	name: string;
	bytesDone: number;
	dateActive: number;
	dateCreated: number;
	dateFinished: number;
	directory: string;
	downRate: number;
	downTotal: number;
	upRate: number;
	upTotal: number;
	eta: number;
	isPrivate: boolean;
	isInitialSeeding: boolean;
	isSequential: boolean;
	message: string;
	peersConnected: number;
	peersTotal: number;
	percentComplete: number;
	priority: number;
	ratio: number;
	seedsConnected: number;
	seedsTotal: number;
	sizeBytes: number;
	status: string[];
	tags: string[];
	trackerURIs: string[];
}

export interface FloodClientSettings {
	dht: boolean;
	dhtPort: number;
	directoryDefault: string;
	networkHttpMaxOpen: number;
	networkLocalAddress: any[];
	networkMaxOpenFiles: number;
	networkPortOpen: boolean;
	networkPortRandom: boolean;
	networkPortRange: string;
	piecesHashOnCompletion: boolean;
	piecesMemoryMax: number;
	protocolPex: boolean;
	throttleGlobalDownSpeed: number;
	throttleGlobalUpSpeed: number;
	throttleMaxPeersNormal: number;
	throttleMaxPeersSeed: number;
	throttleMaxDownloads: number;
	throttleMaxDownloadsGlobal: number;
	throttleMaxUploads: number;
	throttleMaxUploadsGlobal: number;
	throttleMinPeersNormal: number;
	throttleMinPeersSeed: number;
	trackersNumWant: number;
}
