import { login } from "@/app/gallery/user"


export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; message?: string }
}) {
  return (
    <form className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-semibold">Log in</h1>

      {searchParams.error && (
        <p className="text-red-600 text-sm">{searchParams.error}</p>
      )}
      {searchParams.message && (
        <p className="text-green-600 text-sm">{searchParams.message}</p>
      )}

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required className="border w-full p-2" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required className="border w-full p-2" />
      </div>

      <div className="flex gap-2">
        <button formAction={login} className="border px-4 py-2 flex-1">
          Log in
        </button>
      </div>
    </form>
  )
}
