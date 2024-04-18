import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-access'){
    constructor() {
        super({	
          jwtFromRequest: ExtractJwt.fromExtractors([
            (request) => {
              if(!request || !request.cookies) {
                return null;
              }
              return request.cookies.accessToken;
            },
          ]),
          ignoreExpiration: false,
          secretOrKey: process.env.JWT_SECRET,
        });
      }

    validate(payload){
        //console.log(payload);
        
        return { 
            email: payload.email, 
            name: payload.name
        };
    }
}