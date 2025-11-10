import { useCallback, useEffect, useState } from 'react';
import { globalErrorMessage } from '../../../utils/utils';
import usePrivateAxios from '../../../hooks/usePrivateAxios';
import useDebouncedValue from '../../../hooks/useDebouncedValue';
import InputField from '../../ui/InputField';
import CustomerRowSkeleton from './CustomerRowSkeleton';
import CustomerRow from './CustomerRow';
import Pagination from '../../ui/Pagination';
import icons from '../../../utils/faIcons';

const ITEMS_PER_PAGE = 10;

export default function CustomersTable({ url }) {
  const privateAxios = usePrivateAxios();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebouncedValue(search, 350);

  let customers = data.items || [];

  const getCustomers = useCallback(
    async (page, query) => {
      try {
        setError('');
        setLoading(true);
        const { data } = await privateAxios({
          url: `/${url}?page=${page}&size=${ITEMS_PER_PAGE}&query=${query || ''}`,
        });
        setData(data);
        setLoading(false);
      } catch (error) {
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
        setLoading(false);
      }
    },
    [privateAxios, url],
  );

  useEffect(() => {
    getCustomers(1, debouncedSearchTerm);
  }, [debouncedSearchTerm, getCustomers]); // Also run with the first render, so we no longer need useOnLoadFetch

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full">
        <InputField
          type="text"
          icon={icons.search}
          placeholder="Search by name, phone, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2"
        />
      </div>

      <div className="overflow-x-auto rounded-t-xl">
        <table className="w-full">
          <thead className="border-b bg-gray-100">
            <tr className="text-left text-xs uppercase tracking-wider text-gray-800">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Interests</th>
              <th className="text-nowrap px-6 py-3">Last Action</th>
              <th className="px-6 py-3">Added On</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <CustomerRowSkeleton length={5} />
            </tbody>
          ) : customers.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="4" className="px-6 py-4 text-gray-500">
                  No customers found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white">
              {customers.map((customer) => (
                <CustomerRow key={customer.id} customer={customer} />
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="flex scale-90 justify-center sm:scale-100 sm:justify-end">
        <Pagination
          getPage={(page) => getCustomers(page)}
          currentPage={data.currentPage}
          totalPages={data.pages}
          className={`gap-1 ${data.pages <= 1 || loading || error ? 'hidden' : ''}`}
        />
      </div>
    </div>
  );
}
