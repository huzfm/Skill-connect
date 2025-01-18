"use client";

import { useState } from "react";
import { PenToolIcon as Tool } from "lucide-react";
import Link from "next/link";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function NavJob() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const logout = () => {
    Cookie.remove("jwt");
    localStorage.clear();
    router.push("/");
  };

  return (
    <nav className="bg-slate-900 dark:bg-gray-900 w-full z-20 top-0 start-0  dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Tool className="h-6 w-6 mr-2 text-white" />
          <span className="text-md whitespace-nowrap text-white font-bold">
            SkillConnect
          </span>
        </Link>

        {/* Hamburger Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col md:flex-row md:space-x-10 md:ml-auto lg:space-y-0 md:space-y-0 space-y-3 p-4 md:p-0 rounded-lg">
            <li>
              <Link
                href="/user-details"
                className="block bg-slate-700 hover:bg-slate-800 text-white px-3 py-2 rounded-md font-mono"
              >
                My Jobs
              </Link>
            </li>
            <li>
              <Link
                href="/post"
                className="block bg-slate-700 text-white hover:bg-slate-800 px-3 py-2 rounded-md font-mono"
              >
                Post
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="block bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-md font-mono"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
