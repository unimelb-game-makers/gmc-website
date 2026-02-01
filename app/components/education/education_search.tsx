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
    <div className="flex">
      {/* Search/Filter Menu*/}
      <div className='bg-gmc-cream h-100 w-60'>
        {/* Search Title */}
        <div className='bg-gmc-teal-dark px-5 py-2'>
          <h1 className='font-arsenica text-center font-bold text-4xl'>SEARCH</h1>
        </div>
        {/* Search Bar */}
        <div className='bg-[#7E7E7E] rounded-xl mt-2 w-100% mx-3'>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder=""
            className="w-full px-3 py-1 focus:outline-none text-white font-tasa-orbiter"
            />
        </div>
        <div className="mx-3 h-px bg-gmc-teal-dark my-4" />
          <div className='mx-3 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <button onClick={() => handleTags(tag)} key={tag.id}>
                <span className={`text-white text-xs px-3 py-1.5 rounded-full font-tasa-orbiter ${filterTags.some(filterTag => filterTag.id === tag.id) ? colorMap[tag.color] : "bg-gray-600"}`}>
                  {tag.name}
                </span>
              </button>
            ))}
          </div>
      </div>
      <div className='flex-1'>
        {/* Actual Posts*/}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-8 gap-8 mt-12'>
          {filteredPosts.map((post, i) => (
          <PostEntry post={post} key={i}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EducationSearch