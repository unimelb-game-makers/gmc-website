import AuthorCredits from "@/app/components/education/author_credits";
import NotionEducation from "@/services/notion-education";
import React from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import remarkYoutubePlugin from "remark-youtube";

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

interface Props {
    params: {slug: string};
}

const page = async ({params}: Props) => {
    const param = await params;
    const notion = new NotionEducation();
    const page = await notion.getSinglePost(param.slug);
    const author = await notion.getAuthor(page.post.author.relation[0].id);
    const date = dayjs(page.post.date.start).format("MMMM Do YYYY");

    return (
        <div className="px-3 md:px-20 lg:px-40 py-10 flex flex-col items-center">
            <div className="px-8 py-10 bg-white text-black rounded-lg mb-10 ">
                <div>
                    <p className="text-7xl font-bold">{page.post.title}</p>
                    <p>By {author.name}</p>
                    <p className="text-gray-800">Published {date}</p>
                </div>
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkYoutubePlugin]}>{page.markdown.parent}</ReactMarkdown>
            </div>
            <AuthorCredits author={author}/>
        </div>
    )
}

export default page