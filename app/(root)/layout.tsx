import StreamProvider from "@/providers/streamClientProvider";
import React, { ReactNode } from "react";
interface rootlayout {
  children: ReactNode;
}
const layout = ({ children }: rootlayout) => {
  return (
    <main>
      <StreamProvider>{children}</StreamProvider>
      Footer
    </main>
  );
};

export default layout;
