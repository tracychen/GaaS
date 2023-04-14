import clsx from "clsx";

const Main = ({ children }: any) => {
  return <main className={clsx("relative bg-white")}>{children}</main>;
};

export default Main;