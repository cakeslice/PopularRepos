import { useFavoritesContext } from '@/state/FavoritesContext'
import { Spinner, Table, TableBody, TableCell, TableHeader, TableRow } from '@nextui-org/react'
import { RepoCell } from '../RepoCell'
import { renderColumns, tableColumns } from '../ReposTableColumn'

export const FavoriteRepos = () => {
	const favorites = useFavoritesContext()

	return (
		<Table aria-label='Favorite repositories table'>
			<TableHeader columns={tableColumns}>{(column) => renderColumns(column)}</TableHeader>

			<TableBody
				emptyContent='Your favorite repos will show up here'
				loadingContent={<Spinner />}
				items={favorites?.items}
			>
				{(item) => (
					<TableRow key={item.name}>
						{(columnKey) => (
							<TableCell>{RepoCell(item, `${columnKey}`, true)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}
