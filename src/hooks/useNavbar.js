import { useContext } from 'react';
import { NavbarContext } from '../context/NavbarContext';

export default function useNavbar() {
  return useContext(NavbarContext);
}
