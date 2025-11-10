import { jwtDecode } from 'jwt-decode';

export const applicationName = 'Pro Sales';

export const globalErrorMessage = 'Something went wrong. Please try again later.';

export const roles = {
  manager: 'Manager',
  moderator: 'Marketing Moderator',
  sales: 'Sales Representative',
};

export const layoutDimensions = {
  navbarSize: 75,
  navbarExpanedSize: 200,
  navbarExpandingDuration: 0.25,
  navbarPadding: 20,
  layoutPadding: 24,
  mobileLayoutPadding: 16,
};

export const paths = {
  login: 'login',
  register: 'register',
  verifyEmail: 'verify-email',
  forgotPassword: 'forgot-password',
  resetPassword: 'reset-password',
  locked: 'locked',
  profile: 'profile',
  companyInfo: 'company-info',
  dashboard: 'dashboard',
  employees: 'employees', // + /:id for a single employee
  roles: 'roles',
  customers: 'customers', // + /:id for a single customer
  addNewCustomer: 'add-new-customer',
  assignedCustomers: 'assigned-customers',
};

export const breakboints = {
  sm: '612px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  xxl: '1440px',
};

export const trancateText = (text, length) => {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
};

export const colorPairs = [
  { bg: '#f1f5fe', text: '#628cee' },
  { bg: '#fff9ee', text: '#9b7127' },
  { bg: '#eefdf3', text: '#1e833f' },
  { bg: '#fdf2f2', text: '#e0464a' },
  { bg: '#f5f5f5', text: '#4a5568' },
];

export const formatDate = (date, showDayOfWeek = false, showTime = false) => {
  const dayOfMonth = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  let dayOfWeek = '';
  if (showDayOfWeek) dayOfWeek = `${date.toLocaleString('en-US', { weekday: 'short' })} `;

  let time = '';
  if (showTime) {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const twelveHour = hours % 12 || 12;
    time = ` ${twelveHour}:${minutes} ${ampm}`;
  }

  return `${dayOfWeek}${dayOfMonth} ${month} ${year}${time}`;
};

export function getCallStatus(status) {
  switch (status) {
    case 0:
      return 'Completed';
    case 1:
      return 'Missed';
    case 2:
      return 'Cancelled';
    case 3:
      return 'Busy';
    case 4:
      return 'Failed';
    default:
      return 'N/A';
  }
}

export function extractUserInfo(accessToken) {
  let { id, firstName, lastName, username, email, roles } = jwtDecode(accessToken);
  if (!roles) roles = [];
  if (typeof roles === 'string') roles = roles.split(',');
  return { id, firstName, lastName, username, email, roles, accessToken };
}


export const periodOptions = [
  { value: '', label: 'Total' },
  { value: 'Daily', label: 'Today' },
  { value: 'Weekly', label: 'Last Week' },
  { value: 'Monthly', label: 'Last Month' },
];