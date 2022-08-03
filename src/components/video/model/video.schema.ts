import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Video extends Document {
    @Prop()
    url: string;

    @Prop()
    preview: string;

    @Prop()
    description: string;

    @Prop()
    tag: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
