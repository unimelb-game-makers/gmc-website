import { Client } from "@notionhq/client";
import { Event } from "@/@types/schema.ds";

export default class NotionEvents {
    client: Client

    constructor() {
        this.client = new Client( { auth: process.env.NOTION_TOKEN })
    }

    async getEvents(): Promise<Event[]> {
        const database = process.env.NOTION_EVENTS ?? '';

        const response = await this.client.databases.query({
            database_id: database,
            filter: {
                property: 'Public Checkbox',
                checkbox: {
                    equals: true,
                }
            },
            sorts: [
                {
                    property: 'Event Date',
                    direction: 'descending',
                }
            ]
        });
        return response.results.map(res => {
            return NotionEvents.eventTransformer(res);
        });
    }

    private static eventTransformer(page: any): Event {
        return {
            id: page.id,
            name: page.properties["Public Name"].rich_text[0]?.plain_text,
            description: page.properties["Public Description"].rich_text[0]?.plain_text,
            date: page.properties["Event Date"].date,
            location: page.properties.Venue?.rich_text[0]?.plain_text,
            thumbnail: page.properties.Thumbnail.files[0]?.file.url
        }
    }
}