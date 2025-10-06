"use client"
import { EducationPostPage, EducationTag, EducationWorkshopPost } from '@/@types/schema.ds'
import React from 'react'
import PostEntry from './post_entry'
import { useState, useEffect } from 'react'

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

const EducationSearch = ({posts, tags} : {posts: EducationWorkshopPost[], tags: EducationTag[]}) => {
    const [query, setQuery] = useState("");
    const [filterTags, setFilterTags] = useState([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const filteredPosts = posts.filter((post) => 
        post.title.toLowerCase().includes(query.toLowerCase()) || post.description.toLowerCase().includes(query.toLowerCase())
    )
    
  return (
    <div className="px-3 md:px-20 lg:px-30 py-10 flex space-x-20 text-black">
      {/* Search/Filter Menu*/}
      <div>
        <div className='bg-white w-80 h-100 rounded-xl p-3'>
            <p className='font-bold text-xl'>Tags</p>
            <div className='flex flex-wrap gap-2'>
                {tags.map((tag) => (
                    <button onClick={() => console.log(tag)} key={tag.id}>
                        <span className={`text-white text-xs px-2 py-1 rounded-full ${colorMap[tag.color]}`}>
                            {tag.name}
                        </span>
                    </button>
                ))}
            </div>
        </div>
      </div>
      <div className='w-screen'>
        {/* Search Bar */}
        <div className='bg-white max-w-full rounded-xl'>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search..."
            className="w-full p-2 border rounded-md focus:outline-none text-black"
        />
        </div>
        {/* Actual Posts*/}
        <div className='grid grid-cols-1 [@media(min-width:1500px)]:grid-cols-2 [@media(min-width:1800px)]:grid-cols-3 [@media(min-width:2400px)]:grid-cols-4 gap-x-24 gap-y-16 mt-12'>
          {filteredPosts.map((post, i) => (
          <PostEntry post={post} key={i}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EducationSearch