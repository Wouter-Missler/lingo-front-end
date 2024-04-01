import { Skeleton } from "@/components/ui/skeleton";

export default function GameCardSkeletonPlaying() {
    return (
        <div className="border border-info rounded-lg p-4">
            <div className="flex justify-between space-x-2 mb-4">
                <Skeleton className="animate-pulse h-4 w-[100px] rounded-md" />
                <Skeleton className="animate-pulse h-4 w-[150px] rounded-md" />
            </div>
            <div className="flex justify-between space-x-2 mb-6">
                <Skeleton className="animate-pulse h-2 w-[100px] rounded-md" />
                <Skeleton className="animate-pulse h-2 w-[100px] rounded-md" />
            </div>
            <Skeleton className="animate-pulse w-full aspect-[4/1.5] rounded-xl" />
        </div>
    );
}
