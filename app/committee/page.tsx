import { Suspense } from "react";
import NotionCommittee from "@/services/notion-committee";
import { CommitteeYear } from "@/@types/schema.ds";
import Image from "next/image";
import CommitteeList from "./committee-list";
import PageLoading from "../components/shared/page_loading";

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
        <Suspense fallback={<PageLoading message="Loading Committee..." />}>
          <CommitteeContent />
        </Suspense>
      </main>
    </div>
  );
}