import { Document } from 'mongoose';

export interface ITrend extends Document {
    readonly nameTrend: string;
    readonly tag: string;
}
