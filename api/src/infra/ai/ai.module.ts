import { Module } from "@nestjs/common";
import { AIModelService } from "./ai-model.service";
import { VectorStoreService } from "./vector-store.service";

@Module({
    providers: [
        AIModelService,
        VectorStoreService
    ],
    exports: [
        AIModelService,
        VectorStoreService
    ]
})

export class AIModule { }