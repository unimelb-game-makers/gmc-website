import React from 'react'
import NotionEducation from '@/services/notion-education';
import EducationSearch from '../components/education/education_search';

export const revalidate = 1800; // Revalidate every 30 minutes (in seconds)

const page = async () => {
  const service = new NotionEducation;
  const posts = await service.getPublishedWorkshopPosts();
  // console.log(posts);

  const tags = await service.getWorkshopTags();

  return (
    <div className='py-35'>
      <h1 className='text-center drop-shadow-teal font-akira text-6xl'>EDUCATION</h1>
      <div className='mt-10 flex justify-start'>
        <h1 className='text-vertical-textured text-6xl'>FILTER</h1>
        <EducationSearch posts={posts} tags={tags}/>
      </div>
    </div>
  )
}

export default page