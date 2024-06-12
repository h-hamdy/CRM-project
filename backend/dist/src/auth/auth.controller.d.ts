import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    singup(dto: AuthDto): Promise<{
        email: string;
        id: number;
        createdAt: Date;
    }>;
    signin(dto: AuthDto, response: Response): Promise<{
        message: string;
    }>;
    createUser(body: {
        email: string;
        firstName: string;
        lastName: string;
    }): Promise<{
        email: string;
        password: string;
    }>;
}
