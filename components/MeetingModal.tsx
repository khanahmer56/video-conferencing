import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { title } from "process";
import { Button } from "./ui/button";

const MeetingModal = ({
  isopen,
  onclose,
  title,
  buttonText,
  className,
  handleClick,
  image,
  children,
}: any) => {
  return (
    <div>
      <Dialog open={isopen} onOpenChange={onclose}>
        <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
          <div>
            {image && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-center">
                  <Image src={image} alt="image" width={72} height={72} />
                </div>
              </div>
            )}
            <h2 className={`text-3xl font-bold leading-[42px] ${className}`}>
              {title}
            </h2>
            {children}
            <Button
              className="bg-blue-1 focus-visible:right-0 w-full mt-10"
              onClick={handleClick}
            >
              {buttonText || "Schedule Meeting"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeetingModal;
