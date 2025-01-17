"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
type Props = { children?: React.ReactNode };

const ProgressProvider = ({ children }: Props) => {
  return (
    <>
      {children}
      <ProgressBar height="4px" color="#d5b990" shallowRouting />
    </>
  );
};

export default ProgressProvider;
