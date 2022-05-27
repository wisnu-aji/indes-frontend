import { FC } from 'react'
import { Account } from '../Account'
import style from './style.module.css'

export const Header: FC = () => {
  return <div className={style.container}>
    <div className={style.title}>Admin Dashboard</div>
    <Account />
  </div>
}