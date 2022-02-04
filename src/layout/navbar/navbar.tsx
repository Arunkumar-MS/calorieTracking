import React from "react";
import { Menu } from 'src/component/menu'

const NavBar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="border-b border-gray-700">
          <Menu />
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
