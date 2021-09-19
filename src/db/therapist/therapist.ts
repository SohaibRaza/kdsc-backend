import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Children } from '~src/db';
import { generateSlug } from '~src/lib';

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class Therapist {
  @Prop({ trim: true })
  name: string;

  @Prop({ default: generateSlug, permanent: true, unique: true })
  slug: string;

  @Prop()
  department: string;

  @Prop()
  scheduledSlots: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Children' })
  patientsAssigned: Children[];
}

export const TherapistSchema = SchemaFactory.createForClass(Therapist);

export type TherapistDocument = Therapist & mongoose.Document;
