import { Button, Paper, Stack, Typography } from "@mui/material";
import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { RevochatContext } from '../../public/context/context'

const MetaConnect = () => {

  const {currentUser, wallet} = useContext(RevochatContext);

  // const [wallet, setWallet] = useContext(Context);

  const [errorMessage, setErrorMessage] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountsChanged);
      window.ethereum.on("chainChanged", chainChanged);
    }
  }, []);

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await accountsChanged(res[0]);
      } catch (err) {
        console.error(err);
        setErrorMessage("There was a problem connecting to MetaMask");
      }
    } else {
      setErrorMessage("Install MetaMask");
    }
  };

  const accountsChanged = async (newAccount) => {
    setAccount(newAccount);
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [newAccount.toString(), "latest"],
      });
      setBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.error(err);
      setErrorMessage("There was a problem connecting to MetaMask");
    }
    // setWallet(account)
  };

  const chainChanged = () => {
    setErrorMessage(null);
    setAccount(null);
    setBalance(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h6"> Account: {account} </Typography>
        <Typography variant="h6">
          Balance: {balance} {balance ? "ETH" : null}
        </Typography>
        {/* <Button onClick={connectHandler}>Connect Account</Button> */}
        <Button href="/chat">Access to Chat</Button>
        {errorMessage ? (
          <Typography variant="body1" color="red">
            Error: {errorMessage}
          </Typography>
        ) : null}
      </Stack>
    </Paper>
  );
};

export default MetaConnect;