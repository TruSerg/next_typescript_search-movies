"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@mantine/core";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <Box className="min-h-screen w-[100%] max-w-[280px] bg-purple-100 p-6">
      <Box className="mb-10 flex gap-3">
        <Image src={"/logo.svg"} alt={"logo"} width={32} height={32} />
        <span className="text-[24px] font-semibold text-purple-500">
          TMDB
        </span>
      </Box>
      <Box className="flex flex-col gap-2">
        <Link
          href={"/"}
          className={
            pathname === "/"
              ? "mb-4 rounded-lg bg-purple-200 p-[10px] text-base font-bold text-purple-500"
              : "mb-4 rounded-lg bg-transparent p-[10px] text-base text-black transition-colors hover:text-purple-500"
          }
        >
          Movies
        </Link>
        <Link
          href={"/trending"}
          className={
            pathname === "/trending"
              ? "mb-4 rounded-lg bg-purple-200 p-[10px] text-base font-bold text-purple-500"
              : "mb-4 rounded-lg bg-transparent p-[10px] text-base text-black transition-colors hover:text-purple-500"
          }
        >
          Trending movies
        </Link>
        <Link
          className={
            pathname === "/rated"
              ? "rounded-lg bg-purple-200 p-[10px] text-base font-bold text-purple-500"
              : "rounded-lg bg-transparent p-[10px] text-base text-black transition-colors hover:text-purple-500"
          }
          href={"/rated"}
        >
          Rated
        </Link>
      </Box>
    </Box>
  );
};

export default SideBar;
