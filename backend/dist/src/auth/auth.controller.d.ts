import { AuthService } from "./auth.service";
import { AuthDto, AuthDtoSignin } from "./dto";
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    singup(dto: AuthDto): Promise<{
        id: number;
        email: string;
        createdAt: Date;
    }>;
    signin(dto: AuthDtoSignin, response: Response): Promise<{
        message: string;
    }>;
    createUser(body: {
        email: string;
        firstName: string;
        lastName: string;
        number: string;
    }): Promise<{
        email: string;
        password: string;
    }>;
    checkLogin(res: any): any;
}
