import type { FormActionResponse } from "@/@types/form-action-response";
import { useTransition } from "react";

type UseFormStateParams<T> = {
    action: (data: T) => Promise<FormActionResponse>;
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
};

export function useFormState<T>({ action, onSuccess, onError }: UseFormStateParams<T>) {

    const [isLoading, startTransition] = useTransition();

    async function handleSubmit(data: T) {
        startTransition(async () => {
            const result = await action(data);
            if (result.success) {
                onSuccess(result.message);
                return;
            }
            onError(result.message);
        });
    }

    return {
        handleSubmit,
        isLoading,
    }

}