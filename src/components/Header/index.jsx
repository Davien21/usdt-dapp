import React from "react";
import { WalletButton } from "../index";
import { LogoIcon } from "../../assets/svg";

import styles from "./header.module.css";

function Header(props) {
  return (
    <header className={`${styles.container} `}>
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <LogoIcon className={`${styles.logo}`} />
            <span className="ml-3 text-2xl">USDT</span>
          </div>
          <div className="row justify-content-between">
            <div className="col-auto">
              <a
                className=""
                rel="noreferrer"
                target="_blank"
                href="https://tether.to/faqs/"
              >
                FAQ
              </a>
            </div>
            <div className="col-auto">
              <WalletButton />
            </div>
            {/* // eslint-disable-next-line jsx-a11y/anchor-has-content */}
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
