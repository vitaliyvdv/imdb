import { createContext, useState, Dispatch } from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './pages/Home'
import Details from './pages/Details'

interface MovieProps {
	Poster: string
	Title: string
	Year: string
	imdbID: string
}

export interface MoviesContextProps {
	movies: MovieProps[] | []
	setMovies: Dispatch<React.SetStateAction<MovieProps[] | []>>
}

export const MoviesContext = createContext<MoviesContextProps>({
	movies: [],
	setMovies: () => {}
})

const App = () => {
	const [movies, setMovies] = useState<MovieProps[] | []>([])

	return (
		<MoviesContext.Provider value={{ movies: movies, setMovies: setMovies }}>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />

					<Route path=":id" element={<Details />} />
				</Route>
			</Routes>
		</MoviesContext.Provider>
	)
}

export default App
