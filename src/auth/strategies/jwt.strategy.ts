import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

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
        console.log('jwt strategy');
        console.log(payload);

        return { 
            email: payload.email, 
            name: payload.name
        };
    }
}