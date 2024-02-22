import { useFavoritesContext } from '@/state/FavoritesContext'
import {
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react'
import { RepoCell } from '../RepoCell'

const tableColumns = [
	{ name: 'REPO', uid: 'info' },
	{ name: 'STARS', uid: 'stars' },
	{ name: 'LANGUAGE', uid: 'language' },
	{ name: '', uid: 'actions' },
]

export const FavoriteRepos = () => {
	const favorites = useFavoritesContext()

	return (
		<Table aria-label='Favorite repositories table'>
			<TableHeader columns={tableColumns}>
				{(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
			</TableHeader>

			<TableBody
				emptyContent='Your favorite repos will show up here'
				loadingContent={<Spinner />}
				items={favorites?.items}
			>
				{(item) => (
					<TableRow key={item.name}>
						{(columnKey) => (
							<TableCell align={columnKey === 'stars' ? 'right' : 'left'}>
								{RepoCell(item, `${columnKey}`, true)}
							</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}
