import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../../utils/utils';
import icons from '../../../../../utils/faIcons';

function AllCustomersHeaderSection() {
  const navigate = useNavigate();

  return (
    <section className="flex justify-between">
      <h1>Customers</h1>
      <button
        className="btn-primary flex-center gap-2 rounded-xl p-3 px-5 text-xs sm:text-sm"
        onClick={() => navigate(`/${paths.addNewCustomer}`)}
      >
        <FontAwesomeIcon icon={icons.plus} />
        <span className="capitalize ">New customer</span>
      </button>
    </section>
  );
}

export default AllCustomersHeaderSection;
