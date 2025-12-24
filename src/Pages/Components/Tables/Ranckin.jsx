import Header from '../common/Header/Header'
import Footer from '../common/Footer/Footer'
import { api } from '../../../core/config/api'
import { useState, useEffect, useCallback } from 'react'

export default function Ranckin() {
	const [companies, setCompanies] = useState([])
	const [selectedCompanies, setSelectedCompanies] = useState('')
	const [firstPosition, setFirstPosition] = useState({})
	const [othersPlayers, setOthersPlayers] = useState([])
	const [totalPages, setTotalPages] = useState(1)
	const [page, setPage] = useState(1)

	const pageSize = 5

	const handleGetCompanies = async () => {
		try {
			const response = await api.get('/api/v1/admin/companies')
			setCompanies(response.data.companies)
			setSelectedCompanies(response.data.companies[0].slug)
		} catch (error) {
			console.error(error)
		}
	}

	const handleGetUsers = useCallback(async () => {
		try {
			if (!selectedCompanies && selectedCompanies === '') return
			const response = await api.get(
				`/api/v1/admin/companies/${selectedCompanies}/ranking `
			)
			setFirstPosition(response.data.data[0])
			setOthersPlayers(
				response.data.data.filter((item, index) => index !== 0)
			)
			const data = response.data.data.filter((_, index) => index !== 0)
			setTotalPages(Math.ceil(data.length / pageSize))
		} catch (error) {
			console.error(error)
		}
	}, [selectedCompanies])

	useEffect(() => {
		handleGetCompanies()
	}, [])

	useEffect(() => {
		handleGetUsers()
		console.log(firstPosition)
	}, [handleGetUsers])

	return (
		<>
			<Header />

			{/* CONTENIDO PRINCIPAL */}
			<div className="mx-auto max-w-440 p-6 mt-6">
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
							Ranking
						</h1>
						<div className="bg-[linear-gradient(to_right,#c8d400,#3c68ce)] mt-1 h-0.5 w-full" />
					</div>
				</div>
			</div>

			<main className="mx-auto max-w-450 px-6 py-10">
				{/* GRID PRINCIPAL */}
				<div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[420px_minmax(0,1fr)]">
					{/* ===== CARD MORADA ===== */}
					<aside className="flex justify-center lg:justify-start">
						<div className="w-full max-w-100 min-h-140 rounded-3xl bg-[#0b3b77] px-8 py-10 text-white shadow-[0_35px_110px_rgba(79,70,229,0.45)] flex flex-col">
							{/* ===== HEADER (NO CENTRADO) ===== */}
							<div className="flex items-center gap-4">
								{/* Avatar con corona */}
								<div className="flex items-center gap-3">
									{/* imagen */}
									<div className="h-28 w-40">
										<img
											src="/premio.png"
											alt="premio"
											className="h-full w-55 object-contain drop-shadow-[0_22px_55px_rgba(0,0,0,0.5)]"
										/>
									</div>

									{/* texto */}
									<div className="-ml-4">
										<p className="text-lg font-bold leading-tight">
											{firstPosition &&
												`${firstPosition.player  && firstPosition.player.name} ${firstPosition.player && firstPosition.player.last_name}`}
										</p>
										<p className="text-sm text-white/80">
											{firstPosition && firstPosition.player  &&
												firstPosition.player.user_name}
										</p>
									</div>
								</div>
							</div>

							{/* ===== LINEA ===== */}
							<div className="my-5 h-px w-full bg-white/20" />

							{/* ===== COPA (IMAGEN) ===== */}
							<div className="relative flex justify-center mt-8">
								{/* Sparkles */}
								<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
									<span className="sparkle s1" />
									<span className="sparkle s2" />
									<span className="sparkle s3" />
									<span className="sparkle s4" />
									<span className="sparkle s5" />
									<span className="sparkle s6" />
								</div>

								{/* Imagen copa */}
								<img
									src="/corona.png"
									alt="trophy"
									className="relative z-10 h-28 trophy-glow"
								/>
							</div>

							{/* ===== SCORE ===== */}
							<div className="mt-8 flex justify-center">
								<div className="rounded-xl bg-yellow-400 px-12 py-3 text-3xl font-extrabold text-[#ffffff] shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
									{firstPosition && firstPosition.score &&
										firstPosition.score.total_score}
								</div>
							</div>

							{/* ===== LINEA ===== */}
							<div className="my-6 h-px w-full bg-white/20" />

							{/* ===== BUTTON ===== */}
							<button
								type="button"
								className="mt-auto w-full rounded-2xl bg-[#3c68ce] py-4 text-lg font-bold text-white shadow-[0_16px_40px_rgba(0,0,0,0.25)] hover:bg-indigo-400 active:scale-[0.98]">
								Felicidades
							</button>
						</div>
					</aside>

					{/* ===== TABLA ===== */}
					<section className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
						{/* TOP BAR */}
						<div className="px-8 py-6 bg-white">
							<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
								{/* tabs */}
								<div className="flex overflow-auto rounded-2xl ring-1 ring-slate-200 w-125">
									{companies.map((item) => (
										<button
											onClick={() =>
												setSelectedCompanies(item.slug)
											}
											className={
												item.slug === selectedCompanies
													? `bg-[#3c68ce] px-6 py-3 text-sm font-bold text-white`
													: 'px-6 py-3 text-sm font-bold text-[#3c68ce] hover:bg-slate-50'
											}>
											{item.name}
										</button>
									))}
								</div>
							</div>

							{/* ✅ separador suave (en vez de raya negra) */}
							<div className="mt-6 h-px w-full bg-[#6b6ea7]" />
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
											Nombre
										</th>
										<th className="px-10 py-8 text-left text-lg font-extrabold text-[#3b3f7a]">
											# Documento
										</th>
										<th className="px-10 py-8 text-left text-lg font-extrabold text-[#3b3f7a]">
											Usuario
										</th>
										<th className="px-10 py-8 text-left text-lg font-extrabold text-[#3b3f7a]">
											Puntaje
										</th>
									</tr>

									{/* ✅ separador suave debajo del header */}
									<tr>
										<td colSpan={5} className="px-10">
											<div className="h-px w-full bg-slate-200/70" />
										</td>
									</tr>
								</thead>

								<tbody>
									{othersPlayers
										.slice((page - 1) * 5, page * 5)
										.map((i) => (
											<>
												<tr
													key={i}
													className="align-middle">
													<td className="px-10 py-2">
														<div className="h-16 w-16 object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.25)]">
															<img
																src="/premio2.png"
																alt="premio"
																className="h-full w-full"
															/>
														</div>
													</td>

													<td className="px-10 py-2 text-lg font-semibold text-[#6b6ea7]">
														{`${
															i.player &&
															i.player.name
														} ${
															i.player &&
															i.player.last_name
														}`}
													</td>
													<td className="px-10 py-2 text-lg font-semibold text-[#6b6ea7]">
														{i.player &&
															i.player
																.document_number}
													</td>
													<td className="px-10 py-2 text-lg font-semibold text-[#6b6ea7]">
														{i.player &&
															i.player.user_name}
													</td>
													<td className="px-10 py-2 text-lg font-semibold text-[#6b6ea7]">
														{i.score &&
															i.score.total_score}
													</td>
												</tr>

												{/* ✅ separador suave por fila (sin negro) */}
												<tr>
													<td
														colSpan={5}
														className="px-10">
														<div className="h-px w-full bg-slate-200/60" />
													</td>
												</tr>
											</>
										))}
								</tbody>
							</table>
						</div>

						{/* PAGINATION */}
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
										setPage((p) =>
											Math.min(totalPages, p + 1)
										)
									}
									className="flex h-12 w-16 items-center justify-center border-l border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
									›
								</button>
							</div>
						</div>
					</section>
				</div>
			</main>

			<Footer />
		</>
	)
}
