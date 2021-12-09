import { Button } from "../index";
import { WalletIcon } from "../../assets";
import styles from "./connect-button.module.css";
import { useAppContext } from "../../contexts/appContext";

function ConnectButton() {
  const loading = false;
  const { handleWalletConnect, hasMetaMask } = useAppContext();

  async function connect() {
    const connectionStatus = await handleWalletConnect();
    if (!connectionStatus) return;
  }

  return (
    <div>
      {!hasMetaMask && (
        <div className="">
          <a
            rel="noreferrer"
            referrerPolicy="no-referrer"
            target="_blank"
            href="https://metamask.io/download"
          >
            <Button buttonText="Get Meta mask" />
          </a>
        </div>
      )}
      {hasMetaMask && (
        <Button onClick={connect} disabled={loading}>
          <span className="d-none d-md-block">Connect Wallet</span>
          <WalletIcon className={`${styles["wallet-icon"]} d-md-none`} />
        </Button>
      )}
    </div>
  );
}

export { ConnectButton };
