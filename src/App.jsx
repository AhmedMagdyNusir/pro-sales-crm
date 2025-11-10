import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { roles, paths } from './utils/utils';
import Layout from './pages/routes/Layout';
import Home from './pages/routes/Home';
import NotFound from './pages/routes/NotFound';
import Register from './pages/outer/Register';
import Login from './pages/outer/Login';
import VerifyEmail from './pages/outer/VerifyEmail';
import ForgotPassword from './pages/outer/ForgotPassword';
import ResetPassword from './pages/outer/ResetPassword';
import PersistUser from './pages/routes/PersistUser';
import Authentication from './pages/routes/Authentication';
import Authorization from './pages/routes/Authorization';
import Dashboard from './pages/inner/dashboard/Page';
import Roles from './pages/inner/roles/Page';
import AddNewCustomer from './pages/inner/add-new-customer/Page';
import Customers from './pages/inner/customers/Page';
import Customer from './pages/inner/customer/Page';
import AssignedCustomers from './pages/inner/assigned-customers/Page';
import CompanyInfo from './pages/inner/company-info/Page';
import Locked from './pages/inner/locked/Page';
import Profile from './pages/inner/profile/IndexPage';
import BasicInfoPage from './pages/inner/profile/nested-pages/basic-info/Page';
import ChangePasswordPage from './pages/inner/profile/nested-pages/change-password/Page';
import Notifications from './pages/inner/profile/nested-pages/notifications/Page';
import EmployeesStats from './pages/inner/dashboard/nested-pages/all-employees/Page';
import EmployeeStats from './pages/inner/dashboard/nested-pages/employee/Page';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PersistUser />}>
          <Route element={<Layout />}>
            <Route element={<Authentication />}>
              <Route index element={<Home />} />

              <Route element={<Authorization allowedRole={roles.manager} />}>
                <Route path={paths.dashboard} element={<Dashboard />} />
                <Route path={`${paths.dashboard}/${paths.employees}`} element={<EmployeesStats />} />
                <Route path={`${paths.dashboard}/${paths.employees}/:id`} element={<EmployeeStats />} />
                <Route path={paths.roles} element={<Roles />} />
              </Route>

              <Route element={<Authorization allowedRole={roles.moderator} />}>
                <Route path={paths.customers} element={<Customers />} />
                <Route path={paths.addNewCustomer} element={<AddNewCustomer />} />
              </Route>

              <Route element={<Authorization allowedRole={roles.sales} />}>
                <Route path={`${paths.customers}/:id`} element={<Customer />} />
                <Route path={paths.assignedCustomers} element={<AssignedCustomers />} />
              </Route>

              <Route path={paths.locked} element={<Locked />} />
              <Route path={paths.companyInfo} element={<CompanyInfo />} />

              <Route path={paths.profile} element={<Profile />}>
                <Route index element={<BasicInfoPage />} />
                <Route path="change-password" element={<ChangePasswordPage />} />
                <Route path="notifications" element={<Notifications />} />
              </Route>
            </Route>

            <Route element={<Authentication requireUnauthenticated />}>
              <Route path={paths.login} element={<Login />} />
              <Route path={paths.register} element={<Register />} />
              <Route path={paths.verifyEmail} element={<VerifyEmail />} />
              <Route path={paths.forgotPassword} element={<ForgotPassword />} />
              <Route path={paths.resetPassword} element={<ResetPassword />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
