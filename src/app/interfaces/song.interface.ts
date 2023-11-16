export interface songInterface {
	public_id: string;
	date_created: Date;
	date_updated: Date;
	title: string;
	url: string;
	lyric: string;
	sources: string[];
	categories: string[];
	active: boolean;
}




export interface RespGetAllSongs {
	response_details: {
		execution_result: boolean;
		message: string;
		code: number;
		params: {};
	};
	data: songInterface[];
}

export interface RespPatchSong {
	response_details: {
		execution_result: boolean;
		message: string;
		code: number;
		params: {};
	};
	data: songInterface;
}

export interface RespNoDataInterface {
	response_details: {
		execution_result: boolean;
		message: string;
		code: number;
		params: {};
	};
	data: {};
}