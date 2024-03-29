import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<NextThemesProvider attribute='class' defaultTheme='dark'>
			<NextUIProvider>
				<Component {...pageProps} />
			</NextUIProvider>
		</NextThemesProvider>
	)
}
