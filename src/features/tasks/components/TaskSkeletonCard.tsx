import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 mt-6">
      <div className="space-y-2">
        <Skeleton className="h-[50px] w-full rounded-xl" />
        <Skeleton className="h-[50px] w-full rounded-xl" />
        <Skeleton className="h-[50px] w-full rounded-xl" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
