import React from 'react'
import NotionEducation from '@/services/notion-education';
import PostEntry from '../components/education/post_entry';

const page = async () => {
  const service = new NotionEducation;
  const posts = await service.getPublishedWorkshopPosts();
  // console.log(posts);

  return (
    <div className="px-3 md:px-20 lg:px-40 py-10 ">
      {/* Search/Filter Menu*/}
      <div>

      </div>
      {/* Actual Posts*/}

      <div className='grid gap-4 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4'>
        {posts.map((post, i) => (
        <PostEntry post={post} key={i}/>
        ))}
      </div>
    </div>
  )
}

export default page