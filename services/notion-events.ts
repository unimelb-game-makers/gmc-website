import { Client } from "@notionhq/client";
import { Event } from "@/@types/schema.ds";

export default class NotionEvents {
    client: Client

    constructor() {
        this.client = new Client( { auth: process.env.NOTION_TOKEN })
    }

    async getEvents(): Promise<Event[]> {
        const database = process.env.NOTION_PROJECTS ?? '';

        const response = await this.client.dataSources.query({
            data_source_id: database,
            filter: {
                and: [
                    {
                        property: 'Date',
                        date: {
                            is_not_empty: true,
                        }
                    },
                    {
                        property: 'Event Name',
                        title: {
                            is_not_empty: true,
                        }
                    },
                    {
                        property: 'Is ready for public',
                        checkbox: {
                            equals: true,
                        }
                    }
                ]
            },
            sorts: [
                {
                    property: 'Date',
                    direction: 'ascending',
                }
            ],
        });
        return response.results.map(res => {
            return NotionEvents.eventTransformer(res);
        });
    }

    private static eventTransformer(page: any): Event {
        return {
            id: page.id, 
            name: page.properties["Event Name"]?.title[0]?.plain_text ?? null,
            description: page.properties.Description?.rich_text?.[0]?.plain_text ?? null,
            date: page.properties.Date?.date ?? null,
            location: page.properties.Venue?.rich_text?.[0]?.plain_text ?? null,
            thumbnail: page.properties.Thumbnail?.files?.[0]?.file?.url ?? null,
        }
    }
}