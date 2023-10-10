import { categoriesInterface } from "../interfaces/categories.interface"

type environmentType = {
	fileTypeAllowed: string[],

	static_files_dir: string,
}

export const environment: environmentType = {
	fileTypeAllowed: ['.aac', '.mp3', '.m4a', ".ogg", ".wav", ".3gpp", 'application/pdf'],
	static_files_dir: './assets',
}


export const categoriesListEnv: categoriesInterface = {
	"misa": [
		"entrada",
		"ten piedad",
		"gloria",
		"aleluya",
		"ofrendas",
		"santo",
		"cordero",
		"comunion (eucaristia)",
		"envío (salida)"
	],
	"tiempo liturgico": [
		"adviento",
		"navidad",
		"epifania",
		"tiempo ordinario",
		"cuaresma",
		"domingo de ramos",
		"jueves santo",
		"viernes santo",
		"vigilia pascual",
		"sabado santo",
		"domingo santo",
		"resurreccion de jesus",
		"semana santa",
		"pascua",
		"cuarto domingo de pascua",
		"setimo domingo de pascua",
		"pentecostes",
		"cristo rey"
	],
	"sacramentos": [
		"bautismo",
		"confirmación",
		"eucaristia",
		"penitencia",
		"uncion de los enfermos",
		"orden sacerdotal",
		"matrimonio"
	],
	"santos": [
		"santa maria madre de dios",
		"maria",
		"jesus",
		"ssma trinidad",
		"espiritu santo"
	]
}
