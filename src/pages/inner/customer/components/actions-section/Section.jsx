import { useState } from 'react';
import Action from './Action';
import ActionSkeleton from './ActionSkeleton';
import ActionsTab from './ActionTab';
import noData from '../../../../../assets/noData.svg';

const tabs = [
  { title: 'All Actions' },
  { title: 'Calls', type: 'call' },
  { title: 'Messages', type: 'message' },
  { title: 'Meetings', type: 'meeting' },
  { title: 'Deals', type: 'deal' },
];

// Task: This component needs to be refactored to allow adding new actions

function ActionsSection({ loading, actions }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  function filterActions(tab) {
    if (tab.title === 'All Actions') return actions;
    else return actions.filter((action) => action.type.toLowerCase() === tab.type.toLowerCase());
  }

  return (
    <div className="w-full flex-1">
      <nav className="scrollbar-hide flex justify-between overflow-auto rounded-t-xl bg-pro-50">
        {tabs.map((tab, index) => (
          <ActionsTab key={index} tab={tab} isActive={activeTab.title === tab.title} onClick={() => setActiveTab(tab)} />
        ))}
      </nav>
      <div className="flex flex-col-reverse py-5 md:px-5">
        {loading ? (
          <ActionSkeleton length={5} />
        ) : filterActions(activeTab).length === 0 ? (
          <div className="flex-center w-full flex-col gap-5 py-20">
            <img src={noData} alt="No Data" className="h-[135px]" />
            <p>No {activeTab.title === 'All Actions' ? ' actions' : ` ${activeTab.title.toLowerCase()}`} found</p>
          </div>
        ) : (
          filterActions(activeTab).map((action) => <Action key={action.id} action={action} />)
        )}
      </div>
    </div>
  );
}

export default ActionsSection;
