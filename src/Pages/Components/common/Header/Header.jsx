import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Tablausers() {
	const dateRef = useRef(null)

	// ✅ NUEVO: refs/estado para el dropdown
	const userMenuRef = useRef(null)
	const [userMenuOpen, setUserMenuOpen] = useState(false)

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

	// ✅ NUEVO: cerrar menú al click fuera
	useEffect(() => {
		const onDown = (e) => {
			if (
				userMenuRef.current &&
				!userMenuRef.current.contains(e.target)
			) {
				setUserMenuOpen(false)
			}
		}
		document.addEventListener('mousedown', onDown)
		return () => document.removeEventListener('mousedown', onDown)
	}, [])

	// ✅ NUEVO: opcional - función logout
	const handleLogout = () => {
		localStorage.clear()
		window.location.href = '/login'
	}

	// ✅ NUEVO: se actualiza solo al cambiar el día (cada 1 minuto)
	useEffect(() => {
		const id = setInterval(() => {
			const today = getLocalISODate()
			if (selectedDate !== today && selectedDate === getLocalISODate()) {
				setSelectedDate(today)
			}
		}, 60_000)

		return () => clearInterval(id)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<header className="bg-white shadow-[0_14px_40px_rgba(15,23,42,0.12)]">
			<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
				{/* LEFT: Logo + title */}
				<Link to="/dashboard">
					<div className="flex items-center gap-3">
						<div className="flex items-center">
							<img
								src="/logo1.png"
								alt="Colsanitas"
								className="h-8 w-auto object-contain"
							/>
						</div>
					</div>
				</Link>

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

					{/* User + Dropdown */}
					<div className="relative" ref={userMenuRef}>
						<div
							className="flex items-center gap-3 cursor-pointer select-none"
							onClick={() => setUserMenuOpen((v) => !v)}>
							<div className="h-12 w-12 overflow-hidden rounded-full shadow-md ring-2 ring-white">
								<img
									src="/usericon.png"
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

						{userMenuOpen && (
							<div className="absolute right-0 mt-3 w-48 rounded-xl border border-slate-100 bg-[#3c68ce] shadow-lg z-50 overflow-hidden">
								<button
									onClick={handleLogout}
									className="w-full px-4 py-3 text-center text-sm font-semibold text-white  bg-[#2f5fd0]   hover:bg-[#284fb3] transition-colors duration-200"
									type="button">
									Cerrar sesión
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}
