import { FC, ReactNode } from "react";
import Link from "next/link";
import { Menu, Text } from "@mantine/core";

import { movieFiltersList } from "@/app/const";
import { useSelect } from "@/app/hooks";

interface CustomMenuProps {
  children: ReactNode;
}

const CustomMenu: FC<CustomMenuProps> = ({ children }) => {
  const { handleFilterTypeOfMoviesChange } = useSelect();

  return (
    <Menu trigger="hover" openDelay={100} closeDelay={300}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        {movieFiltersList.map((filter) => (
          <Link key={filter} href={`/movies`}>
            <Menu.Item onClick={() => handleFilterTypeOfMoviesChange(filter)}>
              <Text size="md">{filter}</Text>
            </Menu.Item>
          </Link>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default CustomMenu;
