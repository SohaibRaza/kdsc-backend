import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { generateSlug } from '~src/lib';
import { ApiProperty } from '@nestjs/swagger';
import { ScheduledSessions, Therapist } from '..';
type Relations = 'parent' | 'sibling' | 'uncle/aunt' | 'other_relative';

type Therapies = 'OT' | 'PT' | 'ST';

@Schema()
export class GuardianDetails {
  @Prop()
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  @Prop()
  phone: number;

  @ApiProperty()
  @Prop()
  cnic: number;

  @ApiProperty({ default: 'parent' })
  @Prop()
  relationWithChild: Relations;

  @ApiProperty()
  @Prop()
  address: string;

  @ApiProperty()
  @Prop({ default: generateSlug, permanent: true, unique: true })
  slug: string;
}

export const GuardianDetailsSchema =
  SchemaFactory.createForClass(GuardianDetails);

@Schema({
  timestamps: true,
})
export class TherapistRemarks {
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' })
  therapist: Therapist;

  @ApiProperty()
  @Prop({})
  title: string;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ScheduledSessions' })
  session: ScheduledSessions;
}

export const TherapistRemarksSchema =
  SchemaFactory.createForClass(TherapistRemarks);

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class Children {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  age: string;

  @ApiProperty()
  @Prop()
  dateOfBirth: Date;

  @ApiProperty()
  @Prop({ type: GuardianDetailsSchema })
  guardianDetails: GuardianDetails;

  @ApiProperty({ default: 'waiting' })
  @Prop({ default: 'waiting' })
  status: 'active' | 'waiting';

  @ApiProperty()
  @Prop({ default: generateSlug, permanent: true, unique: true })
  slug: string;

  @ApiProperty()
  @Prop()
  enrolledTherapies?: Therapies[];

  @ApiProperty()
  @Prop({ type: [TherapistRemarksSchema] })
  remarksByDoctors: TherapistRemarks[];
}

export const ChildrenSchema = SchemaFactory.createForClass(Children);

export type ChildrenDocument = Children & mongoose.Document;
