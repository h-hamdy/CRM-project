import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable()
export class AuthService{
	constructor(private prisma: PrismaService) {}
	singup(dto: AuthDto) {
		return 'I am singned up'
	}

	signin() {
		return 'I am singned in'
	}
}