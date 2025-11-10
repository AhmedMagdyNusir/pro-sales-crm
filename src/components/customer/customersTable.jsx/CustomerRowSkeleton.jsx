function CustomerRowSkeleton({ length = 1 }) {
  return Array.from({ length }).map((_, index) => (
    <tr key={index} className="animate-pulse">
      <td className="px-6 pt-6">
        <div className="h-4 w-40 rounded-xl bg-gray-200"></div>
      </td>
      <td className="px-6 pt-6">
        <div className="h-4 w-40 rounded-xl bg-gray-200"></div>
      </td>
      <td className="px-6 pt-6">
        <div className="h-4 w-40 rounded-xl bg-gray-200"></div>
      </td>
      <td className="px-6 pt-6">
        <div className="h-4 w-40 rounded-xl bg-gray-200"></div>
      </td>
      <td className="px-6 pt-6">
        <div className="h-4 w-40 rounded-xl bg-gray-200"></div>
      </td>
    </tr>
  ));
}

export default CustomerRowSkeleton;
