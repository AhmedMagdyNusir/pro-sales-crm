import useLogout from '../../../hooks/useLogout';
import { useNavigate, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { breakboints, layoutDimensions, paths } from '../../../utils/utils';
import useNavbar from '../../../hooks/useNavbar';
import icons from '../../../utils/faIcons';

export default function NavbarLink({ label, to, icon, onClick }) {
  const { navbarExpanded } = useNavbar();

  const height = layoutDimensions.navbarSize - (layoutDimensions.navbarSize / 7) * 2;
  const marginX = layoutDimensions.navbarSize / 7;
  const iconPosition = layoutDimensions.navbarSize / 5;
  const labelPosition = layoutDimensions.navbarSize / 1.65;

  const constClasses = `relative flex flex-1 rounded-2xl transition-colors flex-center nav-link-width`;
  const className = ({ isActive }) =>
    isActive ? constClasses + ' fill-pro-300 bg-pro-50' : constClasses + ' btn-light fill-gray-500';

  return (
    <div className={`nav-link-margin flex self-center sm:self-auto`}>
      <NavLink to={to} className={className} style={{ height: `${height}px` }} onClick={onClick}>
        {icon && (
          <div className={`w-5 sm:absolute sm:top-1/2 sm:-translate-y-1/2`} style={{ left: `${iconPosition}px` }}>
            {icon}
          </div>
        )}
        {navbarExpanded && (
          <span
            className={`absolute top-1/2 hidden -translate-y-1/2 transform animate-fade-in-fast text-nowrap text-sm capitalize sm:block`}
            style={{ left: `${labelPosition}px` }}
          >
            {label}
          </span>
        )}
      </NavLink>
      <style>
        {`
            @media (min-width: ${breakboints.sm}) {
              .nav-link-margin {
                margin: 0 ${marginX}px;
              }
            }
            @media (max-width: ${breakboints.sm}) {
             .nav-link-width {
                width: ${height}px;
              }
            }
          `}
      </style>
    </div>
  );
}

export function LogoutButton() {
  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <NavbarLink
      label="Logout"
      icon={<FontAwesomeIcon icon={icons.logout} className="sm:rotate-180" />}
      to={'/'}
      onClick={() => {
        logout();
        navigate(`/${paths.login}`); // Redirect to login page without providing a state in the location object
      }}
    />
  );
}
