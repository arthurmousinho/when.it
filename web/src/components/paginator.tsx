'use client'

import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { PaginatedMetadata } from "@/@types/pagination";

type Props = {
    showing: number;
    meta: PaginatedMetadata;
    basePath: string;
};

function buildQuery(basePath: string, page: number, limit: number) {
    const searchParams = new URLSearchParams({ page: String(page), limit: String(limit) });
    return `${basePath}?${searchParams.toString()}`;
}

export function Paginator({ meta, showing, basePath }: Props) {

    const router = useRouter();
    const searchParams = useSearchParams();

    function onLimitChange(newLimit: number) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("limit", String(newLimit));
        params.set("page", "1"); 
        router.push(`${basePath}?${params.toString()}`);
    };

    return (
        <footer className="flex items-center justify-between w-full">
            <span className="text-sm text-muted-foreground">
                Mostrando {showing} de {meta.total} registros
            </span>

            <footer className="space-x-4 flex items-center">
                <Label>
                    Página {meta.page} de {meta.lastPage} páginas
                </Label>

                <Select
                    defaultValue={meta.limit.toString()}
                    onValueChange={value => onLimitChange(Number(value))}
                >
                    <SelectTrigger className="w-[150px]" id="rows-per-page-input">
                        <SelectValue placeholder="Registros por página" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5 registros</SelectItem>
                        <SelectItem value="10">10 registros</SelectItem>
                        <SelectItem value="15">15 registros</SelectItem>
                        <SelectItem value="20">20 registros</SelectItem>
                    </SelectContent>
                </Select>

                <div className="space-x-2 flex">
                    <Link href={buildQuery(basePath, 1, meta.limit)}>
                        <Button variant="outline" disabled={!meta.hasPreviousPage} type="button">
                            <ChevronsLeft size={20} />
                        </Button>
                    </Link>

                    <Link href={buildQuery(basePath, meta.page - 1, meta.limit)}>
                        <Button variant="outline" disabled={!meta.hasPreviousPage} type="button">
                            <ChevronLeft size={20} />
                        </Button>
                    </Link>

                    <Link href={buildQuery(basePath, meta.page + 1, meta.limit)}>
                        <Button variant="outline" disabled={!meta.hasNextPage} type="button">
                            <ChevronRight size={20} />
                        </Button>
                    </Link>

                    <Link href={buildQuery(basePath, meta.lastPage, meta.limit)}>
                        <Button variant="outline" disabled={!meta.hasNextPage} type="button">
                            <ChevronsRight size={20} />
                        </Button>
                    </Link>
                </div>
            </footer>
        </footer>
    );
}
