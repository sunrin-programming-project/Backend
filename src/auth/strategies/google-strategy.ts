import { Injectable, Scope } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-google-oauth20";

ConfigModule.forRoot();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URI,
            scope: ['profile', 'email'],
        });
    }

    validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
    ){
        const { id, displayName, emails } = profile;

        return {
            googleId: id,
            name: displayName,
            email: emails[0].value,
        };
    }
}