export const githubApiEndpoint = 'https://api.github.com'

export const fetcher = (url: string) => fetch(url).then((r) => r.json())
