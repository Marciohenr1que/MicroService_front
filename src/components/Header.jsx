import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Header({ user, onLogout }) {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <div className="container flex justify-between items-center">
        <span className="font-semibold text-lg">
          {user ? `Bem-vindo, ${user.name}` : "Bem-vindo"}
        </span>
        <button
          onClick={onLogout}
          className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 mr-2" />
          Sair
        </button>
      </div>
    </header>
  );
}
