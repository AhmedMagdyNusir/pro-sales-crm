export default function CardSkeleton({ length = 1 }) {
  return Array.from({ length }).map((_, index) => (
    <div key={index} className="flex animate-pulse flex-col items-center gap-5 rounded-xl bg-gray-100 px-4 py-10 shadow-sm">
      <div className="flex-center h-20 w-20 rounded-full bg-gray-200"></div>
      <p className="h-7 w-36 rounded-xl bg-gray-200"></p>
      <p className="h-5 w-28 rounded-xl bg-gray-200"></p>
      <p className="h-5 w-28 rounded-xl bg-gray-200"></p>
    </div>
  ));
}
