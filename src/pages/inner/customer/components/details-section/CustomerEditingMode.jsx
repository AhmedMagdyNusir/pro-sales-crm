import CustomerForm from '../../../../../components/customer/CustomerForm';

function CustomerEditingMode({ customer, setCustomer, setEditingMode }) {
  return (
    <div className="flex animate-fade-in-fast flex-col gap-2">
      <CustomerForm submitLabel="Update" customer={customer} setCustomer={setCustomer} setEditingMode={setEditingMode} />
      <button
        className="w-full rounded-xl border bg-gray-50 py-2 text-gray-500 transition-colors hover:bg-gray-100"
        onClick={() => setEditingMode(false)}
      >
        Cancel
      </button>
    </div>
  );
}

export default CustomerEditingMode;
