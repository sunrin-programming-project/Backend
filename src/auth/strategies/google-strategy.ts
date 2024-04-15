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
            callbackURL: process.env.GOOGLE_REDIRECT_URI,
            Scope: ['email', 'profile']
        });
    }

    validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
    ){
        const { id, name, emails } = profile;

        console.log(profile);

        return {
            name: name.displayName,
            email: emails[0].value,
        };
    }
}