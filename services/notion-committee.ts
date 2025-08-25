import { Client } from "@notionhq/client";
import { CommitteeMember } from "@/@types/schema.ds";

export default class NotionCommittee {
  client: Client

  constructor() {
    this.client = new Client( { auth: process.env.NOTION_TOKEN })
  }

  async getCommittee(): Promise<{[role: string]: CommitteeMember[]}> {
    const databaseId = process.env.NOTION_COMMITTEE ?? '';

    const data = await this.client.databases.query({database_id: databaseId});

    // Group committee members by their role
    return data.results.reduce((acc, res) => {
      const member = NotionCommittee.toMember(res);
      if (!acc[member.role]) {
        acc[member.role] = [];
      }
      acc[member.role].push(member);
      return acc;
    }, {} as {[role: string]: CommitteeMember[]});
  }

  private static toMember(page: any): CommitteeMember {
    return {
      name: page.properties.Name.title[0]?.plain_text,
      role: page.properties.Role.select?.name ?? "",
      year: parseInt(page.properties.Year.select?.name ?? 0),
      image: page.properties["Profile Image"].files[0]?.file.url
    }
  }
}
