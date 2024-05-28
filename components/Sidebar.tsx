"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface sidebarlinktpe {
  label: string;
  route: string;
  imgUrl: string;
}
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky left-0 top-0 flex flex-col h-screen w-fit justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px">
      <div className="flex flex-col gap-6 flex-1">
        {sidebarLinks.map((links: sidebarlinktpe) => {
          const isActive =
            pathname === links.route || pathname.startsWith(links.label);
          return (
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
          );
        })}
      </div>{" "}
    </section>
  );
};

export default Sidebar;
