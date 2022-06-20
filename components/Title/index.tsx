import { FC } from "react";
import style from "./style.module.css";

export const Title: FC = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};
