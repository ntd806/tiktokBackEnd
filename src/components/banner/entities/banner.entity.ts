import { Column, Entity } from 'typeorm';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Banner extends Document {
    _id: string;

    @Prop({ required: false, name: 'createdAt' })
    createdAt: string;

    @Prop({ required: false, name: 'updatedAt' })
    updatedAt: string;

    @Prop({ required: false, name: 'status' })
    status: string;

    @Prop({ required: false, name: 'imageUrl' })
    imageUrl: string;

    @Prop({ required: false, name: 'template' })
    template: string;

    @Prop({ required: false, name: 'transparent' })
    transparent: boolean;

    @Prop({ type: Object })
    metadata: Metadata;

    @Prop({ required: false, name: 'title' })
    title: string;

    @Prop({ required: false, name: 'campaignId' })
    campaignId: string;
    @Prop({ required: false, name: 'startDate' })
    startDate: Date;

    @Prop({ required: false, name: 'endDate' })
    endDate: Date;

    @Prop({ required: false, name: 'hidden' })
    hidden: false;
}

interface Metadata {
    description: string;
    title: string;
}

const BannerSchema = SchemaFactory.createForClass(Banner);

BannerSchema.set('timestamps', { createdAt: true, updatedAt: true });

export { BannerSchema };
