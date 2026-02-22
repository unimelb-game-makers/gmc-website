import React, { Suspense } from 'react'
import NotionEducation from '@/services/notion-education';
import EducationSearch from '../components/education/education_search';
import { BiLoaderAlt } from 'react-icons/bi';

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

function EducationLoading() {
  return (
    <div className="flex justify-center items-center py-32">
      <div className="flex flex-col items-center gap-4 text-gmc-teal">
        <BiLoaderAlt className="w-12 h-12 animate-spin" />
        <p className="text-xl font-arsenica font-bold text-white">Loading Education...</p>
      </div>
    </div>
  );
}

export default function EducationPage() {
  return (
    <div className='py-35'>
      <h1 className='text-center drop-shadow-teal font-akira text-6xl'>EDUCATION</h1>
      <Suspense fallback={<EducationLoading />}>
        <EducationContent />
      </Suspense>
    </div>
  )
}