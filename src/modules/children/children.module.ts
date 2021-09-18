import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChildrenSchema } from '~src/db/children';

import { ChildrenService } from './children.service';
import { ChildrenController } from './children.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Children', schema: ChildrenSchema }]),
  ],
  controllers: [ChildrenController],
  providers: [ChildrenService],
})
export class ChildrenModule {}
