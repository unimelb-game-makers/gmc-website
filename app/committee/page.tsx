import NotionCommittee from "@/services/notion-committee";
import { CommitteeYear } from "@/@types/schema.ds";
import Image from "next/image";
import CommitteeList from "./committee-list";

export const revalidate = 1800; // Revalidate every 30 minutes (in seconds)

export default async function Committee() {
  const notion = new NotionCommittee();
  const committeeMembers: CommitteeYear = await notion.getCommittee();

  return (
    <div className='py-35'>
      <main className="flex min-h-screen flex-col items-center">
        <div className="relative w-full">
          <Image
            src="/images/committee.png"
            alt="Committee"
            width={1920}
            height={1080}
            priority
            className="w-full h-auto"
          />
        </div>
        <div className="flex items-start w-full py-10">
          <h1 className="text-vertical-textured text-8xl shrink-0">Committee</h1>
          <div className="flex-1 min-w-0">
            <CommitteeList committeeMembers={committeeMembers} />
          </div>
        </div>
      </main>
    </div>
  );
}