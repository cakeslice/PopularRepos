import { RepoCell } from '@/components/RepoCell'
import { RepositorySearch } from '@/models/repository'
import { fetcher, githubApiEndpoint } from '@/utils'
import {
	Pagination,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react'
import { Inter } from 'next/font/google'
import { useMemo, useState } from 'react'
import useSWR from 'swr'
const inter = Inter({ subsets: ['latin'] })

const columns = [
	{ name: 'REPOSITORY', uid: 'info' },
	{ name: 'STARS', uid: 'stars' },
	{ name: 'LANGUAGE', uid: 'language' },
	{ name: '', uid: 'actions' },
]

const rowsPerPage = 10

export default function Home() {
	const query = 'created:2017-01-10'
	const sortBy = 'stars'
	const orderBy = 'desc'

	const [page, setPage] = useState(1)

	const { data, isLoading } = useSWR<RepositorySearch>(
		`${githubApiEndpoint}/search/repositories?q=${encodeURIComponent(query)}&sort=${sortBy}&order=${orderBy}&per_page=10&page=${page}`,
		fetcher,
		{
			keepPreviousData: true,
		}
	)

	const pages = useMemo(() => {
		return data?.total_count ? Math.ceil(data.total_count / rowsPerPage) : 0
	}, [data?.total_count, rowsPerPage])

	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
		>
			<Table
				aria-label='Repositories table'
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
				<TableHeader columns={columns}>
					{(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
				</TableHeader>

				<TableBody
					isLoading={isLoading}
					emptyContent='No results...'
					loadingContent={<Spinner />}
					items={data?.items || []}
				>
					{(item) => (
						<TableRow key={item.name}>
							{(columnKey) => (
								<TableCell align={columnKey === 'stars' ? 'right' : 'left'}>
									{RepoCell(item, `${columnKey}`)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</main>
	)
}
