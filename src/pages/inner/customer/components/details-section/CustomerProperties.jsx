import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate, trancateText } from '../../../../../utils/utils';
import InterestBadge from '../../../../../components/global/InterestBadge';
import icons from '../../../../../utils/faIcons';

function CustomerProperties({ customer }) {
  return (
    <>
      <Property icon={icons.phone} title="Phone" value={customer.phone} />
      <Property icon={icons.email} title="Email" value={customer.email || 'N/A'} />
      <Property icon={icons.age} title="Age" value={customer.age || 'N/A'} />
      <Property
        icon={icons.gender}
        title="Gender"
        value={customer.gender === 0 ? 'N/A' : customer.gender === 1 ? 'Male' : customer.gender === 2 ? 'Female' : null}
      />
      <Property icon={icons.city} title="City" value={customer.city || 'N/A'} />
      <Property
        icon={icons.assign}
        title="Assigned To"
        value={
          customer.salesRepresentative
            ? trancateText(`${customer.salesRepresentative.firstName} ${customer.salesRepresentative.lastName}`, 18)
            : 'N/A'
        }
      />
      <Property icon={icons.source} title="Source" value={customer.source.name} />
      <Property icon={icons.date} title="Added On" value={formatDate(new Date(customer.additionDate))} />
      <div className="mt-5 font-medium text-gray-800">Interests</div>
      <div className="flex flex-wrap gap-2">
        {customer.interests.map((interest) => (
          <InterestBadge key={interest.id} interest={interest.name} />
        ))}
      </div>
      {/* Task: Add last action - Handle */}
      {customer.lastAction && (
        <>
          <div className="mt-5 font-medium text-gray-800">Last Action</div>
          <div className="rounded-xl bg-gray-100 p-3">
            <div className="flex justify-between">
              <p className="text-nowrap text-gray-800">
                {customer.lastAction?.type ? customer.lastAction.type.toUpperCase() : 'N/A'}
              </p>
              <p className="text-nowrap text-gray-800">
                {customer.lastAction?.date ? formatDate(new Date(customer.lastAction.date)) : 'N/A'}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CustomerProperties;

function Property({ icon, title, value }) {
  return (
    <div className="flex flex-nowrap justify-between gap-2">
      <div className="flex-center gap-2">
        <FontAwesomeIcon icon={icon} className="text-pro-200" />
        <span className="text-nowrap text-gray-500">{title}</span>
      </div>
      <p className="text-nowrap text-gray-800">{value}</p>
    </div>
  );
}
