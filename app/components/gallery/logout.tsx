import { logout } from '@/services/games-gallery/auth.service'

export function LogoutButton() {
  return (
    <form>
      <button formAction={logout}>Log out</button>
    </form>
  )
}
