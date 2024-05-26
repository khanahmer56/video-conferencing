import React, { ReactNode } from "react";
interface rootlayout {
  children: ReactNode;
}
const layout = ({ children }: rootlayout) => {
  return (
    <main>
      {children}
      Footer
    </main>
  );
};

export default layout;
