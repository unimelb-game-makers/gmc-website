import NotionCommittee from "@/services/notion-committee";
import { CommitteeYear } from "@/@types/schema.ds";
import Image from "next/image";
import CommitteeList from "./committee-list";

export default async function Committee() {
  const notion = new NotionCommittee();
  const committeeMembers: CommitteeYear = await notion.getCommittee();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="relative w-full">
        <Image
          src="/images/chess.jpg"
          alt="Committee"
          width={1920}
          height={1080}
          priority
          className="w-full h-auto"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>Meet The Committee</h1>
        </div>
      </div>
      <CommitteeList committeeMembers={committeeMembers} />
    </main>
  );
}
