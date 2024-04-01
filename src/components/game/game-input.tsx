import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type GameInputProps = {
    hint: string;
    error: string | null;
    onSubmit: (attempt: string) => void;
};

export default function GameInput({ hint, error, onSubmit }: GameInputProps) {
    const [attempt, setAttempt] = useState("");
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAttempt(event.target.value);
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (attempt.length === 0) {
            return;
        }

        onSubmit(attempt);
        setAttempt("");
    };

    return (
        <div className="w-full flex flex-col justify-center items-center mt-12">
            <form
                className="grid w-96 max-w-full grid-cols-3 items-center space-x-2"
                onSubmit={handleSubmit}
            >
                <Input
                    value={attempt}
                    onChange={handleChange}
                    placeholder={hint}
                    className={cn("col-span-2", error && "border-red-500")}
                />
                <Button type="submit" variant="outline">
                    Submit
                </Button>
                {error && (
                    <p className="text-red-500 text-sm mt-2 col-span-3">
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}
