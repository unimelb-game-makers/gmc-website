export type Event = {
    name: string,
    description: string,
    id: string,
    date: string,
    location: string,
    thumbnail: string,
}

export type CommitteeMember = {
    name: string,
    role: string,
    year: int,
    image: string,
}