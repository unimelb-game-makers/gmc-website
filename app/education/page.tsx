import React, { Suspense } from 'react'
import NotionEducation from '@/services/notion-education';
import EducationSearch from '../components/education/education_search';
import PageLoading from '../components/shared/page_loading';

export const revalidate = 1800; // Revalidate every 30 minutes (in seconds)

async function EducationContent() {
  const service = new NotionEducation;
  const posts = await service.getPublishedWorkshopPosts();
  const tags = await service.getWorkshopTags();

  return (
    <div className='mt-10 flex justify-start items-start'>
      <h1 className='text-vertical-textured text-6xl'>FILTER</h1>
      <EducationSearch posts={posts} tags={tags} />
    </div>
  );
}

export default function EducationPage() {
  return (
    <div className='py-35'>
      <h1 className='text-center drop-shadow-teal font-akira text-6xl'>EDUCATION</h1>
      <Suspense fallback={<PageLoading message="Loading Education..." />}>
        <EducationContent />
      </Suspense>
    </div>
  )
}