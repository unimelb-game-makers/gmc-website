import { Client } from "@notionhq/client";
import { CommitteeYear, CommitteeMember } from "@/@types/schema.ds";

export default class NotionCommittee {
  client: Client

  constructor() {
    this.client = new Client( { auth: process.env.NOTION_TOKEN })
  }

  async getCommittee(): Promise<CommitteeYear> {
    const committeeInfoId = process.env.NOTION_COMMITTEE_INFO ?? '';
    const committeeYearId = process.env.NOTION_COMMITTEE_YEAR ?? '';

    // Get database info
    const [committeeInfoRes, committeeYearRes] = await Promise.all([
      this.client.databases.query({ database_id: committeeInfoId }),
      this.client.databases.query({ database_id: committeeYearId })
    ]);

    // Storing each row with row id as key
    const committeeInfoMap = new Map();
    committeeInfoRes.results.forEach((res: any) => {
      committeeInfoMap.set(res.id, res);
    });

    const committeeByYear: CommitteeYear = {};
    
    committeeYearRes.results.forEach((res: any) => {
      const relationId = res.properties["Committee Member"].relation[0]?.id;
      if (relationId) {
        const infoPage = committeeInfoMap.get(relationId);

        // Matching id
        if (infoPage) {
          const member = NotionCommittee.toMember(res, infoPage);

          // Init empty year/role
          if (!committeeByYear[member.year]) {
            committeeByYear[member.year] = {};
          }
          if (!committeeByYear[member.year][member.role]) {
            committeeByYear[member.year][member.role] = [];
          }

          committeeByYear[member.year][member.role].push(member);
        }

      }
    });

    return committeeByYear;
  }

  private static toMember(yearPage: any, infoPage: any): CommitteeMember {
    return {
      name: infoPage.properties.Name.title[0]?.plain_text,
      role: yearPage.properties["Role"].select?.name ?? "",
      year: yearPage.properties["Year"].number ?? 0,
      image: infoPage.properties["Photo"].files[0]?.file.url,
      about: infoPage.properties["About"].rich_text[0]?.plain_text,
      social: infoPage.properties["Social"].url,
    }
  }
}
