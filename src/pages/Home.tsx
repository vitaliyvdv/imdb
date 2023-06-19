import { useState, useEffect, ReactElement, FC } from 'react'
import { Link } from 'react-router-dom'

interface MovieProps {
	Poster: string
	Title: string
	Year: string
	imdbID: string
}

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
	const [list, setList] = useState<MovieProps[] | []>([])

	const getMovielist = async () => {
		try {
			const response = await fetch('http://localhost:3000/data/search.json', {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const jsonData = await response.json()
			setList(jsonData.Search)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		getMovielist()
	}, [])

	return (
		<>
			<div className="mb-[40px]">
				<input
					type="text"
					placeholder="Search for a movie"
					onChange={(e) => console.log(encodeURI(e.target.value))}
					className="flex w-full border px-[12px] py-[8px] border-gray-300 border-solid focus:border-yellow-400 focus:outline-0 placeholder:text-gray-400 rounded"
				/>
			</div>

			<div>
				{list &&
					list.length > 0 &&
					list.map((item, index) => (
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
