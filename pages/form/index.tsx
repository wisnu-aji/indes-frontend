import React, { FC } from "react";
import style from './style.module.css';

const Form: FC = () => {
  return (
    <div className={style.container}>
      <form>
        <p>
          <label> Nama : </label>
          <input type="text" />
        </p>
        <p>
          <label> Alamat : </label>
          <input type="text" />
        </p>
        <p>
          <label> Masukkan nomer telepon : </label>
          <input type="number" />
        </p>

        <select>
          <option>10mbps/100.000</option>
          <option>15mbps/150.000</option>
          <option>20mbps/250.000</option>
          <option>1mbps/10.000</option>
          <option>2mbps/15.000</option>
        </select>
   
        <input type="submit" value="Daftar" />
      </form>
    </div>
  );
};
export default Form;
