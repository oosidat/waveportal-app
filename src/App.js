import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  
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

  const wave = () => {
    console.log("wave");
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

        <button className="waveButton" onClick={wave}>
          <span role="img" aria-label="hand-waving">👋</span> Holler at me!
        </button>

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>
    </div>
  );
}
