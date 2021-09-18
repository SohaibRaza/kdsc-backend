import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Response,
  UseGuards,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { User } from '~src/db';
import { Auth, Mail } from '~src/lib';
import { IAuthResponse, IUsernameResponse } from './authentication.interface';
import { AuthenticationService } from './authentication.service';
import {
  BaseDto,
  CreateUserDto,
  LoginDto,
  ResetPasswordDto,
  SetUsernameDto,
  TokenDto,
  UsernameDto,
} from './dto/authentication.dto';
import { AuthGuard } from '~src/guards';
import { GetUser } from '~src/decorators';
import { env } from '~src/common/constants';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/signup')
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Response() res,
  ): Promise<User> {
    const user = await this.authenticationService.signUp(createUserDto);
    return res.json(await Auth.formatAuthResponse(user));
  }

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Response() res,
  ): Promise<IAuthResponse> {
    const user = await this.authenticationService.login(loginDto);
    return res.json(await Auth.formatAuthResponse(user));
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: BaseDto): Promise<boolean> {
    try {
      const user = await this.authenticationService.forgotPassword(
        forgotPasswordDto,
      );
      if (user) {
        const mail = new Mail();
        await mail.sendMail({
          data: {
            resetPasswordUrl: `${env.APP_URL}/auth/password/reset/${user.resetPasswordToken}`,
          },
          template: 'forgotPassword',
          to: user.email,
        });
      }

      return true;
    } catch (error) {
      throw new Error('Error sending mail');
    }
  }

  @Put('/set-username')
  @UseGuards(AuthGuard)
  async setUsername(
    @Body() updates: { newUsername: string },
    @Response() res,
    @GetUser() user,
  ): Promise<any> {
    const data: SetUsernameDto = {
      newUsername: updates.newUsername,
      id: user?.id,
    };
    const userUpdated = await this.authenticationService.setUsername(data);
    return res.json(await Auth.formatAuthResponse(userUpdated));
  }

  @Get('/token/verify/:token')
  async verifyResetPasswordToken(
    @Param() { token }: TokenDto,
  ): Promise<boolean> {
    const user = await this.authenticationService.verifyResetPasswordToken(
      token,
    );
    return Boolean(user);
  }

  @Put('/reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Response() res,
  ): Promise<IAuthResponse> {
    const user = await this.authenticationService.resetPassword(
      resetPasswordDto,
    );

    const mail = new Mail();
    await mail.sendMail({
      data: {},
      template: 'passwordReset',
      to: user.email,
    });

    return res.json(await Auth.formatAuthResponse(user));
  }

  @Post('social-login/google')
  async googleAuth(@Body() { token }: TokenDto): Promise<IAuthResponse> {
    const isVerified = await Auth.verifyGoogleToken(token);
    if (!isVerified) {
      throw new BadRequestException('Invalid Google Token');
    }

    const data = {
      googleId: isVerified.googleId,
      profile: isVerified.user,
    };

    const googleAuthRes = await this.authenticationService.googleAuth(data);

    const formattedRes = (await Auth.formatAuthResponse(
      googleAuthRes.user,
    )) as IAuthResponse;

    formattedRes.requestUsername = googleAuthRes.requestUsername;

    return formattedRes;
  }

  @Post('/logout')
  async logout(@Response() res): Promise<boolean> {
    return res.json({ message: 'Logged out successfully' });
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async me(@Response() res, @GetUser() authUser): Promise<IAuthResponse> {
    const user = await this.authenticationService.findUserByUsername(
      authUser.username,
    );
    return res.json(await Auth.formatAuthResponse(user));
  }

  @Get('/is-username-available/:username')
  async isUsernameAvailable(
    @Response() res,
    @Param() { username }: UsernameDto,
  ): Promise<IUsernameResponse> {
    const user = await this.authenticationService.findUserByUsername(username);
    return res.json({ available: !Boolean(user) });
  }
}
