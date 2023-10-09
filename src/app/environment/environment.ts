type environmentType = {
	fileTypeAllowed: string[],

	static_files_dir: string,
}

export const environment: environmentType = {
	fileTypeAllowed: ['.aac', '.mp3', '.m4a', ".ogg", ".wav", ".3gpp", 'application/pdf'],
	static_files_dir: './assets',
}