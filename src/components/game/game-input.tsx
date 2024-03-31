import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type GameInputProps = {
    hint: string;
    onSubmit: (attempt: string) => void;
};

export default function GameInput({ hint, onSubmit }: GameInputProps) {
    const [attempt, setAttempt] = useState("");
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAttempt(event.target.value);
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(attempt);
        setAttempt("");
    };

    return (
        <div className="w-full flex justify-center items-center mt-12">
            <form
                className="flex items-center space-x-2"
                onSubmit={handleSubmit}
            >
                <Input
                    value={attempt}
                    onChange={handleChange}
                    placeholder={hint}
                />
                <Button type="submit" variant="outline">
                    Submit
                </Button>
            </form>
        </div>
    );
}
