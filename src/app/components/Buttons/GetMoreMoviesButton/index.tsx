"use client";
import { FC } from "react";
import Link from "next/link";

interface CustomButtonProps {
  text: string;
  className: string;
}

const GetMoreMoviesButton: FC<CustomButtonProps> = ({ text, className }) => {
  let page = 1;

  return (
    <Link href={`/movies/${page + 1}`} className={className}>
      {text}
    </Link>
  );
};

export default GetMoreMoviesButton;
