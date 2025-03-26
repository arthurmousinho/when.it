import { HTTPError } from "@/http/_errors/error";

export class UnauthorizedError implements HTTPError {

    public name: string = 'Sem autorização';
    public message: string = 'Credenciais inválidas';
    public statusCode: number = 401

    constructor(message?: string) {
        this.message = message ?? this.message;
    }

}