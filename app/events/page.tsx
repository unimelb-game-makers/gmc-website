import React from 'react'
import NotionEvents from '@/services/notion-events'

const page = async () => {

  // const databaseId = process.env.NOTION_EVENTS
  // const response = await notion.databases.query({
  //           database_id: databaseId,
  //           filter: {
  //               property: 'Public Checkbox',
  //               checkbox: {
  //                   equals: true,
  //               }
  //           },
  //           sorts: [
  //               {
  //                   property: 'Event Date',
  //                   direction: 'descending',
  //               }
  //           ]
  //       });
  
  // console.log(response);
  return (
    <div>Events Page</div>
  )
}

export default page