import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { paths, periodOptions } from '../../../utils/utils';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import usePrivateAxios from '../../../hooks/usePrivateAxios';
import DashboardHeaderSection from './components/header-section/Section';
import Loading from './components/status/Loading';
import Error from './components/status/Error';
import GlobalStats from './components/GlobalStats';
import EmployeesStats from './components/EmployeesStats';
import SourcesStats from './components/SourcesStats';
import InterestsStats from './components/InterestsStats';

function Dashboard() {
  useDocumentTitle('Manager Dashboard');

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
        const results = {};
        await Promise.all([
          privateAxios({ url: '/reports/global-statistics', signal: controller.signal }).then(
            (response) => (results.globalStatistics = response.data),
          ),
          privateAxios({ url: `/reports/main-report?within=${selectedPeriod.value}`, signal: controller.signal }).then(
            (response) => (results.salesStats = response.data),
          ),
          privateAxios({ url: `/reports/sources-report?within=${selectedPeriod.value}`, signal: controller.signal }).then(
            (response) => (results.sources = response.data),
          ),
          privateAxios({ url: `/reports/deals-report?within=${selectedPeriod.value}`, signal: controller.signal }).then(
            (response) => (results.interests = response.data),
          ),
        ]);
        if (!canceled) setData(results);
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
    <div className="flex h-full flex-col gap-6">
      <DashboardHeaderSection selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />

      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <>
          <GlobalStats data={data.globalStatistics} period={selectedPeriod} />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-5">
            <div className="xl:col-span-3">
              <InterestsStats data={data.interests} />
            </div>
            <div className="xl:col-span-2">
              <SourcesStats data={data.sources} />
            </div>
          </div>
          <EmployeesStats data={data.salesStats} />
          <Link to={`${paths.employees}`} className="btn-primary rounded-xl py-4 text-center">
            Employees Reports
          </Link>
        </>
      )}
    </div>
  );
}

export default Dashboard;
