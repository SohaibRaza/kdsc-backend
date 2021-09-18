import * as crypto from 'crypto';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { User, UserDocument } from '~src/db';
import bcrypt from '~src/lib/bcrypt';

import { generateSlug } from '~src/lib';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  BaseDto,
  CreateUserDto,
  GoogleAuthDto,
  LoginDto,
  ResetPasswordDto,
  SetUsernameDto,
} from './dto/authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async signUp(params: CreateUserDto): Promise<User> {
    const { username, email, password } = params;

    if (!username || !email || !password) return;

    const isExisting = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isExisting)
      throw new BadRequestException('This account is already in use.');

    const attrs = {
      email,
      username: username.toLowerCase(),
      password: await bcrypt.hash(password),
    };

    const user = new this.userModel(attrs);
    await user.save();

    return user;
  }

  async login(params: LoginDto): Promise<any> {
    const { email, password } = params;
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) throw new BadRequestException('Incorrect Credentials');

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) throw new BadRequestException('Incorrect Credentials');

    return user;
  }

  async forgotPassword(params: BaseDto): Promise<User | null> {
    try {
      const { email } = params;

      const user = await this.userModel.findOne({ email });

      if (user) {
        user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordExpiry = dayjs().add(1, 'h').toDate();
        await user.save();
        return user;
      }
    } catch (error) {
      return null;
    }
  }

  async setUsername(params: SetUsernameDto) {
    const { newUsername } = params;

    if (!newUsername)
      throw new BadRequestException('Invalid set username request');

    const userExists = await this.userModel.findOne({ username: newUsername });

    if (userExists) throw new BadRequestException('Username is not available');

    const user = await this.userModel.findOne({ _id: params?.id });
    user.username = newUsername.toLowerCase();
    await user.save();

    return user;
  }

  async verifyResetPasswordToken(token: string): Promise<boolean> {
    const user = await this.userModel.findOne({
      resetPasswordExpiry: { $gt: dayjs().toDate() },
      resetPasswordToken: token,
    });
    return Boolean(user);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<User> {
    const { token: resetPasswordToken, password } = resetPasswordDto;

    const user = await this.userModel.findOne({
      resetPasswordExpiry: { $gt: dayjs().toDate() },
      resetPasswordToken,
    });

    if (!user) {
      throw new BadRequestException('Invalid Token!');
    }

    user.password = await bcrypt.hash(password);
    user.resetPasswordToken = null;
    user.resetPasswordExpiry = null;

    await user.save();

    return user;
  }

  async googleAuth(
    data: GoogleAuthDto,
  ): Promise<{ user: User; requestUsername: boolean }> {
    const { googleId, profile } = data;
    const user = await this.userModel.findOne({ email: profile.email });
    if (!user) {
      let [username] = profile.email.split('@');
      username = `${username}${generateSlug()}`;

      const newUser = await this.userModel.create({
        authProviders: {
          googleId,
        },
        email: profile.email,
        username,
      });
      return { user: newUser, requestUsername: true };
    }

    if (!user.authProviders?.googleId) {
      user.authProviders = {
        ...(user.authProviders || {}),
        googleId,
      };
      await user.save();
    }

    return { user, requestUsername: false };
  }

  async findUserByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    return user;
  }
}
