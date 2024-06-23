import { AuthService } from "./auth.service";
import { AuthDto, AuthDtoSignin } from "./dto";
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    singup(dto: AuthDto): Promise<{
        createdAt: Date;
        email: string;
        id: number;
    }>;
    signin(dto: AuthDtoSignin, response: Response): Promise<{
        message: string;
    }>;
    checkLogin(res: any): any;
}
