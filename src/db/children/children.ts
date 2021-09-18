import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { generateSlug } from '~src/lib';
import { ApiProperty } from '@nestjs/swagger';
type Relations = 'parent' | 'sibling' | 'uncle/aunt' | 'other_relative';

type Therapies = 'OT' | 'PT' | 'ST';

@Schema()
class GuardianDetails {
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
}

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
  @Prop()
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
}

export const ChildrenSchema = SchemaFactory.createForClass(Children);

export type ChildrenDocument = Children & mongoose.Document;
