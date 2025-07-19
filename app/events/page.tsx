import React from 'react'
import NotionEvents from '@/services/notion-events'

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const page = async () => {
  const service = new NotionEvents;
  const events = await service.getEvents();
  console.log(events);

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