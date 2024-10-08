import { AuthService } from "./auth.service";
import { AuthDto, AuthDtoSignin } from "./dto";
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    singup(dto: AuthDto): Promise<{
        email: string;
        id: number;
        createdAt: Date;
    }>;
    signin(dto: AuthDtoSignin, response: Response): Promise<{
        message: string;
    }>;
    checkLogin(res: any): any;
}
