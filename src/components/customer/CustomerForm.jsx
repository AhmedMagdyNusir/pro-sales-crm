import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { globalErrorMessage, paths, roles } from '../../utils/utils';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import useOnLoadFetch from '../../hooks/useOnLoadFetch';
import AddNewSourcePopup from './AddNewSourcePopup';
import InterestsInputField from './interestsInputField/InterestsInputField';
import DropdownMenu from '../ui/DropdownMenu';
import Form from '../ui/Form';
import InputField from '../ui/InputField';
import GenderInput from '../ui/GenderInput';
import icons from '../../utils/faIcons';
import { validationRegex } from '../../utils/validation';

function CustomerForm({ title, submitLabel, customer, setCustomer, setEditingMode, className }) {
  const privateAxios = usePrivateAxios();
  const navigate = useNavigate();

  const addingStatus = !customer;

  // Required fields
  const [firstName, setFirstName] = useState(customer?.firstName || '');
  const [lastName, setLastName] = useState(customer?.lastName || '');
  const [phone, setPhone] = useState(customer?.phone || '');
  const [salesRepresentativeId, setSalesRepresentativeId] = useState(customer?.salesRepresentative?.id || '');
  const [sourceId, setSourceId] = useState(customer?.source?.id || '');
  const [interests, setInterests] = useState(customer?.interests || []);

  // Optional fields
  const [gender, setGender] = useState(customer?.gender || 0);
  const [age, setAge] = useState(customer?.age || '');
  const [email, setEmail] = useState(customer?.email || '');
  const [city, setCity] = useState(customer?.city || '');

  const [openOptionalFields, setOpenOptionalFields] = useState(false);
  const [newSourcePopup, setNewSourcePopup] = useState(false);

  const { data: salesOptions, loading: salesOptionsLoading } = useOnLoadFetch('/moderator/get-all-sales');
  const {
    data: sourcesOptions,
    loading: sourcesOptionsLoading,
    setData: setSourcesOptions,
  } = useOnLoadFetch('/shared/get-all-sources');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError('');

      // Required Fields
      const data = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        salesRepresentativeId,
        sourceId,
        interests,
      };

      // Validation
      if (!validationRegex.name.test(firstName.trim())) {
        setError('Please provide a valid first name');
        return;
      } else if (!validationRegex.name.test(lastName.trim())) {
        setError('Please provide a valid last name');
        return;
      } else if (!/^[0-9]{4,18}$/.test(phone.trim())) {
        setError('Please provide a valid phone number');
        return;
      } else if (!salesRepresentativeId) {
        setError('Please assign this customer to a sales representative');
        return;
      } else if (!sourceId) {
        setError('Please select the source of this customer');
        return;
      } else if (interests.length === 0) {
        setError('Please select at least one interest');
        return;
      } else if (email && !validationRegex.email.test(email.trim())) {
        setError('Please provide a valid email address');
        return;
      } else if (age && (age < 1 || age > 120)) {
        setError('Please provide a valid age');
        return;
      } else if (city && !/^[a-zA-Z\s]{2,30}$/.test(city.trim())) {
        setError('Please provide a valid city name');
        return;
      }

      // Adding Optional Field If Provided
      if (age) data.age = age;
      if (gender) data.gender = gender;
      if (email) data.email = email.trim();
      if (city) data.city = city.trim();

      setLoading(true);

      if (addingStatus) {
        // Add New Customer
        const res = await privateAxios({
          url: '/moderator/add-customer',
          method: 'post',
          data,
        });
        navigate(`/${paths.customers}/${res.data.id}`);
      } else {
        // Update Existing Customer
        const res = await privateAxios({
          url: `/moderator/update-customer?CustomerId=${customer.id}`,
          method: 'PUT',
          data,
        });
        setCustomer(res.data);
        setEditingMode(false);
      }
    } catch (error) {
      setLoading(false);
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    }
  }

  return (
    <Form onSubmit={handleSubmit} loading={loading} error={error} submitLabel={submitLabel} className={`${className}`}>
      {title && <h1>{title}</h1>}

      {/* Required Information Fieldset */}
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-2 text-gray-500">Required information</legend>
        <div className={`flex flex-col gap-3 ${addingStatus ? 'md:flex-row' : ''}`}>
          <InputField.FirstName value={firstName} onChange={(e) => setFirstName(e.target.value)} autoFocus />
          <InputField.LastName value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <InputField.Phone value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className={`flex flex-col gap-3 ${addingStatus ? 'md:flex-row' : ''}`}>
          <DropdownMenu
            icon={icons.assign}
            placeholder="Assign to"
            options={salesOptions
              .filter((user) => !user.roles.includes(roles.manager))
              .map((user) => ({ value: user.id, label: `${user.firstName} ${user.lastName}` }))}
            loadingOptions={salesOptionsLoading}
            selected={salesRepresentativeId}
            setSelected={setSalesRepresentativeId}
            defaultQuery={`${customer?.salesRepresentative ? `${customer.salesRepresentative.firstName} ${customer.salesRepresentative.lastName}` : ''}`}
          />
          <div className="flex w-full gap-3">
            <DropdownMenu
              icon={icons.source}
              placeholder="Source"
              options={sourcesOptions.map((source) => ({ value: source.id, label: source.name }))}
              setOptions={setSourcesOptions}
              loadingOptions={sourcesOptionsLoading}
              selected={sourceId}
              setSelected={setSourceId}
              defaultQuery={customer?.source?.name || ''}
            />
            {newSourcePopup && (
              <AddNewSourcePopup setNewSourcePopup={setNewSourcePopup} setSourcesOptions={setSourcesOptions} />
            )}
            <button
              type="button"
              onClick={() => setNewSourcePopup(true)}
              className="flex-center rounded-xl bg-gray-100 px-5 text-xl text-gray-500 transition-colors hover:bg-gray-200"
            >
              <FontAwesomeIcon icon={icons.plus} />
            </button>
          </div>
        </div>
        <InterestsInputField selectedInterests={interests} setSelectedInterests={setInterests} />
      </fieldset>

      <fieldset>
        <legend
          tabIndex={0}
          className="cursor-pointer text-gray-500 hover:underline"
          onClick={() => setOpenOptionalFields(!openOptionalFields)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setOpenOptionalFields(!openOptionalFields);
            }
          }}
        >
          More Details (Optional)
        </legend>
        {openOptionalFields && (
          <div className="mt-2 flex animate-fade-in-medium flex-col gap-3">
            <div className={`flex flex-col gap-3 ${addingStatus ? 'md:flex-row' : ''}`}>
              <GenderInput gender={gender} setGender={setGender} className={`h-12 ${addingStatus ? 'md:h-auto' : ''}`} />
              <InputField.Age value={age || ''} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className={`flex flex-col gap-3 ${addingStatus ? 'md:flex-row' : ''}`}>
              <InputField.Email value={email || ''} onChange={(e) => setEmail(e.target.value)} />
              <InputField.City value={city || ''} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>
        )}
      </fieldset>
    </Form>
  );
}

export default CustomerForm;
