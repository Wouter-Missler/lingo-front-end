import { Skeleton } from "@/components/ui/skeleton";

export default function GameCardSkeleton() {
    return (
        <div className="border border-info rounded-lg p-4">
            <div className="flex justify-between space-x-2 mb-4">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
            </div>
            <div className="flex justify-between space-x-2 mb-6">
                <Skeleton className="h-2 w-[100px]" />
                <Skeleton className="h-2 w-[100px]" />
            </div>
            <Skeleton className="w-full aspect-[4/1.5] rounded-xl" />
        </div>
    );
}
