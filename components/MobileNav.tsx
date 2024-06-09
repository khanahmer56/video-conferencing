"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
interface sidebarlinktpe {
  label: string;
  route: string;
  imgUrl: string;
}
const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="menu-bar"
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className="border-none bg-dark-1">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src={"/icons/logo.svg"}
              width={33}
              height={33}
              alt="metify logo"
              className="max-sm:size-10"
            />
            <p className="text-[26px] font-extrabold text-white">Meetify</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((links: sidebarlinktpe) => {
                  const isActive =
                    pathname === links.route ||
                    pathname.startsWith(links.label);
                  return (
                    <SheetClose asChild key={links.label}>
                      <Link
                        href={links.route}
                        key={links.label}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-lg justify-start",
                          {
                            "bg-blue-1": isActive,
                          }
                        )}
                      >
                        <Image
                          src={links.imgUrl}
                          alt={links.label}
                          width={25}
                          height={25}
                        />
                        {links.label}
                      </Link>
                    </SheetClose>
                  );
                })}
                <p className="text-[12px] mt-12">Copyright 2024 ahmer khan</p>
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
