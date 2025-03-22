import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { SignUpForm } from "./signup-form";

export default function SignUpPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">
                   Crie uma conta
                </CardTitle>
            </CardHeader>
            <CardContent>
                <SignUpForm />
            </CardContent>
        </Card>
    )
}