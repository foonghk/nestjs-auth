import { PartialType } from "@nestjs/mapped-types";
import { UserDto } from "../../dto/user.dto";
export class CreateUserDto extends PartialType(UserDto){
    // email:string;
    // password: string;
}
  