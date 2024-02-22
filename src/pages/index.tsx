import { FavoriteRepos } from '@/components/FavoriteRepos'
import { PopularRepos } from '@/components/PopularRepos'
import { FavoritesProvider } from '@/state/FavoritesContext'
import { Tab, Tabs } from '@nextui-org/react'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	return (
		<main className={`flex min-h-screen flex-col p-3 md:px-24 md:py-10 ${inter.className}`}>
			<FavoritesProvider>
				<Tabs aria-label='Screens'>
					<Tab key='popular' title='Popular'>
						<PopularRepos />
					</Tab>
					<Tab key='favorites' title='Favorites'>
						<FavoriteRepos />
					</Tab>
				</Tabs>
			</FavoritesProvider>
		</main>
	)
}
