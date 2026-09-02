import { redirect } from 'next/navigation'

import { updateFeaturedTags } from './actions'
import { getCurrentAdmin } from '@/services/games-gallery/admin.service'
import { getTagsWithFeaturedState } from '@/services/games-gallery/tag.service'

export default async function AdminPage() {
  const admin = await getCurrentAdmin()

  if (!admin) {
    redirect('/gallery/login')
  }

  const tags = await getTagsWithFeaturedState()

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-8 pt-44">
      <h1 className="text-xl font-semibold">Featured tags</h1>
      <p className="text-sm text-neutral-600">
        Choose which tags show on the gallery frontpage, and the order they appear in.
      </p>

      <form action={updateFeaturedTags} className="space-y-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-sm">
              <th className="py-2">Tag</th>
              <th className="py-2">Featured</th>
              <th className="py-2">Order</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id} className="border-b">
                <td className="py-2">{tag.name}</td>
                <td className="py-2">
                  <input
                    type="checkbox"
                    name={`featured-${tag.id}`}
                    defaultChecked={tag.featured}
                  />
                </td>
                <td className="py-2">
                  <input
                    type="number"
                    name={`order-${tag.id}`}
                    defaultValue={tag.featured_order ?? ''}
                    className="w-20 border p-1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="submit" className="border px-4 py-2">
          Save
        </button>
      </form>
    </main>
  )
}
