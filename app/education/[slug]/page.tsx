import NotionEducation from "@/services/notion-education";
import React from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import remarkYoutubePlugin from "remark-youtube";

interface Props {
    params: {slug: string};
}

const page = async ({params}: Props) => {
    const param = await params;
    const notion = new NotionEducation();
    const page = await notion.getSinglePost(param.slug);

    return (
        <div className="px-4 md:px-20 lg:px-40 py-10 flex flex-col items-center">
            <div className="px-5.0">
                <div>
                    <h1>{page.post.title}</h1>
                    <p>{page.post.date.start}</p>
                </div>
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkYoutubePlugin]}>{page.markdown.parent}</ReactMarkdown>
            </div>
        </div>
    )
}

export default page