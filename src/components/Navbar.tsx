import { useTheme } from "@/hooks/useTheme";

import { HiMiniMoon, HiMiniSun } from "react-icons/hi2";
export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center h-16 px-4 sm:px-8 lg:px-44">
        <div className="w-full max-w-3xl mx-auto space-y-20">
          <div className="flex justify-between">
            <div className="flex items-center justify-start flex-1">
              {/* Link and site name/icon */}
              <a
                href="/"
                className="w-10 h-10 p-2 text-gray-800 dark:text-white"
              >
                <GiSpellBook className="size-full" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <button
      className="w-10 h-10 p-2 text-gray-800 hover:text-amber-500 dark:text-white dark:hover:text-amber-400"
      onClick={() => toggleDarkMode()}
    >
      {isDarkMode ? (
        <HiMiniMoon className="w-full h-full" />
      ) : (
        <HiMiniSun className="w-full h-full" />
      )}
    </button>
  );
}
