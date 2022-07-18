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
    ip: any;

    @Prop({ type: 'object' })
    mac: any;

    @Prop()
    phone: string;

    @Prop({ type: 'array' })
    like: [{ video_id: String }];

}

export const UserSchema = SchemaFactory.createForClass(User);
