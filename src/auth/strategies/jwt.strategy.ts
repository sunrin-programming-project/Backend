import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor() {
        super({	
          jwtFromRequest: (req) => {
            const token = req.cookies['refreshToken'];
            return token;
          },
          ignoreExpiration: false,
          secretOrKey: process.env.JWT_SECRET,
        });
      }

    validate(
      payload){
        return { 
            googleId: payload.google_id,
            email: payload.email, 
            name: payload.name
        };
    }
}