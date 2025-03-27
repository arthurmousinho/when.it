import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export interface DecodedToken {
    userId: string;
}

export const DecodedToken = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext): Promise<DecodedToken> => {
        const request = ctx.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization'];

        if (!authorizationHeader) {
            throw new UnauthorizedException('Crendenciais inválidas');
        }

        const token = authorizationHeader.split(' ')[1];
        const jwtService = new JwtService();

        const decodedToken = jwtService.decode(token) as any;

        if (!decodedToken) {
            throw new UnauthorizedException('Crendenciais inválidas');
        }

        return {
            userId: decodedToken.sub,
        };

    },
    
);