import { useMemo, useState } from 'react'
import Header from '../common/Header/Header'
import Footer from '../common/Footer/Footer'

export default function Companys() {
	// ✅ mock data (reemplaza con tu API)
	const users = useMemo(
		() => [
			{
				id: 1,
				avatar: '/user1.png',
				type: '124412112414',
				name: 'Offer Toro',
				gems: 'John Pemad',
				status: 'Activo',
			},
			{
				id: 2,
				avatar: '/user2.png',
				type: '124412112414',
				name: 'Offer Toro',
				gems: 'John Pemad',
				status: 'Inactivo',
			},
			{
				id: 3,
				avatar: '/user3.png',
				type: '124412112414',
				name: 'Offer Toro',
				gems: 'John Pemad',
				status: 'Activo',
			},
		],
		[]
	)

	const tabs = ['Empresa 2', 'Empresa 3', 'Empresa 4']
	const [activeTab, setActiveTab] = useState(tabs[0])
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)

	const pageSize = 6

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase()
		if (!q) return users
		return users.filter(
			(u) =>
				String(u.name).toLowerCase().includes(q) ||
				String(u.type).toLowerCase().includes(q) ||
				String(u.gems).toLowerCase().includes(q) ||
				String(u.status).toLowerCase().includes(q)
		)
	}, [search, users])

	const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))

	const paged = useMemo(() => {
		const start = (page - 1) * pageSize
		return filtered.slice(start, start + pageSize)
	}, [filtered, page])

	if (page > totalPages) setPage(1)

	return (
		<>
			<Header />

			<div className="mx-auto max-w-7xl p-6 mt-6">
				<div className="flex gap-6 items-start">
					{/* Botón Atrás */}
					<button
						onClick={() => window.history.back()}
						className="flex items-center gap-3 px-6 py-3 bg-[#2f5fd0] text-white font-medium rounded-lg shadow-md  hover:bg-[#284fb3] transition mt-1"
						aria-label="Go back">
						<span>Home</span>
					</button>

					{/* Título + línea */}
					<div className="flex-1">
						<h1 className="text-[40px] font-semibold tracking-wide bg-[linear-gradient(to_right,#003d78,#9fd356,#3c68ce)] bg-clip-text text-transparent">
							Companys
						</h1>
						<div className="bg-[linear-gradient(to_right,#c8d400,#3c68ce)] mt-1 h-0.5 w-full" />
					</div>
				</div>

				{/* ✅ CARD / TABLE WRAPPER */}
				<section className="mt-7 overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_rgba(15,23,42,0.14)]">
					{/* TOP BAR */}
					<div className="bg-white">
						<div className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
							{/* left: breadcrumb */}
							<div className="flex items-center gap-3">
								<div className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-400">
									<span>Lista de usuarios</span>
									<span className="text-[#3c68ce] text-lg">
										›
									</span>
								</div>
							</div>

							{/* center: search */}
							<div className="relative w-full max-w-xl">
								<span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
									🔍
								</span>
								<input
									value={search}
									onChange={(e) => {
										setSearch(e.target.value)
										setPage(1)
									}}
									placeholder="Search"
									className="w-full rounded-full bg-slate-50 px-12 py-3.5 text-sm font-medium text-slate-700 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-200"
								/>
								<span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
									🔎
								</span>
							</div>

							{/* right: tabs segmented */}
							<div className="flex items-center justify-start lg:justify-end">
								<div className="flex overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
									{tabs.map((t) => {
										const active = t === activeTab
										return (
											<button
												key={t}
												type="button"
												onClick={() => setActiveTab(t)}
												className={[
													'px-5 py-3 text-sm font-bold transition',
													'border-r border-slate-200 last:border-r-0',
													active
														? 'bg-[#3c68ce] text-white shadow-[0_12px_25px_rgba(79,70,229,0.30)]'
														: 'bg-white text-[#3c68ce] hover:bg-slate-50',
												].join(' ')}>
												{t}
											</button>
										)
									})}
								</div>
							</div>
						</div>
					</div>

					{/* TABLE */}
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead>
								<tr className="text-slate-700">
									<th className="px-10 py-8 text-left text-lg font-extrabold text-[#0b3b77]">
										Avatar
									</th>
									<th className="px-10 py-8 text-left text-lg font-extrabold text-[#3b3f7a]">
										Type
									</th>
									<th className="px-10 py-8 text-left text-lg font-extrabold text-[#3b3f7a]">
										Name
									</th>
									<th className="px-10 py-8 text-left text-lg font-extrabold text-[#3b3f7a]">
										Gems
									</th>
									<th className="px-10 py-8 text-left text-lg font-extrabold text-[#3b3f7a]">
										Status
									</th>
								</tr>
								<tr>
									<td colSpan={5} className="px-10">
										<div className="h-px w-full bg-slate-200/70" />
									</td>
								</tr>
							</thead>

							<tbody>
								{paged.map((u) => (
									<tr key={u.id} className="align-middle">
										<td className="px-10 py-10">
											<div className="h-14 w-14 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200 shadow-[0_10px_18px_rgba(15,23,42,0.10)]">
												<img
													src={u.avatar}
													alt={u.name}
													className="h-full w-full object-cover"
												/>
											</div>
										</td>

										<td className="px-10 py-10 text-lg font-semibold text-[#6b6ea7]">
											{u.type}
										</td>

										<td className="px-10 py-10 text-lg font-semibold text-[#6b6ea7]">
											{u.name}
										</td>

										<td className="px-10 py-10 text-lg font-semibold text-[#6b6ea7]">
											{u.gems}
										</td>

										{/* ✅ NUEVO: Status badge */}
										<td className="px-10 py-10">
											<span
												className={[
													'inline-flex items-center rounded-full px-4 py-2 text-sm font-bold',
													u.status === 'Activo'
														? 'bg-emerald-100 text-emerald-700'
														: 'bg-slate-100 text-slate-500',
												].join(' ')}>
												{u.status}
											</span>
										</td>
									</tr>
								))}

								<tr>
									<td colSpan={5} className="px-10">
										<div className="h-px w-full bg-slate-200/70" />
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					{/* PAGINATION (bottom-right like reference) */}
					<div className="flex items-center justify-end px-8 py-6">
						<div className="flex items-center overflow-hidden rounded-2xl bg-white shadow-[0_16px_35px_rgba(15,23,42,0.12)] ring-1 ring-slate-200">
							<button
								type="button"
								onClick={() =>
									setPage((p) => Math.max(1, p - 1))
								}
								className="flex h-12 w-16 items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200">
								‹
							</button>

							{Array.from({ length: totalPages })
								.slice(0, 5)
								.map((_, i) => {
									const n = i + 1
									const active = n === page
									return (
										<button
											key={n}
											type="button"
											onClick={() => setPage(n)}
											className={[
												'h-12 w-16 text-sm font-bold',
												'border-l border-slate-200',
												active
													? 'bg-[#3c68ce] text-white shadow-[0_12px_20px_rgba(79,70,229,0.30)]'
													: 'bg-white text-slate-700 hover:bg-slate-50',
											].join(' ')}>
											{n}
										</button>
									)
								})}

							<button
								type="button"
								onClick={() =>
									setPage((p) => Math.min(totalPages, p + 1))
								}
								className="flex h-12 w-16 items-center justify-center border-l border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
								›
							</button>
						</div>
					</div>
				</section>
			</div>

			<Footer />
		</>
	)
}
