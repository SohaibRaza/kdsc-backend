import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from '~common/constants';

import { UsersModule } from './modules/users/users.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    AuthenticationModule,
    UsersModule,
    MongooseModule.forRoot(env.MONGO_URI, {
      autoLoadEntities: true,
      useFindAndModify: false,
    }),
  ],
})
export class AppModule {}
