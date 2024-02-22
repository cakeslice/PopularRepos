import { TableColumn } from '@nextui-org/react'

type Column = {
	name: string
	uid: string
}
export const tableColumns: Column[] = [
	{ name: 'REPO', uid: 'info' },
	{ name: 'STARS', uid: 'stars' },
	{ name: 'LANGUAGE', uid: 'language' },
	{ name: '', uid: 'actions' },
]
export const renderColumns = (column: Column) => (
	<TableColumn
		width={column.uid === 'stars' ? 115 : column.uid === 'info' ? '50%' : undefined}
		key={column.uid}
	>
		{column.name}
	</TableColumn>
)
