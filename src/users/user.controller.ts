import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() body: { email: string; password: string; name?: string },
  ) {
    return this.userService.create(body.email, body.password, body.name);
  }
}
