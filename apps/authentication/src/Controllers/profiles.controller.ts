import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserLoginDTO } from '@app/common/Authentication/DTO/UserLoginDTO';
import { AuthenticationService } from '../Services/authentication.service';
import { CreateProfile } from '@app/common/Authentication/DTO/CreateProfile.dto';

@Controller("authentication")
export class ProfileController {
  constructor(private readonly authenticationService: AuthenticationService) {}


  @MessagePattern({cmd: 'login'})
  index(login: UserLoginDTO) {
    return this.authenticationService.login(login);
  }

  @MessagePattern({cmd: 'login'})
  store(profile: CreateProfile) {
    return ;
  }

  @MessagePattern({cmd: 'login'})
  edit() {
    return ;
  }
  
  @MessagePattern({cmd: 'login'})
  update(login: UserLoginDTO) {
    return this.authenticationService.login(login);
  }

  @MessagePattern({cmd: 'login'})
  destroy(login: UserLoginDTO) {
    return this.authenticationService.login(login);
  }

}
