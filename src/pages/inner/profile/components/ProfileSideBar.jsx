import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { paths } from '../../../../utils/utils';
import DeleteModal from './DeleteModal';
import icons from '../../../../utils/faIcons';

const routes = [
  {
    id: 1,
    title: 'Profile',
    path: `/${paths.profile}`,
    icon: icons.profile,
  },
  {
    id: 2,
    title: 'Password',
    path: `/${paths.profile}/change-password`,
    icon: icons.password,
  },
  // {
  //   id: 3,
  //   title: 'Notifications',
  //   path: `/${paths.profile}/notifications`,
  //   icon: icons.notifications,
  // },
];

export default function ProfileSidebar() {
  
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="lg:px-5">
      {routes.map((route) => (
        <NavLink
          className="lg:flex items-center gap-2 rounded-xl p-3 lg:p-5 font-semibold text-gray-800 transition-colors hover:bg-gray-100"
          key={route.id}
          to={route.path}
        >
          {window.innerWidth >= 1024 && <FontAwesomeIcon icon={route.icon} />}
          <span>{route.title}</span>
        </NavLink>
      ))}
      <div className="lg:my-5 my-3 h-[2px] lg:w-full bg-gray-100"></div>
      {!isMobile && (
        <button
          className="flex w-full items-center gap-2 rounded-xl p-4 text-red-500 transition-colors hover:bg-red-50"
          onClick={() => setDeletePopupOpen(true)}
        >
          <FontAwesomeIcon icon={icons.trash} />
          Delete your Account
        </button>
      )}
      <style>
        {`.active { color: #7050FF; }`}
      </style>
      {deletePopupOpen && <DeleteModal setDeletePopupOpen={setDeletePopupOpen} />}
    </div>
  );
}