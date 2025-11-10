import { createContext, useState } from 'react';

export const NavbarContext = createContext(null);

function NavbarProvider({ children }) {
  const [navbarExpanded, setNavbarExpanded] = useState(false);

  return <NavbarContext.Provider value={{ navbarExpanded, setNavbarExpanded }}>{children}</NavbarContext.Provider>;
}

export default NavbarProvider;
