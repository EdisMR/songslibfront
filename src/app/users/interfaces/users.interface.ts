export interface UsersInterface {
	public_id: string;
	date_created: Date;
	date_updated: Date;
	username: string;
	email: string;
	active: boolean;
}

export interface RespGetAllUsers {
	response_details: {
		execution_result: boolean;
		message: string;
		code: number;
		params: {};
	};
	data: UsersInterface[]
}

export interface RespCreateUserInterface {
	response_details: {
		execution_result: boolean;
		message: string;
		code: number;
		params: {};
	};
	data: UsersInterface
}

export interface RespNoDataInterface {
	response_details: {
		execution_result: boolean;
		message: string;
		code: number;
		params: {};
	};
	data: {}
}