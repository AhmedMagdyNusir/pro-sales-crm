function CustomersCardSkeleton({ length = 1 }) {
  return Array.from({ length }).map((_, index) => (
    <div key={index} className="flex h-[135px] min-w-[300px] animate-pulse gap-3 rounded-xl bg-white p-5 shadow">
      <div className="flex-center h-10 w-10 rounded-full bg-pro-100"></div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-4 w-full rounded-xl bg-pro-100"></div>
        <div className="h-3 w-20 rounded-xl bg-pro-100"></div>
      </div>
    </div>
  ));
}

export default CustomersCardSkeleton;
