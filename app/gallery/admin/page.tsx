import { redirect } from 'next/navigation'

import TagsForm from '@/app/components/gallery/admin/tags-form'
import { getCurrentAdmin } from '@/services/games-gallery/admin.service'
import { addTag, getTagsWithFeaturedState, removeTag, updateFeaturedTags } from '@/services/games-gallery/tag.service'

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

      <TagsForm tags={tags} action={updateFeaturedTags} addTagAction={addTag} removeTagAction={removeTag} />
    </main>
  )
}
