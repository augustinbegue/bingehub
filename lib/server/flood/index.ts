export const FloodEndpoint = process.env['FLOOD_URL'];

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
