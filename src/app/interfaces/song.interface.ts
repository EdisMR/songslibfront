export interface songInterface {
	public_id: string;
	date_created: Date;
	date_updated: Date;
	title: string;
	artist: string;
	tempo: number;
	linkstring: string;
	lyric: string;
	files: string[];
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
export interface RespGetOneSong {
	response_details: {
		execution_result: boolean;
		message: string;
		code: number;
		params: {};
	};
	data: songInterface;
}