import { useState, useMemo, ReactElement, FC, useContext } from 'react'
import { Link } from 'react-router-dom'

import { MoviesContext, MoviesContextProps } from '../App'

const Poster: FC<{ src?: string; alt?: string; className?: string }> = ({ src, alt, className }): ReactElement => {
	return (
		<>
			{src && !src.includes('N/A') ? (
				<img src={src} alt={alt} className={`block w-full h-auto ${className}`} />
			) : (
				<div className="flex justify-center items-center text-gray-400 bg-gray-200 h-[100px]">No image</div>
			)}
		</>
	)
}

const Home = (): ReactElement => {
	const [preloader, setPreloader] = useState<boolean>(false)

	const { movies, setMovies } = useContext(MoviesContext) as MoviesContextProps

	const getMovielist = async (title: string) => {
		try {
			// const url = 'http://localhost:3000/data/search.json'
			const url = `//www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${encodeURI(title)}`

			setPreloader(true)
			const response = await fetch(url)
			const jsonData = await response.json()

			setMovies(jsonData.Search)
			setPreloader(false)
		} catch (e) {
			console.error(e)
			setPreloader(false)
		}
	}

	const debounce = (fn: Function, wait: number) => {
		let timeoutId: ReturnType<typeof setTimeout>

		return function (this: any, ...args: any[]) {
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => fn.apply(this, args), wait)
		}
	}

	const handleInputChange = useMemo(
		() =>
			debounce((e: any) => {
				getMovielist(e.target.value)
			}, 2000),
		[]
	)

	return (
		<>
			<div className="mb-[40px]">
				<input
					type="text"
					placeholder="Search for a movie"
					onChange={(e) => handleInputChange(e)}
					className="flex w-full border px-[12px] py-[8px] border-gray-300 border-solid focus:border-yellow-400 focus:outline-0 placeholder:text-gray-400 rounded"
				/>

				{preloader && <div className="font-bold text-lg">Please, wait...</div>}
			</div>

			<div>
				{movies &&
					movies.length > 0 &&
					movies.map((item: any, index: number) => (
						<section key={index} className="flex py-[16px] border-0 border-gray-300 border-b last:border-b-0">
							<Link to={item.imdbID} className="block shrink-0 w-[100px] mr-[16px]">
								<Poster src={item.Poster} alt={item.Title} />
							</Link>

							<div className="w-full">
								<h2 className="text-lg font-bold mb-[4px] p-0">
									<Link to={item.imdbID} className="text-current hover:text-gray-600 active:text-gray-600">
										{item.Title}
									</Link>
								</h2>

								<p className="m-0 p-0 text-gray-400">{item.Year}</p>
							</div>
						</section>
					))}
			</div>
		</>
	)
}

export default Home
