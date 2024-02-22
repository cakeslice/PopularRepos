export const githubApiEndpoint = 'https://api.github.com'

export const programmingLanguages = Object.keys({
	TypeScript: 49944708,
	JavaScript: 1030969,
	CSS: 854719,
	Rust: 482820,
	HTML: 386437,
	'Inno Setup': 310714,
	Scilab: 197803,
	Shell: 83908,
	Batchfile: 18531,
	PowerShell: 11781,
	SCSS: 6732,
	Groovy: 3928,
	Cuda: 3634,
	'C++': 2745,
	Makefile: 2307,
	Python: 2171,
	Perl: 1922,
	Ruby: 1703,
	TeX: 1602,
	'Objective-C': 1387,
	'Objective-C++': 1387,
	Clojure: 1206,
	Handlebars: 1064,
	Less: 1029,
	PHP: 998,
	Dockerfile: 959,
	Julia: 940,
	'Jupyter Notebook': 929,
	'Visual Basic .NET': 893,
	'C#': 864,
	C: 818,
	Raku: 761,
	Pug: 654,
	Go: 652,
	'F#': 634,
	Java: 599,
	CoffeeScript: 590,
	R: 362,
	Roff: 351,
	ShaderLab: 330,
	Dart: 324,
	Swift: 284,
	Lua: 252,
	HLSL: 184,
	Hack: 16,
})

export const fetcher = async (url: string) => {
	const res = await fetch(url)

	if (!res.ok) {
		const error = await res.json()
		throw error
	}

	return res.json()
}
