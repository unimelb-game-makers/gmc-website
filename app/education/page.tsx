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
      <EducationSearch posts={posts} tags={tags}/>
    </div>
  )
}

export default page