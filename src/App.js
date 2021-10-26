import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json";
import {
  ClickMeIndicator,
  LoadingIndicator,
  LoadingCompleteIndicator,
} from './components';

const ButtonContent = ({miningInProgress, waveCompleted, waveCount}) => {
  if (miningInProgress) {
    return (
      <>
        <LoadingIndicator />
        <div className="buttonText">Mining...</div>
      </>
    )
  }

  if (waveCompleted) {
    return (
      <>
        <LoadingCompleteIndicator />
        <div className="buttonText">Thank you for being number {waveCount} to holler!</div>
      </>
    )
  }
  
  return (
    <>
      <ClickMeIndicator />
      <div className="buttonText">Holler at me!</div>
    </>
  )
}

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  
  const [waveCount, setWaveCount] = useState(0);
  const [miningInProgress, setMiningInProgress] = useState(false);
  const [waveCompleted, setWaveCompleted] = useState(false);
  
  const contractAddress = "0x709c291B55ff76237FBcc646be4D75e839f59Ff8";
  const contractABI = abi.abi;

  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have Metamask!");
        return;
      } else {
        console.log("Ethereum object:", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected account:", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash)
        setMiningInProgress(true);
        await waveTxn.wait();
        console.log("Mined...", waveTxn.hash)
        setMiningInProgress(false);

        let totalWaveCount = await wavePortalContract.getTotalWaveCount();
        console.log("total wave count", totalWaveCount.toNumber());
        setWaveCount(totalWaveCount.toNumber());
        setWaveCompleted(true);
      } else {
        console.log("ethereum object doesn't exist");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    isWalletConnected()
  }, [])

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          <span role="img" aria-label="person waving">🙋‍♂️</span> Hi there!
        </div>
        <div className="bio">
          <p>I'm Osama! I work on making flashsales better for Shopify merchants. In my spare time, I enjoy cooking, photography, and learning about Ethereum!</p>
          <p>Connect your wallet and say hi!</p>
        </div>

        {currentAccount && (<button className="waveButton" onClick={wave} disabled={miningInProgress}>
          <div className="buttonContent">
            {ButtonContent({miningInProgress, waveCompleted, waveCount})}
          </div> 
        </button>)}

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>
    </div>
  );
}
