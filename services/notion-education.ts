import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { EducationTag, EducationWorkshopPost, EducationPostPage, EducationAuthor } from "@/@types/schema.ds";

export default class NotionEducation {
    client: Client
    n2m: NotionToMarkdown

    constructor() {
        this.client = new Client( { auth: process.env.NOTION_TOKEN })
        this.n2m = new NotionToMarkdown( { notionClient: this.client } )
        this.n2m.setCustomTransformer("paragraph", async (block: any) => {
            const richText = block.paragraph?.rich_text ?? [];
            if (richText.length === 0) return "&nbsp;";
            return false; // fall through to default handler
        })
    }

    async getPublishedWorkshopPosts(): Promise<EducationWorkshopPost[]> {
        const database = process.env.NOTION_EDUCATION ?? '';

        const response = await this.client.dataSources.query({
            data_source_id: database,
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

        return Promise.all(response.results.map(async (res) => {
            return await this.educationTransformer(res);
        }));
    }

    async getSinglePost(slug: string): Promise<EducationPostPage> {
        let post, markdown

        const database = process.env.NOTION_EDUCATION ?? '';

        const response = await this.client.dataSources.query({
            data_source_id: database,
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
        const [mdBlocks, transformedPost] = await Promise.all([
            this.n2m.pageToMarkdown(page.id),
            this.educationTransformer(page),
        ]);

        markdown = this.n2m.toMarkdownString(mdBlocks);
        post = transformedPost;

        console.log(markdown)

        return {
            post,
            markdown
        }
    }

    async getWorkshopTags(): Promise<EducationTag[]> {
        const database = process.env.NOTION_EDUCATION ?? '';
        const response = await this.client.dataSources.retrieve({
            data_source_id: database
        });
        const tags_db = response.properties["Tags"]
        var tags: EducationTag[] = []
        if (tags_db.type == "multi_select") {
            tags = tags_db.multi_select.options.map(options =>({
                id: options.id,
                name: options.name,
                color: options.color,
            }))
        }
        return tags
    }

    async getAuthor(id: string): Promise<EducationAuthor> {
        const committeeInfoId = process.env.NOTION_COMMITTEE_INFO ?? '';
        const response = await this.client.pages.retrieve({
            page_id: id,
        })

        const author: any = response;

        return {
            id: author.id,
            name: author.properties.Name.title[0]?.plain_text,
            about: author.properties.About.rich_text[0]?.plain_text,
            image: author.properties.Photo.files[0]?.file.url,
            social: author.properties.Social.url,
        };
    }

    private async educationTransformer(page: any): Promise<EducationWorkshopPost> {
        const authorRelation = page.properties.Author.relation[0];
        let author = page.properties.Author;

        if (authorRelation?.id) {
            try {
                author = await this.getAuthor(authorRelation.id);
            } catch (error) {
                console.error('Failed to fetch author:', error);
            }
        }

        return {
            id: page.id,
            title: page.properties.Name.title[0]?.plain_text,
            author: author,
            slug: page.properties.Slug.formula.string,
            date: page.properties["Date Published"].date,
            thumbnail: page.properties.Thumbnail.files[0]?.file.url,
            tags: page.properties.Tags.multi_select,
            description: page.properties.Description.rich_text[0]?.plain_text,
        }
    }
}