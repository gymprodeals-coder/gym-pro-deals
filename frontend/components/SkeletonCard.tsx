export default function SkeletonCard() {
    return (
        <div className="bg-[#111] rounded-2xl shadow-lg border border-gray-800 flex flex-col h-full animate-pulse">
            <div className="h-56 bg-[#0a0a0a] w-full" />
            <div className="p-5 flex flex-col flex-grow space-y-4">
                <div className="space-y-3 mb-4">
                    <div className="h-5 bg-gray-800 rounded w-full" />
                    <div className="h-5 bg-gray-800 rounded w-4/5" />
                </div>
                <div className="space-y-2">
                    <div className="h-3 bg-gray-800 rounded w-full" />
                    <div className="h-3 bg-gray-800 rounded w-2/3" />
                </div>
                <div className="mt-auto space-y-2 pt-4">
                    <div className="h-10 w-full bg-gray-800 rounded-xl" />
                    <div className="h-10 w-full bg-gray-800 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
