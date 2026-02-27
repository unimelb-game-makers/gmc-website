import { Client } from "@notionhq/client";
import { CommitteeYear, CommitteeMember } from "@/@types/schema.ds";

/** Route a Notion S3 image URL through our cached proxy API route */
function toProxiedUrl(notionImageUrl: string): string {
  if (!notionImageUrl) return "";
  return `/api/committee-image?url=${encodeURIComponent(notionImageUrl)}`;
}

export default class NotionCommittee {
  client: Client

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_TOKEN });
  }

  async getCommittee(): Promise<CommitteeYear> {
    const committeeInfoId = process.env.NOTION_COMMITTEE_INFO ?? '';
    const committeeYearId = process.env.NOTION_COMMITTEE_YEAR ?? '';

    // Get database info
    const [committeeInfoRes, committeeYearRes] = await Promise.all([
      this.client.dataSources.query({
        data_source_id: committeeInfoId,
        "filter": {
          "and": [
            {
              "or": [
                {
                  "property": "Name",
                  "rich_text": { "is_not_empty": true }
                },
                {
                  "property": "Display Name",
                  "rich_text": { "is_not_empty": true }
                }
              ]
            },
            {
              "property": "Photo",
              "files": { "is_not_empty": true }
            }
          ]
        }
      }),
      this.client.dataSources.query({
        data_source_id: committeeYearId,
        sorts: [
          {
            property: "Role",
            direction: "descending"
          }
        ],
      })
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
        if (infoPage) {
          const member = NotionCommittee.toMember(res, infoPage);
          let committeeName = res.properties["Committee"]?.formula?.string ?? "General";
          const roleName = res.properties["Role"]?.select?.name || "";

          // Override formula fallback for specific roles
          const roleLower = roleName.toLowerCase();
          if (roleLower.includes("vice president") || roleLower.includes("vp")) {
            committeeName = "Executive";
          } else if (/\barts?\b/.test(roleLower)) {
            committeeName = "Arts";
          }

          const enrichedMember: CommitteeMember = {
            ...member,
            image: toProxiedUrl(member.image),
          };

          if (!committeeByYear[enrichedMember.year]) committeeByYear[enrichedMember.year] = {};
          if (!committeeByYear[enrichedMember.year][committeeName]) committeeByYear[enrichedMember.year][committeeName] = [];
          committeeByYear[enrichedMember.year][committeeName].push(enrichedMember);
        }
      }
    });

    return committeeByYear;
  }

  private static toMember(yearPage: any, infoPage: any): CommitteeMember {
    return {
      name: infoPage.properties["Display Name"]?.rich_text[0]?.plain_text || infoPage.properties.Name?.title[0]?.plain_text || "",
      role: yearPage.properties["Role"].select?.name ?? "",
      year: yearPage.properties["Year"].number ?? 0,
      image: infoPage.properties["Photo"]?.files[0]?.file.url ?? "",
      about: infoPage.properties["About"]?.rich_text[0]?.plain_text ?? "",
      social: infoPage.properties["Social"]?.url ?? "",
    };
  }
}
