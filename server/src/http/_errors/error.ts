export abstract class HTTPError {
    constructor(
        public readonly name: string,
        public readonly message: string,
        public readonly statusCode: number
    ) {}
}