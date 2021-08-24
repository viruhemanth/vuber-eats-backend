import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AllowedRoles } from './role.decorator';
import { JwtService } from '../jwt/jwt.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context).getContext();
    // const user: User = gqlContext['user'];
    const token = gqlContext.token;
    if (token) {
      console.log('token', token);
      const decoded = this.jwtService.verify(token.toString());
      console.log('DECODED', decoded['id']);
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const user = await this.userService.findById(decoded['id']);
        if (user) {
          gqlContext['user'] = user;
          if (roles.includes('Any')) {
            return true;
          }
          return roles.includes(user.role);
        }
      }
    }
    return false;

    // if (!user) {
    //   return false;
    // }
    // if (roles.includes('Any')) {
    //   return true;
    // }
    // return roles.includes(user.role);
  }
}
