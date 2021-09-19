import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { generateSlug } from '~src/lib';
import { ApiProperty } from '@nestjs/swagger';
import { Children, Therapist } from '~src/db';

export type TimeSlots =
  | '12-1'
  | '1-2'
  | '2-3'
  | '3-4'
  | '4-5'
  | '5-6'
  | '6-7'
  | '7-8'
  | '8-9'
  | '9-10'
  | '10-11'
  | '11-12';

export type WeekDays = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';

export class ScheduleOptions {
  @Prop({ type: String })
  freq: 'daily' | 'weekly' | 'monthly';

  @Prop({ type: Number })
  interval: number;

  @Prop()
  byweekday?: WeekDays[];

  @Prop()
  bymonthday?: number[];

  @Prop()
  bymonth?: number[];
}

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class ScheduledSessions {
  child: Children;
  therapist: Therapist;
  timeSlot: TimeSlots;

  @Prop()
  scheduleOptions?: ScheduleOptions;

  @Prop()
  startedAt: Date;

  @Prop()
  until: Date;

  @Prop()
  sessionRemarks: string;
}

export const ScheduledSessionsSchema =
  SchemaFactory.createForClass(ScheduledSessions);

const timeSlots = {
  AM: [
    '12-1',
    '1-2',
    '2-3',
    '3-4',
    '4-5',
    '5-6',
    '6-7',
    '7-8',
    '8-9',
    '9-10',
    '10-11',
    '11-12',
  ],
  PM: [
    '12-1',
    '1-2',
    '2-3',
    '3-4',
    '4-5',
    '5-6',
    '6-7',
    '7-8',
    '8-9',
    '9-10',
    '10-11',
    '11-12',
  ],
};
