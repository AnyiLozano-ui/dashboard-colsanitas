import { useEffect, useRef, useState } from 'react'

export default function Dashboard() {
	const dateRef = useRef(null)

	// ✅ Helper: YYYY-MM-DD en horario local (sin UTC)
	const getLocalISODate = () => {
		const d = new Date()
		const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
		return local.toISOString().slice(0, 10)
	}

	const [selectedDate, setSelectedDate] = useState(() => getLocalISODate())

	const formatDateLabel = (iso) => {
		const [y, m, d] = iso.split('-').map(Number)
		const dt = new Date(y, m - 1, d)

		const day = dt.getDate()
		const weekday = dt.toLocaleDateString('en-US', { weekday: 'short' })
		const month = dt.toLocaleDateString('en-US', { month: 'long' })
		return `${day} ${weekday}, ${month}`
	}

	const openDatePicker = () => {
		if (!dateRef.current) return
		if (typeof dateRef.current.showPicker === 'function') {
			dateRef.current.showPicker()
		} else {
			dateRef.current.click()
		}
	}

	// ✅ NUEVO: se actualiza solo al cambiar el día (cada 1 minuto)
	useEffect(() => {
		const id = setInterval(() => {
			const today = getLocalISODate()
			// Solo auto-actualiza si sigues "en hoy" o no has cambiado manualmente
			// (si quieres que siempre force hoy, dime y lo ajusto)
			if (selectedDate !== today && selectedDate === getLocalISODate()) {
				setSelectedDate(today)
			}
		}, 60_000)

		return () => clearInterval(id)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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
		},
		{
			id: 2,
			cover: '/rankink.png',
			hex: '/corona.png',
			title: 'Ranking de usuarios',
			subtitle: 'Los usuarios mejor posicionados del momento',
			avatars: ['/user1.png', '/user2.png', '/user3.png', '/user4.png'],
			more: '....',
		},
		{
			id: 3,
			cover: '/movil-bg.png',
			hex: '/logo.png',
			title: 'Empresa 1',
			subtitle: 'DESIGNERS ASSEMBLE!',
			avatars: ['/user1.png', '/user2.png', '/user3.png', '/user4.png'],
			more: '....',
		},
		{
			id: 4,
			cover: '/movil-bg.png',
			hex: '/logo.png',
			title: 'Empresa 2',
			subtitle: 'DESIGNERS ASSEMBLE!',
			avatars: ['/user1.png', '/user2.png', '/user3.png', '/user4.png'],
			more: '....',
		},
		{
			id: 5,
			cover: '/movil-bg.png',
			hex: '/logo.png',
			title: 'Empresa 3',
			subtitle: 'DESIGNERS ASSEMBLE!',
			avatars: ['/user1.png', '/user2.png', '/user3.png', '/user4.png'],
			more: '....',
		},
	]

	return (
		<div className="min-h-screen bg-slate-50">
			{/* HEADER */}
			<header className="bg-white shadow-[0_14px_40px_rgba(15,23,42,0.12)]">
				<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
					{/* LEFT: Logo + title */}
					<div className="flex items-center gap-3">
						{/* ✅ Logo imagen (reemplaza src) */}
						<div className="flex items-center">
							<img
								src="/logo1.png"
								alt="Colsanitas"
								className="h-8 w-auto object-contain"
							/>
						</div>
					</div>

					{/* CENTER: Search */}
					<div className="hidden md:flex flex-1 justify-center px-10">
						<div className="relative w-full max-w-2xl">
							<span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
								🔍
							</span>
							<input
								type="text"
								placeholder="Start searching here..."
								className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none shadow-[0_10px_25px_rgba(15,23,42,0.10)] focus:border-slate-300 focus:ring-2 focus:ring-emerald-100"
							/>
						</div>
					</div>

					{/* RIGHT: date + calendar + user */}
					<div className="flex items-center gap-4">
						{/* Date pill (dinámica) */}
						<div className="hidden sm:flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 shadow-sm">
							<span className="font-semibold">
								{selectedDate.slice(8, 10)}
							</span>
							<span>
								{formatDateLabel(selectedDate).replace(
									/^\d+\s/,
									''
								)}
							</span>
						</div>

						{/* Calendar button */}
						<button
							onClick={openDatePicker}
							className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-600 shadow-sm hover:bg-slate-200"
							aria-label="Open calendar"
							type="button">
							📅
						</button>

						{/* Input date oculto */}
						<input
							ref={dateRef}
							type="date"
							value={selectedDate}
							onChange={(e) => setSelectedDate(e.target.value)}
							className="sr-only"
						/>

						{/* User */}
						<div className="flex items-center gap-3">
							{/* ✅ Avatar imagen (reemplaza src) */}
							<div className="h-12 w-12 overflow-hidden rounded-full shadow-md ring-2 ring-white">
								<img
									src="/logo.png"
									alt="User"
									className="h-full w-full object-cover"
								/>
							</div>

							<div className="hidden md:block leading-tight">
								<p className="text-sm font-semibold text-slate-900">
									Acceso Administrador
								</p>
								<p className="text-xs text-slate-400">Admin</p>
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* CONTENT */}
			<main className="mx-auto mb-13 max-w-7xl p-6 mt-6">
				<h1 className="text-[40px] font-bold text-slate-900">
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
										type="button"
										className="mt-7 w-full rounded-2xl bg-[#54b997] py-4 text-sm font-bold text-white shadow-[0_16px_30px_rgba(79,70,229,0.28)] hover:bg-indigo-600 active:scale-[0.99]">
										Revisar
									</button>
								</div>
							</article>
						))}
					</div>
				</section>
			</main>

			{/* ✅ FOOTER (MEJORADO) */}
			<footer className="mt-auto bg-white shadow-[0_-12px_40px_rgba(15,23,42,0.12)]">
				{/* Línea verde suave */}
				<div className="mx-auto h-0.75 w-24 rounded-full bg-emerald-500 shadow-[0_2px_10px_rgba(16,185,129,0.6)]" />

				<div className="mx-auto max-w-7xl px-6 py-6">
					<div className="flex flex-col items-center justify-center gap-4 text-center">
						{/* Logo */}
						<img
							src="/logo1.png"
							alt="Colsanitas"
							className="h-7 w-auto object-contain"
						/>

						{/* Texto */}
						<p className="text-sm text-slate-500">
							© {new Date().getFullYear()} Colsanitas — Dashboard
						</p>

						{/* Links */}
						<div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
							<button
								type="button"
								className="transition hover:text-emerald-600">
								Soporte
							</button>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}
