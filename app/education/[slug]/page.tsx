import AuthorCredits from "@/app/components/education/author_credits";
import NotionEducation from "@/services/notion-education";
import React from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import remarkYoutubePlugin from "remark-youtube";
import './markdown.css';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

export const revalidate = 86400; // Revalidate every 1 day (in seconds)

const page = async ({ params }: { params: Promise<{ slug: string }>;} ) => {
    const { slug } = await params;
    const notion = new NotionEducation();
    const page = await notion.getSinglePost(slug);
    const author = page.post.author
    const date = dayjs(page.post.date.start).format("MMMM Do YYYY");

    return (
        <div className="px-3 md:px-20 lg:px-40 py-10 flex flex-col items-center">
            <div className="px-8 py-10 bg-white text-black rounded-lg mb-10 ">
                <div>
                    <p className="text-7xl font-bold">{page.post.title}</p>
                    <p>By {author.name}</p>
                    <p className="text-gray-800">Published {date}</p>
                </div>
                <div className="markdown">
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkYoutubePlugin]}>{page.markdown.parent}</ReactMarkdown>
                </div>
            </div>
            <AuthorCredits author={author}/>
        </div>
    )
}

export default page