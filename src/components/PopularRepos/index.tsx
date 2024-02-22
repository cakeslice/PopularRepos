import { Repository, RepositorySearch } from '@/models/repository'
import { useFavoritesContext } from '@/state/FavoritesContext'
import { fetcher, githubApiEndpoint, programmingLanguages } from '@/utils'
import {
	Card,
	CardBody,
	Input,
	Pagination,
	Select,
	SelectItem,
	Spacer,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react'
import { useDebounce } from '@uidotdev/usehooks'
import { useMemo, useState } from 'react'
import useSWR from 'swr'
import { RepoCell } from '../RepoCell'

const tableColumns = [
	{ name: 'REPO', uid: 'info' },
	{ name: 'STARS', uid: 'stars' },
	{ name: 'LANGUAGE', uid: 'language' },
	{ name: '', uid: 'actions' },
]

const rowsPerPage = 10
const maxResults = 1000
const sortBy = 'stars'
const orderBy = 'desc'

const lastWeek = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
	.toISOString()
	.split('T')[0]

export const PopularRepos = () => {
	const [page, setPage] = useState(1)
	const [search, setSearch] = useState('')
	const [languages, setLanguages] = useState<string>('')

	const debouncedSearch = useDebounce(search, 200)

	const languagesQuery = useMemo(
		() => languages?.split(',').map((lang) => `+language:"${lang}"`),
		[languages]
	)

	const endpoint = useMemo(
		() =>
			`${githubApiEndpoint}/search/repositories?q=created:${lastWeek} ${encodeURIComponent(debouncedSearch) + languagesQuery}&sort=${sortBy}&order=${orderBy}&per_page=${rowsPerPage}&page=${page}`,
		[languagesQuery, page, debouncedSearch]
	)
	const { data, isLoading, error } = useSWR<RepositorySearch>(endpoint, fetcher, {
		keepPreviousData: true,
	})

	const favorites = useFavoritesContext()

	const items: Repository[] = useMemo(() => {
		return (data?.items || []).map((item) => ({
			...item,
			isStarred: !!favorites?.items?.find((f) => f.id === item.id),
		}))
	}, [data?.items, favorites?.items])

	const pages = useMemo(() => {
		return data?.total_count
			? Math.ceil(Math.min(maxResults, data.total_count) / rowsPerPage)
			: 0
	}, [data?.total_count])

	return (
		<div>
			<Card>
				<CardBody>
					<div className='flex gap-5'>
						<Input
							label='Search'
							placeholder='Example: Tailwind'
							onChange={(e) => {
								setSearch(e.target.value)
								setPage(1)
							}}
						></Input>
						<Select
							placeholder='Select a language'
							selectionMode='multiple'
							onChange={(e) => {
								setLanguages(e.target.value)
								setPage(1)
							}}
						>
							{programmingLanguages.map((item) => (
								<SelectItem key={item} value={item}>
									{item}
								</SelectItem>
							))}
						</Select>
					</div>
				</CardBody>
			</Card>

			<Spacer y={2}></Spacer>

			<Table
				aria-label='Popular repositories table'
				bottomContent={
					pages > 0 ? (
						<div className='flex w-full justify-center'>
							<Pagination
								isCompact
								showControls
								showShadow
								color='primary'
								page={page}
								total={pages}
								onChange={(page) => setPage(page)}
							/>
						</div>
					) : null
				}
			>
				<TableHeader columns={tableColumns}>
					{(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
				</TableHeader>
				<TableBody
					isLoading={isLoading}
					emptyContent={
						error
							? 'Repositories failed to fetch! Probably rate limited :('
							: 'No results...'
					}
					loadingContent={<Spinner />}
					items={items}
				>
					{(item) => (
						<TableRow key={item.name}>
							{(columnKey) => (
								<TableCell key={columnKey}>
									{RepoCell(item, `${columnKey}`)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
