import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getUSDTDetails } from "../services/usdtService";

import {
  connectToMetaMask,
  getActiveWallet,
  listenToAccountChanges,
  hasEthereum,
  unmountEthListeners,
} from "../services/web3Service";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [USDTData, setUSDTData] = useState({
    name: "",
    totalSupply: 0,
    balance: 0,
    symbol: "",
    initialSupply: 0,
  });
  const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(true);

  const onTransactionUpdate = (updates) => {
    setTransactions(updates);
  };
  const handleWalletConnect = useCallback(() => {
    return (async () => {
      const connectionStatus = await connectToMetaMask();
      if (!connectionStatus) return false;
      const address = getActiveWallet();
      setUser(address);

      setIsConnected(true);
      const usdtData = await getUSDTDetails(onTransactionUpdate);

      if (usdtData.totalSupply && typeof usdtData.totalSupply === "number")
        setUSDTData(usdtData);

      localStorage.setItem("wallet-connection", true);

      return true;
    })();
  }, []);

  const resetValues = useCallback(() => {
    return (async () => {
      const address = getActiveWallet();
      const usdtData = await getUSDTDetails(onTransactionUpdate);
      setUSDTData(usdtData);

      setUser(address);
      setIsConnected(true);

      localStorage.setItem("wallet-connection", true);

      return true;
    })();
  }, []);

  const handleWalletDisconnect = () => {
    setIsConnected(false);
    localStorage.removeItem("wallet-connection");
  };

  const handleAccountChanged = (address) => {
    if (hasMetaMask && !address) return handleWalletDisconnect();
    resetValues();
  };

  useEffect(() => {
    if (!isInitiallyFetched) return;

    if (!hasEthereum()) return;
    listenToAccountChanges(handleAccountChanged);

    return unmountEthListeners();
  });

  useEffect(() => {
    if (isInitiallyFetched) return;
    if (!hasEthereum()) {
      console.log("Please Install Meta Mask");
      return setHasMetaMask(false);
    }

    const isInjected = localStorage.getItem("wallet-connection");
    if (!isInjected) return setIsInitiallyFetched(true);

    handleWalletConnect();
    setIsInitiallyFetched(true);
    return;
  }, [handleWalletConnect, isInitiallyFetched]);

  return (
    <AppContext.Provider
      value={{
        USDTData,
        transactions,
        user,
        setUser,
        isConnected,
        setIsConnected,
        handleWalletConnect,
        handleWalletDisconnect,
        hasMetaMask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) throw new Error("useApp must be used inside a `AppProvider`");

  return context;
}
