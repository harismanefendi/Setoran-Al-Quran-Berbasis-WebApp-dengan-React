import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Select, SelectItem } from "@nextui-org/react";

export default function Testing() {
  const animals = [
    { label: "Cat", value: "cat" },
    { label: "Dog", value: "dog" },
  ];

  return (
    <div>
      <Navbar isBordered>
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className=" sm:flex gap-4" justify="center">
          <NavbarItem style={{ width: "200px", backgroundColor: "red" }}>
            <Select color="greendark" variant="flat" label="Select an animal">
              <SelectItem color="" value="cat">
                Cat
              </SelectItem>
              <SelectItem value="dog">Dog</SelectItem>
            </Select>
          </NavbarItem>

          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} style={{ backgroundColor: "var(--nextui-customColor)" }} href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
