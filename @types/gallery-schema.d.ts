import { Inter_Tight } from "next/font/google"

export type Game = {
    id: int,
    name: string,
    thumbnail: string,
    link: string,
    description: string,
    approved: boolean,
    created_at: Date,
    updated_at: Date,

    tags: TagSummary[],
    creators: CreatorSummary[]
}

export type GameSummary = {
    id: int,
    name: string,
    thumbnail: string,
}

export type Tag = {
    id: int,
    name: string,
    description: string,
}

export type TagSummary = {
    id: int,
    name: string,
}

export type Creator = {

}

export type CreatorSummary = {

}
