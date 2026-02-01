import NotionEducation from "@/services/notion-education";
import React from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import remarkYoutubePlugin from "remark-youtube";
import './markdown.css';
import Image from 'next/image';

export const revalidate = 1800; // Revalidate every 30 minutes (in seconds)

// Extract headings from markdown for table of contents
function extractHeadings(markdown: string) {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const headings: { level: number; text: string; id: string }[] = [];
    let match;

    while ((match = headingRegex.exec(markdown)) !== null) {
        const level = match[1].length;
        const text = match[2];
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        headings.push({ level, text, id });
    }

    return headings;
}

const page = async ({ params }: { params: Promise<{ slug: string }>;} ) => {
    const { slug } = await params;
    const notion = new NotionEducation();
    const page = await notion.getSinglePost(slug);
    const author = page.post.author;
    const headings = extractHeadings(page.markdown.parent);

    return (
        <div className='py-50 px-4 md:px-10'>
            {/* Title */}
            <h1 className='text-5xl md:text-6xl font-bold font-tasa-orbiter mb-10 md:ml-56'>
                {page.post.title}
            </h1>

            <div className="flex gap-8">
                {/* Left Sidebar */}
                <div className="w-48 shrink-0 self-start hidden md:block">
                    {/* Table of Contents */}
                    <div className="mb-8 bg-gmc-cream p-3 rounded-lg">
                        {headings.map((heading, index) => (
                            <a
                                key={index}
                                href={`#${heading.id}`}
                                className={`block text-black hover:text-gmc-orange transition-colors font-tasa-orbiter font-medium
                                    ${heading.level === 1 ? 'text-base font-bold' : ''}
                                    ${heading.level === 2 ? 'text-sm pl-2' : ''}
                                    ${heading.level === 3 ? 'text-xs pl-4' : ''}
                                    mb-2`}
                            >
                                {heading.text}
                            </a>
                        ))}
                    </div>

                    {/* Author Info */}
                    <div className="bg-gmc-cream px-3 py-2 rounded-lg">
                        <p className="font-bold text-lg font-tasa-orbiter text-black text-center">Written By:</p>
                        <div className="w-24 h-24 rounded-full bg-gray-400 overflow-hidden mb-2 mx-auto">
                            <Image
                                src={author.image}
                                alt={author.name}
                                width={96}
                                height={96}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <p className="font-bold text-xl font-tasa-orbiter mb-2 text-black text-center">{author.name}</p>
                        <p className="text-sm text-black font-tasa-orbiter">{author.about}</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 w-full">
                    <div className="markdown text-white">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkYoutubePlugin]}
                            components={{
                                h1: ({children}) => {
                                    const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                    return <h1 id={id}>{children}</h1>;
                                },
                                h2: ({children}) => {
                                    const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                    return <h2 id={id}>{children}</h2>;
                                },
                                h3: ({children}) => {
                                    const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                    return <h3 id={id}>{children}</h3>;
                                },
                            }}
                        >
                            {page.markdown.parent}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page