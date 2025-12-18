import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ email, password })
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* 🌴 FONDO GLOBAL */}
      <img
        src="/movil-bg.png"
        alt="Treasure background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* capa de suavizado */}
      <div className="absolute inset-0 bg-black/5" />

      {/* CONTENIDO */}
      <div className="relative z-10 min-h-screen flex items-center justify-center lg:justify-end px-6 lg:px-24">

        {/* CARD LOGIN */}
        <div
          className="
            relative w-full max-w-md
            rounded-[34px]
            border border-white/60
            bg-white/45
            backdrop-blur-xl
            shadow-[0_30px_80px_rgba(0,0,0,0.35)]
            px-10 py-12
            overflow-hidden
          "
        >
          {/* marco interno */}
          <div className="pointer-events-none absolute inset-3 rounded-[28px] border border-white/40" />

          {/* EFECTO INFERIOR (tal cual imagen original) */}
          <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-44">
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent" />
            <div className="absolute -bottom-10 left-1/2 h-52 w-[120%] -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-white/35 blur-2xl" />
          </div>

          {/* CONTENIDO */}
          <div className="relative z-10">
            

            <h1 className="text-4xl font-extrabold text-slate-900 text-center">
              Login
            </h1>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  Email
                </label>
                <div className="mt-2 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@email.com"
                    className="w-full rounded-xl bg-white/70 border border-slate-300/60 px-4 py-3 pr-12 focus:ring-2 focus:ring-sky-300"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                    ✉️
                  </span>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  Password
                </label>
                <div className="mt-2 relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-white/70 border border-slate-300/60 px-4 py-3 pr-12 focus:ring-2 focus:ring-sky-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-2"
                  >
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-sky-400 to-sky-500 py-4 text-lg font-semibold text-white shadow-lg hover:from-sky-500 hover:to-sky-600"
              >
                Iniciar sesión
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-700 text-center">
              Acceso administrativo 
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
