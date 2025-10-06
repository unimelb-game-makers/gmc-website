import React from 'react'
import NotionEducation from '@/services/notion-education';
import PostEntry from '../components/education/post_entry';
import EducationSearch from '../components/education/education_search';

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