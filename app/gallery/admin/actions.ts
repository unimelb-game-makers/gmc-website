'use server'

import { revalidatePath } from 'next/cache'

import { getCurrentAdmin } from '@/services/games-gallery/admin.service'
import { getTagsWithFeaturedState, updateTag } from '@/services/games-gallery/tag.service'

export async function updateFeaturedTags(formData: FormData) {
  const admin = await getCurrentAdmin()

  if (!admin) {
    throw new Error('Not authorized')
  }

  const tags = await getTagsWithFeaturedState()

  await Promise.all(
    tags.map((tag) => {
      const featured = formData.get(`featured-${tag.id}`) === 'on'
      const orderRaw = formData.get(`order-${tag.id}`)
      const featured_order = orderRaw && orderRaw.toString().length > 0 ? Number(orderRaw) : null

      return updateTag(tag.id, { featured, featured_order })
    })
  )

  revalidatePath('/gallery')
  revalidatePath('/gallery/admin')
}
