import { Suspense } from "react";
import NotionCommittee from "@/services/notion-committee";
import { CommitteeYear } from "@/@types/schema.ds";
import Image from "next/image";
import CommitteeList from "./committee-list";
import { BiLoaderAlt } from "react-icons/bi";

export const revalidate = 1800; // Revalidate every 30 minutes (in seconds)

// Async component that fetches data — wrapped in Suspense below
async function CommitteeContent() {
  const notion = new NotionCommittee();
  const committeeMembers: CommitteeYear = await notion.getCommittee();

  return (
    <div className="flex items-start w-full py-5">
      <h1 className="hidden sm:block text-vertical-textured text-8xl shrink-0">Committee</h1>
      <div className="flex-1 min-w-0">
        <CommitteeList committeeMembers={committeeMembers} />
      </div>
    </div>
  );
}

function CommitteeLoading() {
  return (
    <div className="flex justify-center items-center py-32">
      <div className="flex flex-col items-center gap-4 text-gmc-teal">
        <BiLoaderAlt className="w-12 h-12 animate-spin" />
        <p className="text-xl font-arsenica font-bold text-white">Loading Committee...</p>
      </div>
    </div>
  );
}

export default function Committee() {
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
        <Suspense fallback={<CommitteeLoading />}>
          <CommitteeContent />
        </Suspense>
      </main>
    </div>
  );
}