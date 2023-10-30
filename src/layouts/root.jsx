import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Logo from "../utils/logo";
import { cn } from "../utils/cn";

export default function RootLayout({ children }) {
  return (
    <div
      className="bg-yellow-50 min-h-screen min-w-screen "
      style={{ backgroundImage: `url('/pattern2.png')` }}
    >
      <nav className="max-w-5xl mx-auto py-5 border-b border-b-red-600">
        <div className="flex flex-row items-center justify-between">
          {/* Logo Goes Here */}
          {/* <Logo /> */}
          <img src="/logo.png" className="w-20 h-20" />

          {/* Nav Links */}
          <ul className="flex flex-row gap-5">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive &&
                  "underline text-red-600 font-semibold decoration-red-600  underline-offset-2"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/subjects"
                className={({ isActive }) =>
                  isActive &&
                  "underline text-red-600 font-semibold decoration-red-600  underline-offset-2"
                }
              >
                Subjects
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/forum"
                className={({ isActive }) =>
                  isActive &&
                  "underline text-red-600 font-semibold decoration-red-600  underline-offset-2"
                }
              >
                Forum
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  isActive &&
                  "underline text-red-600 font-semibold decoration-red-600  underline-offset-2"
                }
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto py-5 min-h-[90vh]">{children}</div>
      <Outlet />
      <footer className="max-w-5xl mx-auto py-5 border-t border-t-red-600">
        {/* Logo Goes Here */}
        {/* <Logo /> */}
        <img src="/logo.png" className="w-36 h-36" />
        <p className="text-gray-400 text-sm">
          Brought you by someone somewhere from the world
        </p>
      </footer>
    </div>
  );
}
