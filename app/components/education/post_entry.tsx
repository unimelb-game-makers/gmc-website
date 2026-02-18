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
  const date = dayjs(post.date.start).format("DD-MM-YYYY");

  return (
    <div className='text-white w-full'>
        <Link href={"education/" + post.slug}>
          {/* Image container with tags overlay */}
          <div className="relative">
            <Image
              src={post.thumbnail}
              alt={post.id}
              width={400}
              height={200}
              className='object-cover rounded-lg w-full h-40'
            />
            {/* Tags overlaid at bottom of image */}
            <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <span
                  className={`text-white text-xs font-bold px-3 py-0.5 rounded-full ${colorMap[tag.color]}`}
                  key={tag.id}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
      </Link>

      {/* Date */}
      <p className="text-gray-400 text-sm mt-2 font-tasa-orbiter">{date}</p>

      {/* Title */}
      <Link href={"education/" + post.slug}>
        <h2 className="text-lg mt-1 font-tasa-orbiter font-bold">{post.title}</h2>
      </Link>
    </div>
  )
}

export default PostEntry