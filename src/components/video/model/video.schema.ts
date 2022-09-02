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
    esIndex: string;

    @Prop()
    tag: string;

    @Prop({
        required: false
    })
    updatedBy?: string;

    @Prop({
        required: false
    })
    createdBy?: string;

    @Prop({
        required: false
    })
    createdAt?: Date;

    @Prop({
        required: false
    })
    updatedAt?: Date;

    @Prop()
    previewImage: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
