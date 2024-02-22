import { Repository } from '@/models/repository'
import { Button, Chip, Link } from '@nextui-org/react'

export const RepoCell = (repo: Repository, columnKey: string) => {
	switch (columnKey) {
		case 'info':
			return (
				<div>
					<div className='flex gap-2'>
						<Link href={repo.html_url} target='_blank'>
							{repo.name}
						</Link>
					</div>
					<p>{repo.description}</p>
				</div>
			)
		case 'stars':
			return <Chip>⭐ {repo.stargazers_count}</Chip>
		case 'language':
			return <b>{repo.language}</b>
		case 'actions':
			return (
				<div className='flex gap-2'>
					<Button
						as={Link}
						showAnchorIcon
						variant='bordered'
						href={repo.html_url}
						target='_blank'
					>
						Fork
					</Button>
					<Button variant='bordered' isIconOnly color='danger' aria-label='Like'></Button>
				</div>
			)
		default:
			return ''
	}
}
