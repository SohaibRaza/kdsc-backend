import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from '~common/constants';

import { UsersModule } from './modules/users/users.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ChildrenModule } from './modules/children/children.module';
import { TherapistModule } from './modules/therapist/therapist.module';

@Module({
  imports: [
    AuthenticationModule,
    UsersModule,
    MongooseModule.forRoot(env.MONGO_URI, {
      autoLoadEntities: true,
      useFindAndModify: false,
    }),
    ChildrenModule,
    TherapistModule,
  ],
})
export class AppModule {}
