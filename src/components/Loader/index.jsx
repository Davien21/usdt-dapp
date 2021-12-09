import React, { useEffect, useState } from "react";
import Emitter from "../../services/emitter";
import styles from "./loader.module.css";

function Loader() {
  const [isActive, setIsActive] = useState(false);
  const [containerClass, setContainerClass] = useState(
    `${styles["container"]}  ${styles["hide"]}`
  );

  useEffect(() => {
    Emitter.on("OPEN_LOADER", () => setIsActive(true));
    Emitter.on("CLOSE_LOADER", () => setIsActive(false));

    return () => {
      Emitter.off("OPEN_LOADER", () => setIsActive(false));
      Emitter.off("CLOSE_LOADER", () => setIsActive(false));
    };
  });

  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "auto";
    if (isActive) return setContainerClass(`${styles["container"]}`);

    setTimeout(() => {
      setContainerClass(`${styles["container"]} ${styles["hide"]}`);
    }, 600);

    return () => {
      setContainerClass(`${styles["container"]} ${styles["hide"]}`);
    };
  }, [isActive]);

  return (
    <div className={containerClass}>
      <div className={`${styles["loader-body"]}`}>
        <div className={`${styles["loader"]}`}>Loading...</div>
      </div>
    </div>
  );
}

export { Loader };
