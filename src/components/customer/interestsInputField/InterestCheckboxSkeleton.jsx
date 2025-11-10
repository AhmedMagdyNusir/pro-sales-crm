export default function InterestCheckboxSkeleton({ length = 1 }) {
  return Array.from({ length }).map((_, index) => (
    <div key={index} className="flex h-10 animate-pulse items-center gap-3 px-4">
      <div className="h-4 w-4 bg-gray-200"></div>
      <div className="h-3 w-24 rounded-xl bg-gray-200"></div>
    </div>
  ));
}
