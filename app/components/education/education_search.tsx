"use client"
import { EducationTag, EducationWorkshopPost } from '@/@types/schema.ds'
import React from 'react'
import PostEntry from './post_entry'
import { useState } from 'react'

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
    const [filterTags, setFilterTags] = useState<EducationTag[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleTags = (tag: EducationTag) => {
        if (filterTags.some(filterTag => filterTag.id === tag.id)) {
            setFilterTags(prev => prev.filter(filterTag => filterTag.id !== tag.id))
        } else {
            setFilterTags(prev => [...prev, tag]);
        }
    }

    const filteredPosts = posts.filter((post) => 
        (post.title.toLowerCase().includes(query.toLowerCase()) || post.description.toLowerCase().includes(query.toLowerCase())) && filterTags.every(tag => post.tags.some(postTag => postTag.id === tag.id))
    )
    
  return (
    <div className="px-3 md:px-20 lg:px-30 py-10 flex flex-col lg:flex-row space-x-0 md:space-x-20 text-black">
      <div className="relative min-h-[1vh] w-full lg:w-80">
        <button
          className="bg-white w-full max-w-[90vw] md:max-w-[85vw] lg:max-w-full p-3 rounded-xl font-bold text-xl lg:hidden flex justify-between items-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Tag Selection
          <span>{menuOpen ? "▲" : "▼"}</span>
        </button>
      {/* Search/Filter Menu*/}
        <div className={`bg-white rounded-xl p-3 mt-2 lg:block ${menuOpen ? "block" : "hidden"} w-full max-w-[90vw] md:max-w-[85vw] lg:max-w-full`}>
          <h2 className='text-xl font-bold mx-2'>Tags</h2>
          <hr className=' my-2'></hr>
          <div className='bg-white rounded-xl p-3'>
              <div className='flex flex-wrap gap-2'>
                  {tags.map((tag) => (
                      <button onClick={() => handleTags(tag)} key={tag.id}>
                          <span className={`text-white text-xs px-3 py-1.5 rounded-full ${filterTags.some(filterTag => filterTag.id === tag.id) ? colorMap[tag.color] : "bg-gray-300"}`}>
                              {tag.name}
                          </span>
                      </button>
                  ))}
              </div>
          </div>
        </div>
      </div>
      <div className='w-full'>
        {/* Search Bar */}
        <div className='bg-white w-full max-w-[90vw] md:max-w-[85vw] lg:max-w-full rounded-xl'>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search..."
            className="w-full p-2 border rounded-md focus:outline-none text-black"
        />
        </div>
        {/* Actual Posts*/}
        <div className='grid grid-cols-1 mx-auto [@media(min-width:1300px)]:grid-cols-2 [@media(min-width:1300px)]:justify-items-center [@media(min-width:1800px)]:grid-cols-3 [@media(min-width:2400px)]:grid-cols-4 gap-x-24 gap-y-16 mt-12'>
          {filteredPosts.map((post, i) => (
          <PostEntry post={post} key={i}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EducationSearch