import React from 'react'
import NotionCommittee from '@/services/notion-committee'

const page = async () => {
  const service = new NotionCommittee;
  const committeeMembers = await service.getCommittee();

  /* 
  committeeMembers is a mapping of each year to roles,
  each role containing an array of CommitteeMember objects.
  */
  console.log(committeeMembers);

  return (
    <div>Committee page</div>
  )
}

export default page;