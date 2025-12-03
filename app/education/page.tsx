import React from 'react'
import NotionEducation from '@/services/notion-education';
import EducationSearch from '../components/education/education_search';

export const revalidate = 86400; // Revalidate every 1 day (in seconds)

const page = async () => {
  const service = new NotionEducation;
  const posts = await service.getPublishedWorkshopPosts();
  // console.log(posts);

  const tags = await service.getWorkshopTags();

  return (
    <EducationSearch posts={posts} tags={tags}/>
  )
}

export default page