import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import { paths, periodOptions } from '../../../../../utils/utils';
import usePrivateAxios from '../../../../../hooks/usePrivateAxios';
import EmployeeReport from './components/EmployeeReport';
import Loading from '../../components/status/Loading';
import Error from '../../components/status/Error';
import icons from '../../../../../utils/faIcons';
import useDocumentTitle from '../../../../../hooks/useDocumentTitle';

export default function EmployeeStats() {
  useDocumentTitle('Employees Report');

  const id = useParams().id;

  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);

  const privateAxios = usePrivateAxios();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let controller = new AbortController();
    let canceled = false;

    (async function fetchData() {
      try {
        setError(false);
        setLoading(true);
        const response = await privateAxios({
          url: `reports/sales-reprot/${id}?within=${selectedPeriod.value}`,
          signal: controller.signal,
        });
        if (!canceled) setData(response.data);
      } catch (error) {
        if (!canceled) setError(true);
      } finally {
        if (!canceled) setLoading(false);
      }
    })();

    return () => {
      canceled = true;
      controller.abort();
    };
  }, [privateAxios, selectedPeriod.value]);

  return (
    <div className="flex h-full flex-col gap-5">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <h1>Employee Report</h1>
        <div className="flex flex-wrap gap-2">
          {periodOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedPeriod(option)}
              className={`flex-center text-nowrap rounded-lg px-3 py-2 text-xs font-semibold sm:px-4 sm:py-3 sm:text-sm ${selectedPeriod.value === option.value ? 'bg-pro-300 text-white' : 'bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>
      <Link
        to={`/${paths.dashboard}/${paths.employees}`}
        className="w-fit rounded-xl bg-gray-100 px-4 py-3 text-xs text-gray-500 transition-colors hover:bg-gray-200 sm:text-sm"
      >
        <FontAwesomeIcon icon={icons.back} className="mr-2" />
        Back to Employees
      </Link>
      {loading ? <Loading /> : error ? <Error /> : <EmployeeReport employee={data} period={selectedPeriod} />}
    </div>
  );
}
