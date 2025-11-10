import { useContext } from 'react';
import { InterestsContext } from '../context/InterestsContext';

export default function useInterests() {
  return useContext(InterestsContext);
}
