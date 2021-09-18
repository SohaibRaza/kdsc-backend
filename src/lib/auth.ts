import { OAuth2Client, TokenPayload } from 'google-auth-library';
import * as jsonwebtoken from 'jsonwebtoken';
import { env } from '~src/common/constants';
import { User } from '~src/db';

export type GoogleAuthPayload = {
  googleId: string;
  user: TokenPayload;
};
export class Auth {
  static EXPIRY_SECONDS: number = 60 * 60 * 24 * 7;
  static GOOGLE_AUTH_CLIENT_ID: string = env.GOOGLE_AUTH_CLIENT_ID;
  static SECRET: jsonwebtoken.Secret = env.JWT_SECRET;

  static async decode(token: string): Promise<GenericObject | string | null> {
    return jsonwebtoken.verify(token, this.SECRET);
  }

  static async sign(attrs: GenericObject, opts?): Promise<string> {
    const expiry =
      attrs.exp || Math.floor(Date.now() / 1000) + this.EXPIRY_SECONDS;
    console.log('<<< Expiry >>>', expiry);

    return jsonwebtoken.sign(
      {
        ...attrs,
        expiry,
      },
      this.SECRET,
      opts,
    );
  }

  static async generateToken(
    user: GenericObject,
    opts?: { exp: number /* number of seconds */ },
  ): Promise<string> {
    return this.sign({
      userId: user.id,
      ...(opts?.exp && { exp: opts.exp }),
    });
  }

  static async verifyGoogleToken(
    token: string,
  ): Promise<GoogleAuthPayload | null> {
    try {
      const client = new OAuth2Client(this.GOOGLE_AUTH_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: this.GOOGLE_AUTH_CLIENT_ID,
      });
      const user = ticket.getPayload();
      const googleId = user['sub'];
      return {
        googleId,
        user,
      };
    } catch (err) {
      return null;
    }
  }

  static async formatAuthResponse(
    user,
    opts: {
      jwtToken?: boolean;
    } = { jwtToken: true },
  ): Promise<{
    user: User;
    jwtToken?: string;
  }> {
    const { jwtToken } = opts;
    const { password, resetPasswordExpiry, resetPasswordToken, ...rest } =
      user.toObject();

    const response = {
      user: rest,
      ...(jwtToken && {
        jwtToken: await this.sign({
          user,
        }),
      }),
    };

    return response;
  }
}
