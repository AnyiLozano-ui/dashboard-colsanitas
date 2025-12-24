import Header from './Components/common/Header/Header'
import Footer from './Components/common/Footer/Footer'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
	const router = useNavigate()
	// ✅ NUEVO: Cards data
	const groupCards = [
		{
			id: 1,
			cover: '/user-register.png', // cambia por tus imágenes
			hex: '/user2.png', // logo/avatar en hex
			title: 'Usuarios Registrados',
			subtitle: 'Personas activas que ya hacen parte de la experiencia',
			avatars: ['/user1.png', '/user2.png', '/user3.png', '/user4.png'],
			more: '....',
			to: '/tabla-users',
		},
		{
			id: 2,
			cover: '/rankink.png',
			hex: '/corona.png',
			title: 'Ranking de usuarios',
			subtitle: 'Los usuarios mejor posicionados del momento',
			avatars: ['/user1.png', '/user2.png', '/user3.png', '/user4.png'],
			more: '....',
			to: '/ranckin'
		},
	]

	return (
		<>
			{/* HEADER */}
			<Header />
			<div className="min-h-screen bg-slate-50">
				{/* CONTENT */}
				<main className="mx-auto mb-1 max-w-7xl p-6 mt-1">
					<h1 className="text-[42px] mt-4 font-semibold tracking-wide bg-[linear-gradient(to_right,#003d78,#9fd356,#3c68ce)] bg-clip-text text-transparent">
						Dashboard
					</h1>
					<div className="bg-[linear-gradient(to_right,#c8d400,#3c68ce)] mt-8px h-0.5 w-full max-w-full [@media(max-width:1024px)]:mx-4 [@media(max-width:1024px)]:max-w-[90%]"></div>
					{/* ✅ NUEVO: Cards */}
					<section className="mt-8">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
							{groupCards.map((c) => (
								<article
									key={c.id}
									className="overflow-hidden rounded-3xl bg-white shadow-[0_18px_55px_rgba(15,23,42,0.12)]">
									{/* Cover */}
									<div className="relative h-36 w-full">
										<img
											src={c.cover}
											alt={c.title}
											className="h-full w-full object-cover"
										/>

										{/* icon top-right */}
										<div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 shadow-md">
											<span className="text-slate-700">
												✅
											</span>
										</div>

										{/* Hex avatar */}
										<div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2">
											<div className="h-24 w-24 rounded-[28px] bg-white p-2 shadow-[0_14px_35px_rgba(15,23,42,0.20)]">
												<img
													src={c.hex}
													alt="group"
													className="h-full w-full object-cover rounded-[22px]"
												/>
											</div>
										</div>
									</div>

									{/* Body */}
									<div className="px-7 pb-7 pt-16 text-center">
										<h3 className="text-xl font-extrabold text-slate-800">
											{c.title}
										</h3>
										<p className="mt-1 text-xs font-semibold tracking-wide text-slate-400">
											{c.subtitle}
										</p>

										{/* avatars */}
										<div className="mt-6 flex items-center justify-center">
											<div className="flex -space-x-3">
												{c.avatars
													.slice(0, 4)
													.map((a, idx) => (
														<div
															key={idx}
															className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
															<img
																src={a}
																alt="user"
																className="h-full w-full object-cover"
															/>
														</div>
													))}

												<div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white ring-2 ring-white shadow-sm">
													{c.more}
												</div>
											</div>
										</div>

										{/* button */}
										<button
											onClick={() => router(c.to)}
											type="button"
											className="mt-7 cursor-pointer w-full rounded-2xl bg-[#54b997] py-4 text-sm font-bold text-white shadow-[0_16px_30px_rgba(79,70,229,0.28)] hover:bg-indigo-600 active:scale-[0.99]">
											Revisar
										</button>
									</div>
								</article>
							))}
						</div>
					</section>
				</main>
			</div>
			<Footer />
		</>
	)
}
