import { FC, useState } from "react"
import style from "./style.module.css"

export const Modal: FC<{ label: string; className?: string }> = ({
  label,
  children,
  className,
}) => {
  const [show, setShow] = useState(false)

  return (
    <div className={style.container}>
      <div
        className={style.label + " " + className}
        onClick={() => setShow(true)}
      >
        {label}
      </div>
      {show && (
        <div className={style.show}>
          <div className={style.show__content}>
            <div className={style.show__content_header}>
              <button onClick={() => setShow(false)}>X</button>
            </div>
            <div className={style.show__content_body}>{children}</div>
          </div>
        </div>
      )}
    </div>
  )
}
