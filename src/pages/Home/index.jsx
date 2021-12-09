import React from "react";
import { Header } from "../../components";
import { useAppContext } from "../../contexts/appContext";
import { formatMoney } from "../../utils";
import styles from "./home.module.css";
import { formatAddress } from "./../../utils/toolKit";

function Home() {
  const { USDTData, transactions } = useAppContext();

  return (
    <div className={`${styles["container"]}`}>
      <Header />
      <main className={`pb-5`}>
        <div className="bg-white pt-4 mb-5">
          <div className="container">
            <div className="row justify-content-between">
              <div className={`${styles["info-card"]} col-auto mb-4`}>
                <span className="mb-1">Initial Supply</span>
                <span>{formatMoney(USDTData.initialSupply)}</span>
              </div>
              <div className={`${styles["info-card"]} col-auto mb-4`}>
                <span className="mb-1">Total Supply</span>
                <span>{formatMoney(USDTData?.totalSupply)}</span>
              </div>
              <div className={`${styles["info-card"]} col-auto mb-4`}>
                <span className="mb-1">Wallet Balance</span>
                <span>{formatMoney(USDTData?.balance)}</span>
              </div>
              <div className={`${styles["info-card"]} col-auto mb-4`}>
                <span className="mb-1">Symbol</span>
                <span>{USDTData?.symbol}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div
            id={`${styles["recent-transactions"]}`}
            className="bg-white px-0 container-md overflow-auto"
          >
            <div className="pt-4 px-4">
              <div
                className={`row justify-content-between mb-3 ${styles["contract-name"]}`}
              >
                <span className="col-auto">Contract Name:</span>
                <span className="col-auto">{USDTData?.name}</span>
              </div>
              <div className="row justify-content-between align-items-center mb-4">
                <p className={`${styles["title"]} col-auto mb-0 mx-md-auto`}>
                  Recent Transactions
                </p>
              </div>
              <div className={`${styles["table-head"]} row `}>
                <span className="col-4">Transaction</span>
                <span className="col-4">From</span>
                <span className="col-4">To</span>
              </div>
            </div>
            <hr className="mt-" />
            <div className={`pb-4 px-4 ${styles["transactions"]}`}>
              {transactions.map((item, index) => (
                <div key={index + item.amount} className="row ">
                  <div className="mb-2 col-4">
                    <span className="mr-2">Sent</span>
                    <span className={`${styles["green-text"]}`}>
                      {formatMoney(item.amount)} USDT
                    </span>
                  </div>
                  <div className="mb-2 col-4" title={`${item.from}`}>
                    {formatAddress(item.from)}
                  </div>
                  <div className="mb-2 col-4" title={`${item.to}`}>
                    {formatAddress(item.to)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { Home };
