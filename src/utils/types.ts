export interface IFeed {
    _id: string;
    firstName: string;
    lastName: string;
    age?: number;
    skills: string[];
    photoUrl?: string;
    about?: string;
    gender?: string;
    emailId?: string;
}

export type IUser = IFeed;

export interface IRequest {
    _id: string;
    fromUserId: IFeed;
    toUserId?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}