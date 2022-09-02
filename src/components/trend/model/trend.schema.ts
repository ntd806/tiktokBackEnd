import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrendDocument = Trend & Document;
@Schema()
export class Trend extends Document {
    @Prop()
    nameTrend: string;

    @Prop()
    tag: string;

    @Prop({ type: Date })
    createddAt: Date;

    @Prop({ type: Date })
    updateddAt: Date;
}

export const TrendSchema = SchemaFactory.createForClass(Trend);
