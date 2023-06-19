import { FC, ReactElement, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

const Container: FC<{ children: ReactNode; className?: string }> = ({ children, className }): ReactElement => {
	return <div className={`container mx-auto px-4 ${className}`}>{children}</div>
}

const Layout: FC<{ children?: ReactNode }> = ({ children }): ReactElement => {
	return (
		<section className="w-full">
			<header className="bg-stone-900 text-white h-[56px]">
				<Container className="flex items-center h-full">
					<div className=" bg-yellow-400 text-black p-2 rounded-md font-bold">IMDB</div>
				</Container>
			</header>

			<Container className="py-6">
				<Outlet />
			</Container>
		</section>
	)
}

export default Layout
