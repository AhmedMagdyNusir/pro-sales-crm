import useDocumentTitle from '../../../hooks/useDocumentTitle';
import CompanyInfoHeaderSection from './components/header-section/Section';
import CompanyInfoSection from './components/company-info-section/Section';
import InterestsSection from './components/interests-section/Section';
import { useState } from 'react';

export default function CompanyInfo() {
  useDocumentTitle('Company Info');

  const [editMode, setEditMode] = useState(false);

  return (
    <div className="flex min-h-full flex-col gap-3">
      <CompanyInfoHeaderSection editMode={editMode} setEditMode={setEditMode} />
      <CompanyInfoSection editMode={editMode} setEditMode={setEditMode} />
      <div className="h-[1px] rounded-xl bg-gray-100"></div> {/* Divider */}
      <InterestsSection />
    </div>
  );
}
