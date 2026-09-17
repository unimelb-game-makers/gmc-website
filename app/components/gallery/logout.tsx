import { logout } from '@/app/gallery/user'

export function LogoutButton() {
  return (
    <form>
      <button formAction={logout}>Log out</button>
    </form>
  )
}
