function CustomerPropertiesSkeleton({ length = 1 }) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="flex animate-pulse justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-pro-100"></div>
            <div className="h-4 w-20 rounded-xl bg-pro-100"></div>
          </div>
          <div className="h-4 w-20 rounded-xl bg-pro-100"></div>
        </div>
      ))}
      <div className="mt-5 font-medium text-gray-800">Interests</div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-6 w-20 animate-pulse rounded-full bg-pro-100"></div>
        ))}
      </div>
    </>
  );
}

export default CustomerPropertiesSkeleton;
