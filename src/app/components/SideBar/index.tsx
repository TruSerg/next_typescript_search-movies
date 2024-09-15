"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Box, UnstyledButton } from "@mantine/core";

import CustomMenu from "../Menu";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <Box className="min-h-screen w-[100%] max-w-[280px] bg-purple-100 p-6 xl:flex xl:min-h-0 xl:max-w-[1470px] xl:items-center xl:justify-between xl:gap-5 xl:pl-[15px] xl:pr-[15px] md:flex-col md:items-start">
      <Box className="mb-10 flex gap-3 xl:mb-0">
        <Image src={"/logo.svg"} alt={"logo"} width={32} height={32} />
        <span className="text-[24px] font-semibold text-purple-500">TMDB</span>
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
          Search by filters
        </Link>
        <CustomMenu>
          <UnstyledButton
            className={
              pathname === "/movies"
                ? "rounded-lg bg-purple-200 p-[10px] text-base font-bold text-purple-500 sm:text-sm"
                : "rounded-lg bg-transparent p-[10px] text-base text-black transition-colors hover:text-purple-500 sm:text-sm"
            }
          >
            Movies
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
          Trending
        </Link>
      </Box>
    </Box>
  );
};

export default SideBar;
