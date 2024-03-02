import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-transparent p-4 text-white">
      <Link to={`/`}>
        {" "}
        <h1 className="text-xl font-bold text-gray-300 font-mono">
          GrooveTube
        </h1>
      </Link>
    </header>
  );
};

export default Header;
