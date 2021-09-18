import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & mongoose.Document;

export interface IAvatarImage {
  size: number;
  url: string;
}
export interface IUserAvatar {
  small: IAvatarImage;
  medium: IAvatarImage;
  large: IAvatarImage;
}

@Schema()
class AuthProvider {
  @Prop()
  googleId: string;
}

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class User {
  id: string;

  readonly avatar?: IUserAvatar;

  @Prop({ type: AuthProvider })
  authProviders: AuthProvider;

  @Prop({ index: true, sparse: true, trim: true, unique: true, required: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({ select: false })
  resetPasswordExpiry: Date;

  @Prop({ select: false })
  resetPasswordToken: string;

  @Prop({
    index: true,
    sparse: true,
    trim: true,
    unique: true,
  })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.virtual('avatar').get(function (this: UserDocument): IUserAvatar {
//   const email = this.email;
//   return {
//     small: { size: 24, url: gravatarURL(email, 24) },
//     medium: { size: 60, url: gravatarURL(email, 60) },
//     large: { size: 100, url: gravatarURL(email, 100) },
//   };
// });
