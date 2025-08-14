import {NavLink} from "react-router";

import logoDark from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";

export default function Header() {
  

  return (
    <header className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <NavLink
        to={"/"} end
        className="block max-w-300px dark:hidden"
        >
            <img
              src={logoLight}
              alt="React Router"
              
              
            />
        </NavLink>

        <NavLink
        
        className="hidden max-w-300px dark:block "
        to ={"/"} end
        >
            <img
              src={logoDark}
              alt="React Router"
            />
        </NavLink>

        

        {/* Right Buttons */}
        <div className="flex items-center space-x-4">
          <button className="hidden md:block hover:text-red-500 transition">Github</button>
          
        </div>
      </div>
    </header>
  );
}