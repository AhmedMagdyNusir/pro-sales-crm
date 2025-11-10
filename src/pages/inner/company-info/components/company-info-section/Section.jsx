import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useCompany from '../../../../../hooks/useCompany';
import Alert from '../../../../../components/ui/Alert';
import icons from '../../../../../utils/faIcons';
import EditMode from './EditMode';

export default function CompanyInfoSection({ editMode, setEditMode }) {
  const { company } = useCompany();

  return company.loading ? (
    <section className="flex-center h-56 flex-col gap-4 rounded-xl bg-gray-100">
      <FontAwesomeIcon icon={icons.spinner} spin className="text-4xl text-pro-300" />
      <p>Loading company info...</p>
    </section>
  ) : company.error ? (
    <Alert.Error message={company.error} />
  ) : editMode ? (
    <EditMode setEditMode={setEditMode} />
  ) : (
    <section className="flex flex-col gap-3">
      <p className="text-nowrap rounded-xl bg-gray-100 p-6 text-xl font-bold text-gray-800 sm:text-3xl">
        {company.data.name}
      </p>
      {company.data.description && <p className="rounded-xl bg-gray-100 p-6">{company.data.description}</p>}
    </section>
  );
}
