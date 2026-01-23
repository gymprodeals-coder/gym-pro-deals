export default function SkeletonCard() {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full animate-pulse">
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-200 w-full" />

            <div className="p-4 flex flex-col flex-grow space-y-3">
                {/* Store Badge */}
                <div className="h-5 w-16 bg-gray-200 rounded" />

                {/* Title */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>

                {/* Price Block */}
                <div className="mt-auto pt-2 space-y-2">
                    <div className="h-8 w-24 bg-gray-200 rounded" />
                    <div className="h-10 w-full bg-gray-200 rounded-lg" />
                </div>
            </div>
        </div>
    );
}
