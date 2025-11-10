function ActionSkeleton({ length = 1 }) {
  return Array.from({ length }).map((_, index) => (
    <div key={index} className="mb-10 flex animate-pulse gap-4">
      <div className="relative">
        <div className="flex-center h-10 w-10 rounded-full bg-gray-200"></div>
        <div className="absolute left-1/2 h-full w-0 -translate-x-1/2 border border-dashed"></div>
      </div>
      <div className="flex-1">
        <div className="space-y-2">
          <div className="h-4 w-16 rounded-xl bg-gray-200"></div>
          <div className="h-3 w-20 rounded-xl bg-gray-200"></div>
        </div>
        <div className="mt-4 h-16 rounded-xl bg-gray-200"></div>
      </div>
    </div>
  ));
}

export default ActionSkeleton;
