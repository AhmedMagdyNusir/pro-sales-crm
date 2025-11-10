export default function EmployeesStats({ data }) {
  return (
    <div>
      <h2 className="mb-4">Employees Statistics</h2>
      <div className="overflow-x-auto rounded-t-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-xs uppercase tracking-wider text-gray-800">
              <th className="px-6 py-5 text-left">First Name</th>
              <th className="px-6 py-5 text-left">Last Name</th>
              <th className="px-6 py-5 text-left">Assigned Customers</th>
              <th className="px-6 py-5 text-left">Messages</th>
              <th className="px-6 py-5 text-left">Deals</th>
              <th className="px-6 py-5 text-left">Online Meetings</th>
              <th className="px-6 py-5 text-left">Offline Meetings</th>
              <th className="px-6 py-5 text-left">Completed Calls</th>
              <th className="px-6 py-5 text-left">Missed Calls</th>
              <th className="px-6 py-5 text-left">Cancelled Calls</th>
              <th className="px-6 py-5 text-left">Busy Calls</th>
              <th className="px-6 py-5 text-left">Failed Calls</th>
            </tr>
          </thead>
          <tbody>
            {data && data.salesReports && data.salesReports.items && data.salesReports.items.length > 0
              ? data.salesReports.items.map((item, index) => (
                  <tr key={index} className="text-sm text-gray-500">
                    <td className="px-6 py-4 font-medium text-gray-800">{item.firstName}</td>
                    <td className="px-6 py-4">{item.lastName}</td>
                    <td className="px-6 py-4">{item.customers}</td>
                    <td className="px-6 py-4">{item.messages}</td>
                    <td className="px-6 py-4">{item.deals}</td>
                    <td className="px-6 py-4">{item.meetings.online}</td>
                    <td className="px-6 py-4">{item.meetings.offline}</td>
                    <td className="px-6 py-4">{item.calls.completed}</td>
                    <td className="px-6 py-4">{item.calls.missed}</td>
                    <td className="px-6 py-4">{item.calls.cancelled}</td>
                    <td className="px-6 py-4">{item.calls.busy}</td>
                    <td className="px-6 py-4">{item.calls.failed}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
