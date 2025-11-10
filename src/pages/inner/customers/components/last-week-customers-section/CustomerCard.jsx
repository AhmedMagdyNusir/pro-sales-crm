import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { paths, trancateText } from '../../../../../utils/utils';
import InterestBadge from '../../../../../components/global/InterestBadge';
import icons from '../../../../../utils/faIcons';

function CustomerCard({ customer }) {
  return (
    <Link
      to={`/${paths.customers}/${customer.id}`}
      className="flex h-[135px] min-w-[300px] flex-col justify-between overflow-hidden rounded-xl bg-white p-4 shadow hover:bg-gray-50"
    >
      <div className="flex items-center gap-3">
        <div className="flex-center min-h-10 min-w-10 rounded-full bg-pro-100">
          <FontAwesomeIcon icon={icons.user} className="text-pro-200" />
        </div>
        <div>
          <h3 className="text-nowrap text-base sm:text-lg">
            {trancateText(customer.firstName + ' ' + customer.lastName, 20)}
          </h3>
          <p className="text-sm">{customer.phone}</p>
        </div>
      </div>
      <div className="scrollbar-hide flex gap-2 overflow-auto py-1">
        {customer.interests.map((interest) => (
          <InterestBadge key={interest.id} interest={interest.name} />
        ))}
      </div>
    </Link>
  );
}

export default CustomerCard;
