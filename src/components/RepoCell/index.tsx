import { Repository } from '@/models/repository'
import { useFavoritesContext } from '@/state/FavoritesContext'
import { Button, Chip, Link } from '@nextui-org/react'

export const RepoCell = (repo: Repository, columnKey: string, favorite?: boolean) => {
	const favorites = useFavoritesContext()

	const isStarred = repo.isStarred || favorite

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
						variant='flat'
						href={repo.html_url}
						target='_blank'
					>
						Fork
					</Button>
					<Button
						className={isStarred ? 'bg-red-500/75' : 'opacity-50'}
						variant={isStarred ? 'solid' : 'flat'}
						isIconOnly
						color={isStarred ? 'danger' : 'default'}
						aria-label='Like'
						onClick={() => favorites?.toggle(repo)}
					>
						{isStarred ? '❤️' : '🤍'}
					</Button>
				</div>
			)
		default:
			return ''
	}
}
