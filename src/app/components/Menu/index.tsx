import { FC, MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import { Menu, Text } from "@mantine/core";

import { changeMovieFilterValue } from "@/app/store/searchMoviesSlice";

import { movieFiltersList } from "@/app/const";
import { correctFiltersText } from "@/app/utils/correctFiltersText";
import { useAppDispatch } from "@/app/hooks/useStoreHooks";

interface CustomMenuProps {
  children: ReactNode;
}

const CustomMenu: FC<CustomMenuProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  return (
    <Menu trigger="hover" openDelay={100} closeDelay={300}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        {movieFiltersList.map((filter) => (
          <Link key={filter} href={`/movies`}>
            <Menu.Item onClick={() => dispatch(changeMovieFilterValue(filter))}>
              <Text size="md">{correctFiltersText(filter)}</Text>
            </Menu.Item>
          </Link>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default CustomMenu;
