import React from "react";

const RootLayout = ({ children, className }) => {
  return (
    <>
      <div
        className={`bg-gradient-to-r from-[#22345C] to-[#2F4F97] xl:py-4 w-full   h-screen flex place-items-center flex-col px-4 ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default RootLayout;
