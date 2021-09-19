import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TherapistService } from './therapist.service';
import { TherapistController } from './therapist.controller';
import { TherapistSchema } from '~src/db';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Therapist', schema: TherapistSchema }]),
  ],
  controllers: [TherapistController],
  providers: [TherapistService],
})
export class TherapistModule {}
