import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiUrl } from "@/lib/utils";
import { useState } from "react";

export default function ApiUrlDialog() {
    const { apiUrl, setApiUrl, resetApiUrl } = useApiUrl();
    const [apiUrlInputValue, setApiUrlInputValue] = useState(apiUrl);

    const handleSubmit = (
        e:
            | React.MouseEvent<HTMLButtonElement>
            | React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!apiUrlInputValue) {
            return;
        }

        setApiUrl(apiUrlInputValue);

        location.reload();
    };

    const handleReset = () => {
        resetApiUrl();
        location.reload();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">API Url</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Customize the API Url</DialogTitle>
                    <DialogDescription>
                        Change the API Url to point to your own back-end. <br />
                        Saving will reload the page.
                    </DialogDescription>
                </DialogHeader>
                <form
                    className="flex items-center space-x-3"
                    onSubmit={handleSubmit}
                >
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            API Url
                        </Label>
                        <Input
                            id="link"
                            value={apiUrlInputValue}
                            onChange={(e) =>
                                setApiUrlInputValue(e.target.value)
                            }
                        />
                    </div>
                    <Button
                        type="submit"
                        size="sm"
                        className="px-3"
                        onClick={handleSubmit}
                        disabled={apiUrlInputValue === apiUrl}
                    >
                        Save
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={handleReset}
                        disabled={apiUrl === process.env.NEXT_PUBLIC_API_URL}
                    >
                        Reset
                    </Button>
                </form>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
