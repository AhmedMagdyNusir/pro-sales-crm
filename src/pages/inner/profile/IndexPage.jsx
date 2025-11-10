import { Outlet } from 'react-router-dom';
import ProfileSidebar from './components/ProfileSideBar';

export default function Profile() {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-5">
      <div className="w-full lg:w-[275px]">
        <ProfileSidebar />
      </div>
      <div >
        <Outlet />
      </div>
    </div>
  );
}