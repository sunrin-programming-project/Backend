import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_SECRET
        });
    }

    validate(payload: any){
        console.log(payload);
        return { 
            email: payload.email, 
            name: payload.name
        };
    }
}