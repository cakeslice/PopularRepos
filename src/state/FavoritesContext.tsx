import { Repository } from '@/models/repository'
import { createContext, useContext, useEffect, useState } from 'react'

const LOCAL_STORAGE_KEY = 'repo-favorites'

type FavoritesContext = {
	items: Repository[]
	toggle: (item: Repository) => void
}

export const FavoritesContext = createContext<FavoritesContext | null>(null)

const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
	const [items, setItems] = useState<Repository[]>([])

	useEffect(() => {
		const loadedRepos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')

		setItems(loadedRepos)
	}, [setItems])

	const toggle = (repo: Repository) => {
		setItems((prev) => {
			const isFavorite = prev.find((i) => i.id === repo.id)
			const updatedItems = isFavorite ? prev.filter((i) => i.id !== repo.id) : [...prev, repo]
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedItems))
			return updatedItems
		})
	}

	const favoritesData = { items, toggle }

	return <FavoritesContext.Provider value={favoritesData}>{children}</FavoritesContext.Provider>
}

const useFavoritesContext = () => {
	return useContext(FavoritesContext)
}

export { FavoritesProvider, useFavoritesContext }
