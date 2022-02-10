import { PartialType } from "@nestjs/mapped-types";
import { UserDto } from "../../dto/user.dto";
export class LoginDto extends PartialType(UserDto){
    
}