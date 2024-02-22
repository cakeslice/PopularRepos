export type Repository = {
	id: number
	node_id: string
	name: string
	full_name: string
	private: boolean
	owner: {
		login: string
		avatar_url: string
	}
	html_url: string
	description: string
	created_at: string
	stargazers_count: number
	language: string
	forks_count: number
	//
	isStarred?: boolean
}

export type RepositorySearch = {
	total_count: number
	incomplete_results: boolean
	items: Repository[]
}
