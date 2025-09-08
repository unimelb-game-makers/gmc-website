import { MdStringObject } from "notion-to-md/build/types"

export type Event = {
    name: string,
    description: string,
    id: string,
    date: string,
    location: string,
    thumbnail: string
}

export type Date = {
    start: string,
    end: string,
    time_zone: string
}

export type CommitteeMember = {
    name: string,
    role: string,
    about: string,
    social: string,
    year: number,
    image: string
}

export type CommitteeYear = {
    [year: number]: {
        [committee: string]: CommitteeMember[]
    }
}


export type EducationTag = {
    color: string,
    id: string,
    name: string,
}

// export type EducationWorkshopPost = {
//     id: string,
//     title: string,
//     slug: string,
//     thumbnail: string,
//     author: string,
//     fields: EducationField[],
//     date: string,
// }

export type EducationWorkshopPost = {
    id: string,
    title: string,
    slug: string,
    author: {
        id: string,
        type: string,
        relation: object[],
        has_more: boolean
    },
    thumbnail: string,
    tags: EducationTag[],
    date: {
        start: string,
        end: string,
        time_zone: string,
    }
}

export type EducationPostPage = {
    post: EducationWorkshopPost,
    markdown: MdStringObject,
}
