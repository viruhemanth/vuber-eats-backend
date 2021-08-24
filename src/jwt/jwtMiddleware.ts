import { NextFunction, Response, Request } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class jwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction): Promise<any> {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        try {
          const user = await this.userService.findById(decoded['id']);
          req['user'] = user;
        } catch (e) {
          console.log(e);
        }
      }
    }
    next();
  }
}
