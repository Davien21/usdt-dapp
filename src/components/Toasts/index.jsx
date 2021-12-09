import styles from "./toasts.module.css";
import { useEffect, useState } from "react";

import Emitter from "../../services/emitter";

function Toast() {
  const [isDisplayingToast, setIsDisplayingToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    type: "success",
    message: "hello",
  });

  useEffect(() => {
    Emitter.on("TOAST", ({ type, message }) => {
      setIsDisplayingToast(true);
      setToastConfig({ type, message });
    });

    return () => {
      Emitter.off("TOAST", () => {
        setIsDisplayingToast(false);
        setToastConfig({ type: "success", message: "hello" });
      });
    };
  });

  const containerClass = (() => {
    if (!isDisplayingToast)
      return `${styles["container"]} ${styles[toastConfig.type]}`;

    return `${styles["container"]} ${styles[toastConfig.type]} ${
      styles["active"]
    }`;
  })();

  useEffect(() => {
    if (!isDisplayingToast) return;
    setTimeout(() => {
      if (!isDisplayingToast) return;
      setIsDisplayingToast(false);
    }, 3000);
  }, [isDisplayingToast, setIsDisplayingToast]);

  return (
    <div className={containerClass}>
      {/* <CloseButton onClick={() => setIsDisplayingToast(false)} /> */}
      <div className="grid grid-cols-6">
        <div className={`${styles["content"]} col-span-5`}>
          <p className={`${styles["heading"]} mb-2`}>{toastConfig.type}</p>
          <p className={`${styles["message"]}`}>{toastConfig.message}</p>
        </div>
      </div>
    </div>
  );
}

export { Toast };
