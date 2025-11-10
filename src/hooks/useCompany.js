import { useContext } from 'react';
import { CompanyContext } from '../context/CompanyContext';

export default function useCompany() {
  return useContext(CompanyContext);
}
