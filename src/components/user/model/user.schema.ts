import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User extends Document {
    @Prop()
    fullname: string;

    @Prop()
    sex: string;

    @Prop()
    birthdate: Date;

    @Prop()
    ip: string;

    @Prop({ type: [String] })
    mac: string[];

    @Prop()
    phone: string;

    @Prop({ type: Object })
    metadata: {
        url: string;
        name: string;
    };

    @Prop({ type: 'array' })
    like: [
        {
            url: string;
            isLive: number;
        }
    ];

    @Prop({ type: 'array' })
    tag: [
        {
            name: string;
        }
    ];

    @Prop({ type: Object })
    social: {
        token: string;
        isGoogle: boolean;
        email: string;
        id: string;
        url: string;
    };
}

export const UserSchema = SchemaFactory.createForClass(User);
