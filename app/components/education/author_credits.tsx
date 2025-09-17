import { EducationAuthor } from '@/@types/schema.ds'
import React from 'react'
import Image from 'next/image'

const AuthorCredits = ({author}: {author: EducationAuthor}) => {
  return (
    <div className='bg-white w-full rounded-lg'>
      <div className='p-2 text-black flex'>
        <Image src={author.image} alt={author.name} width={128} height={128} className='rounded-full object-cover aspect-square border-blue-950 border-5'/>
        <div className='m-2'>
          <a href={author.social !== null ? "http://" + author.social : ""}>
            <p className='text-3xl font-bold'>{author.name}</p>
          </ a>
          <p>{author.about}</p>
        </div>
      </div>
    </div>
  )
}

export default AuthorCredits