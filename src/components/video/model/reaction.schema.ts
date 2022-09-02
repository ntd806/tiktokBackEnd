import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Reaction extends Document {
    @Prop()
    url: string;

    @Prop()
    userId: string;

    @Prop()
    reactionDate?: Date;

    @Prop()
    isLive: boolean;

    @Prop()
    isLiked: boolean;

    @Prop()
    videoId: string;

    @Prop()
    previewImage: string | null | undefined;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);
