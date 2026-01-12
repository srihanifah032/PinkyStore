import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { Button } from "@/components/ui/button"
import { User, Mail, Lock } from "lucide-react"

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await register(form)
      navigate("/login")
    } catch (err) {
      setError(err.message || "Register gagal")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-pink-100">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-pink-600">
            Create Account
          </h2>
          <p className="text-gray-500 mt-2">
            Daftar untuk mulai belanja hijab favoritmu
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Nama Lengkap
            </label>
            <div className="relative mt-1">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                required
                placeholder="Nama Lengkap"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300
                           focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Email
            </label>
            <div className="relative mt-1">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                required
                placeholder="email@example.com"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300
                           focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Password
            </label>
            <div className="relative mt-1">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                required
                placeholder="••••••••"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300
                           focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
              />
            </div>
          </div>

          {/* BUTTON */}
          <Button
            type="submit"
            variant="pink"
            size="lg"
            className="w-full"
          >
            Register
          </Button>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-pink-500 font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
