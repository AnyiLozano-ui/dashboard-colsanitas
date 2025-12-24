export default function Footer() {
  return (
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
  )
}