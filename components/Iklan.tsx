/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useState } from "react";
import style from "../styles/Home.module.css";
import { IklanType } from "../typings/component";

export const Iklan: FC = () => {
  const [data, setData] = useState<Array<IklanType>>([]);

  useEffect(() => {
    fetch("https://api.wisnuaji.my.id/api/v1/iklan")
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      });
  }, []);

  return (
    <div className={style.iklan}>
      {data.map((iklan, i) => {
        const hariIni = new Date();
        const expired = new Date(iklan.expired);
        if (hariIni.getTime() > expired.getTime()) return null;
        return (
          <img key={"iklan" + i} className={style.gambar} src={iklan.gambar} />
        );
      })}
    </div>
  );
};
