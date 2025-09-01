import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { EducationTag, EducationWorkshopPost, EducationPostPage } from "@/@types/schema.ds";

export default class NotionEducation {
    client: Client
    n2m: NotionToMarkdown

    constructor() {
        this.client = new Client( { auth: process.env.NOTION_TOKEN })
        this.n2m = new NotionToMarkdown( { notionClient: this.client } )
    }

    async getPublishedWorkshopPosts(): Promise<EducationWorkshopPost[]> {
        const database = process.env.NOTION_EDUCATION ?? '';

        const response = await this.client.databases.query({
            database_id: database,
            filter: {
                property: 'Published',
                checkbox: {
                    equals: true,
                }
            },
            sorts: [
                {
                    property: 'Date Published',
                    direction: 'descending',
                }
            ]
        });

        return response.results.map(res => {
            return NotionEducation.educationTransformer(res);
        });
    }

    async getSinglePost(slug: string): Promise<EducationPostPage> {
        let post, markdown

        const database = process.env.NOTION_EDUCATION ?? '';

        const response = await this.client.databases.query({
            database_id: database,
            filter: {
                property: 'Slug',
                formula: {
                    string: {
                        equals: slug
                    }
                }
            }
        })

        if (!response.results[0]) {
            throw 'No results available';
        }


        const page = response.results[0];
        const mdBlocks = await this.n2m.pageToMarkdown(page.id);

        markdown = this.n2m.toMarkdownString(mdBlocks);
        post = NotionEducation.educationTransformer(page);

        return {
            post,
            markdown
        }
    }

    private static educationTransformer(page: any): EducationWorkshopPost {
            return {
                id: page.id,
                title: page.properties.Name.title[0]?.plain_text,
                author: page.properties.Author,
                slug: page.properties.Slug.formula.string,
                date: page.properties["Date Published"].date,
                thumbnail: page.properties.Thumbnail.files[0]?.file.url,
                tags: page.properties.Tags.multi_select,
            }
        }
    }