'use client'

import { useState } from 'react'

type Tag = {
  id: number
  name: string
  featured: boolean
  featured_order: number | null
}

const TagsForm = ({
  tags,
  action,
  addTagAction,
  removeTagAction,
}: {
  tags: Tag[]
  action: (formData: FormData) => void
  addTagAction: (formData: FormData) => void
  removeTagAction: (formData: FormData) => void
}) => {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()

  return (
    <form action={action} className="space-y-4">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search tags"
        className="w-full border p-2"
      />

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left text-sm">
            <th className="py-2">Tag</th>
            <th className="py-2">Featured</th>
            <th className="py-2">Order</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr
              key={tag.id}
              className="border-b"
              hidden={normalizedQuery.length > 0 && !tag.name.toLowerCase().includes(normalizedQuery)}
            >
              <td className="py-2">{tag.name}</td>
              <td className="py-2">
                <input type="checkbox" name={`featured-${tag.id}`} defaultChecked={tag.featured} />
              </td>
              <td className="py-2">
                <input
                  type="number"
                  name={`order-${tag.id}`}
                  defaultValue={tag.featured_order ?? ''}
                  className="w-20 border p-1"
                />
              </td>
              <td className="py-2">
                <button
                  type="submit"
                  formAction={removeTagAction}
                  name="tagId"
                  value={tag.id}
                  className="border px-2 py-1 text-sm text-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-2">
        <input type="text" name="name" placeholder="New tag name" className="flex-1 border p-2" />
        <button type="submit" formAction={addTagAction} className="border px-4 py-2">
          Add
        </button>
      </div>

      <button type="submit" className="border px-4 py-2">
        Save
      </button>
    </form>
  )
}

export default TagsForm
