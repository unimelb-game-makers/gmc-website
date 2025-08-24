import React from 'react'
import NotionCommittee from '@/services/notion-committee'

const page = async () => {
  const service = new NotionCommittee;
  const committeeMembers = await service.getCommittee();

  // committeeMembers stored as a dictionary. Keys are the committee roles. Values is an array of objects (members).
  console.log(committeeMembers);

  return (
    <div>Committee page</div>
  )
}

export default page;