import { HTTPError } from "@/http/_errors/error";

export class NotFoundError implements HTTPError {

    public name: string = 'Não encontrado';
    public message: string = 'Não encontrado';
    public statusCode: number = 404

    constructor(message?: string) {
        this.message = message ?? this.message;
    }

}