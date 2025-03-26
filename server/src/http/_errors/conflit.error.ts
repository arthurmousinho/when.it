import { HTTPError } from "@/http/_errors/error";

const name = 'Conflito';
const statusCode = 409;
const message = 'Ocorreu um erro de conflito';


export class ConflitError extends HTTPError {
    constructor(customMessage?: string) {
        super(
            name,
            customMessage ?? message,
            statusCode,
        )
    }
}