import React from 'react'
import NotionEducation from '@/services/notion-education';

const page = async () => {
  const service = new NotionEducation;
  const posts = await service.getSinglePost('test-workshop');
  console.log(posts);

  return (
    <div>Education Page</div>
  )
}

export default page