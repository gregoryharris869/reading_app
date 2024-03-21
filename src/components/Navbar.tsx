import { useTheme } from "@/hooks/useTheme";
import { GiSpellBook } from "react-icons/gi";
import { HiMiniMoon, HiMiniSun } from "react-icons/hi2";
import { SiGithub, SiYoutube } from "react-icons/si";

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
              <p className="mt-2 text-xl font-bold ">The Reading List</p>
            </div>
            <div className="flex items-center justify-end flex-1">
              <nav className="flex items-center space-x-1">
                <ThemeToggle />
                <a
                  href="http://youtube.com"
                  target="_blank"
                  className="w-10 h-10 p-2 text-gray-800 hover:text-[#ff0000] dark:text-white dark:hover:text-[#ff0000] "
                >
                  <SiYoutube className="w-full h-full" />
                </a>
                <a
                  href="http://github.com"
                  target="_blank"
                  className="w-10 h-10 p-2 text-gray-800 hover:text-[#4078c0] dark:text-white dark:hover:text-[#4078c0]"
                >
                  <SiGithub className="w-full h-full" />
                </a>
              </nav>
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
