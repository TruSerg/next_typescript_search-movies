"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Box, UnstyledButton } from "@mantine/core";

import CustomMenu from "../Menu";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <Box className="min-h-screen w-[100%] max-w-[280px] bg-purple-100 p-6 xl:flex xl:min-h-0 xl:max-w-[1470px] xl:items-center xl:justify-between xl:gap-5 xl:pl-[15px] xl:pr-[15px] md:flex-col md:items-start">
      <Box className="mb-10 flex items-center gap-2 xl:mb-0">
        <span className="text-[28px] font-semibold text-purple-500 sm:text-[24px]">
          TMDB
        </span>
        <span className="h-6 w-16 rounded-full bg-purple-500 sm:h-5 sm:w-14"></span>
      </Box>
      <Box className="flex flex-col gap-2 xl:flex-row xl:items-center">
        <Link
          href="/"
          className={
            pathname === "/"
              ? "whitespace-nowrap rounded-lg bg-purple-200 p-[10px] text-base font-bold text-purple-500 sm:text-sm"
              : "whitespace-nowrap rounded-lg bg-transparent p-[10px] text-base text-black transition-colors hover:text-purple-500 sm:text-sm"
          }
        >
          Поиск
        </Link>
        <CustomMenu>
          <UnstyledButton
            className={
              pathname === "/movies"
                ? "rounded-lg bg-purple-200 p-[10px] text-base font-bold text-purple-500 sm:text-sm"
                : "rounded-lg bg-transparent p-[10px] text-base text-black transition-colors hover:text-purple-500 sm:text-sm"
            }
          >
            Фильмы
          </UnstyledButton>
        </CustomMenu>
        <Link
          href="/trending"
          className={
            pathname === "/trending"
              ? "rounded-lg bg-purple-200 p-[10px] text-base font-bold text-purple-500 sm:text-sm"
              : "rounded-lg bg-transparent p-[10px] text-base text-black transition-colors hover:text-purple-500 sm:text-sm"
          }
        >
          В тренде
        </Link>
      </Box>
    </Box>
  );
};

export default SideBar;
