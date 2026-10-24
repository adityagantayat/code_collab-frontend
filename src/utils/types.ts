export interface IFeed {
    _id: string,
    firstName: string,
    lastName: string,
    age?: number,
    skills: string[],
    photoUrl?: string,
    about?: string,
    gender?: string,
}