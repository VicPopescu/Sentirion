import { ReactNode } from "react";

type SuperscriptProps = {
  children: ReactNode;
};

const Superscript: React.FC<SuperscriptProps> = ({ children }) => {
  return (
    <sup className="text-green-600 text-[0.6em] ml-[0.2em] font-bold">
      {children}
    </sup>
  );
};

export default Superscript;
