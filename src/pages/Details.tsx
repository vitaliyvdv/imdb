import { useState, useEffect, useRef, ReactElement } from 'react'
import { useParams, Link } from 'react-router-dom'

interface MovieDetailsProps {
	Title?: string
	Year?: string
	Director?: string
	Plot?: string
	Poster?: string
}

const Details = (): ReactElement => {
	let { id } = useParams()
	const [details, setDetails] = useState<MovieDetailsProps | {}>({})

	const dataFetchedRef = useRef(false)

	const getMovieDetails = async (id: string | undefined) => {
		try {
			// const url = 'http://localhost:3000/data/details.json'
			const url = `//www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`

			const response = await fetch(url)
			const jsonData = await response.json()
			setDetails(jsonData)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (dataFetchedRef.current) return
		dataFetchedRef.current = true

		getMovieDetails(id)
	}, [id])

	const { Title: title, Year: year, Director: director, Plot: plot, Poster: poster }: MovieDetailsProps = details || {}

	return (
		<>
			<Link to="/" className="inline-block mb-[32px]">
				&larr; Back
			</Link>

			{Object.keys(details).length === 0 && details.constructor === Object ? (
				<div>No information about this movie</div>
			) : (
				<>
					{title && <h1 className="text-2xl font-bold mb-[4px]">{title}</h1>}

					{year && <div className="text-gray-400 mb-[24px]">{year}</div>}

					<div className="sm:flex">
						{!poster?.includes('N/A') && (
							<div className="shrink-0 w-[200px] mr-[16px]">
								<img src={poster} alt={title} className="block w-full h-auto" />
							</div>
						)}

						<div className="mt-[16px] sm:m-0 w-full">
							{plot && <p className="mb-[8px]">{plot}</p>}

							{director && <p>{`Director: ${director}`}</p>}
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default Details
