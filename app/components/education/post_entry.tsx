import React from 'react'
import Image from 'next/image'
import { EducationWorkshopPost } from '@/@types/schema.ds'
import Link from 'next/link'
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

const colorMap: Record<string, string> = {
  red: 'bg-red-400',
  blue: 'bg-blue-400',
  green: 'bg-green-400',
  orange: 'bg-orange-400',
  yellow: 'bg-yellow-400',
  pink: 'bg-pink-400',
  purple: 'bg-purple-400',
  gray: 'bg-gray-400',
  default: 'bg-gray-800',
  brown: 'bg-amber-400',
};

const PostEntry = ({post}: {post: EducationWorkshopPost}) => {
  const date = dayjs(post.date.start).format("MMMM Do YYYY");
  const authorName = 'name' in post.author ? post.author.name : 'Unknown Author';

  return (
    <div className='bg-white rounded-lg text-black w-full [@media(min-width:1300px)]:w-100 h-80 flex flex-col overflow-hidden'>
        <Link href={"education/" + post.slug} className="flex flex-col h-full">
          <Image src={post.thumbnail} alt={post.id} width={600} height={160} className='object-cover rounded-t-lg w-full h-40 flex-shrink-0'/>
        <div className="p-4 bg-white-800 flex-1 min-h-0 flex flex-col">
          <h2 className="text-xl font-bold line-clamp-1 flex-shrink-0">{post.title}</h2>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-1 flex-shrink-0">
            <span>By {authorName}</span>
            <span>{date}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2 flex-shrink-0">
            {post.tags.map((tag) => (
              <span className={`text-white text-xs px-2 py-1 rounded-full ${colorMap[tag.color]}`} key={tag.id}>
                {tag.name}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm mt-2 line-clamp-2">
            {post.description}
          </p>
        </div>
      </Link>
    </div>

  )
}

export default PostEntry