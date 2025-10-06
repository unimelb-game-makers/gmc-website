"use client"
import { EducationPostPage, EducationWorkshopPost } from '@/@types/schema.ds'
import React from 'react'
import PostEntry from './post_entry'
import { useState, useEffect } from 'react'

const EducationSearch = ({posts} : {posts: EducationWorkshopPost[]}) => {

    const [query, setQuery] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    console.log(posts)

    const filteredPosts = posts.filter((post) => 
        post.title.toLowerCase().includes(query.toLowerCase()) || post.description.toLowerCase().includes(query.toLowerCase())
    )
    console.log(filteredPosts);
    
  return (
    <div className="px-3 md:px-20 lg:px-30 py-10 flex space-x-20">
      {/* Search/Filter Menu*/}
      <div>
        <div className='bg-white w-80 h-100 rounded-xl'>
          
        </div>
      </div>
      <div>
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