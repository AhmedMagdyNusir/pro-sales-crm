import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { paths, trancateText, formatDate } from '../../../utils/utils';
import InterestBadge from '../../global/InterestBadge';
import icons from '../../../utils/faIcons';

function CustomerRow({ customer }) {
  return (
    <tr className="border-b text-xs transition hover:bg-gray-50 sm:text-sm">
      <td className="flex items-center gap-3 whitespace-nowrap px-6 py-4 font-bold text-gray-800">
        <div className="flex-center h-10 w-10 rounded-full bg-pro-100">
          <FontAwesomeIcon icon={icons.user} className="text-sm text-pro-200" />
        </div>
        <span>{trancateText(customer.firstName + ' ' + customer.lastName, 25)}</span>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-gray-500">{customer.phone}</td>
      <td className="flex flex-wrap gap-2 whitespace-nowrap px-6 py-4">
        {customer.interests.map((interest) => (
          <InterestBadge key={interest.name} interest={interest.name} />
        ))}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-gray-500">
        {customer.lastAction?.type ? customer.lastAction.type.toUpperCase() : 'N/A'}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-gray-500">{formatDate(new Date(customer.additionDate), true)}</td>
      <td className="whitespace-nowrap px-6 py-4">
        <Link
          to={`/${paths.customers}/${customer.id}`}
          className="rounded-xl px-4 py-2 text-pro-300 transition-colors hover:bg-pro-300 hover:text-white"
        >
          View
        </Link>
      </td>
    </tr>
  );
}

export default CustomerRow;
