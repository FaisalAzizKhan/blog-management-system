// src/Layout/MainLayout/MainLayout.tsx

import type { ReactNode } from "react";
import { useEffect } from "react";
import { TopBar } from "../TopBar/TopBar.";



interface MainLayoutProps {
  children: ReactNode;
  pageTitle?: string;  
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
 

  useEffect(() => {
    document.body.style.backgroundColor = "#F6F7F9";
  }, []);

  return (
    <div className="min-h-screen flex bg-[#F6F7F9] overflow-x-hidden ">
      <div className=" w-screen top-5 fixed ">
        <TopBar />
      </div>
      <div className={"flex flex-col max-w-[80%] mx-auto flex-1 mt-24 "}>
        <div className="flex-grow ">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
