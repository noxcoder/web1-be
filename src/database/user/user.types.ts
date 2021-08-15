import { Document, Model } from 'mongoose';

export interface IUser {
    email?: string;
    password?: string;
    username?: string;
};

export interface IUserDocument extends IUser, Document {};

export interface IUserModel extends Model<IUserDocument> {};