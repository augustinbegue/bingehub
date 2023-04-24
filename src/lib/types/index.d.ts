export interface IPagination {
	current: number;
	total: number;
}

export interface AlertMessage {
	type: 'success' | 'error' | 'warning' | 'info';
	message: string;
}

export interface IStoredUser {
	uid: string;
	username: string;
	isActive: boolean;
	isDeleted: boolean;
	roles: {
		name: string;
		uid: string;
	}[];
}
