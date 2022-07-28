import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class User extends Document {
    @Prop()
    fullname: string;

    @Prop()
    sex: string;

    @Prop()
    birthdate: Date;

    @Prop({ type: 'object' })
    ip: object;

    @Prop({ type: 'object' })
    mac: [{ mac: string }];

    @Prop()
    phone: string;

    @Prop({ type: 'object' })
    like: [{ video_id: string }];
}

export const UserSchema = SchemaFactory.createForClass(User);
