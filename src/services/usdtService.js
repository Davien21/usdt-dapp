import { formatEther } from "@ethersproject/units";
import { ethers } from "ethers";
import Emitter from "./emitter";
import toast from "./../utils/toastConfig";
import {
  getActiveWallet,
  hasEthereum,
  getCurrentNetwork,
  getUSDTContract,
} from "./web3Service";

export async function getUSDTDetails(onTransactionUpdate) {
  Emitter.emit("OPEN_LOADER");

  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();

    if (network && network !== "homestead") {
      toast.error("Please switch to the Ethereum Mainnet Network");
      return false;
    }

    const address = getActiveWallet();
    if (!address) {
      toast.error("Please connect your wallet to use this app");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const USDTContract = await getUSDTContract(signer);

    const decimals = (await USDTContract.decimals()).toNumber();
    const stopEvent = async () => {
      Emitter.emit("CLOSE_LOADER");
      await USDTContract.off("Transfer", () => {});
    };
    let transactionCount = 0;
    await USDTContract.on("Transfer", async (from, to, value, n) => {
      if (transactionCount > 7) return stopEvent();
      value = formatEther(value).toString();

      const amount = parseInt(n.data.toString()) / 10 ** decimals;
      if (amount > 0) {
        onTransactionUpdate({ from, to, amount });
        transactionCount++;
      }
    });

    const totalSupply = parseInt((await USDTContract.totalSupply()).toString());
    const name = await USDTContract.name();
    const symbol = await USDTContract.symbol();
    const balance = (await USDTContract.balanceOf(address)).toNumber();
    const initialSupply = 100000000000; // Gotten from etherscan

    Emitter.emit("CLOSE_LOADER");
    return { name, initialSupply, totalSupply, symbol, balance };
  } catch (err) {
    console.log("Something went wrong: ", err);
    return false;
  }
}
