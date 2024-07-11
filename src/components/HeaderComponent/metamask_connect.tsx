import { useEffect, useState } from "react";

import { request } from "http";
import { type } from "os";

export default function MetamaskButtonComponent (): JSX.Element {
    const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
    const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);
    

    /// -- check if Metamask wallet is installed --
    useEffect(() => {
        if ((window as any).ethereum) {
            setIsMetamaskInstalled(true);
        }
    },[]);


    /// -- check if the user has an ethereum wallet/account --
    async function connectMetamaskWallet(): Promise<void> {
        // to get around type checking
        (window as any).ethereum.request({
            method: "eth_requestAccounts",
        }).then((accounts : string[]) => {
            setEthereumAccount(accounts[0]);
        }).catch((err: any) => {
            alert (`ethereum account connection error: ${err}`);
        });
    }

    if (ethereumAccount === null) {
      return (
        <div className="App App-header">
            {
                isMetamaskInstalled ? (
                  <div className="box-1">
                    <button className="btn btn-three" onClick={connectMetamaskWallet}>
                      <span>
                        Connect Wallet
                      </span>                        
                    </button>
                  </div>
                ) : (
                    <p>install metamask</p>
                )
            }
        </div>
      );
    }

    return (
   <div className="App">
     <header className="App-header">
       <p>
         ETH wallet connected as: {ethereumAccount}
       </p>
     </header>
   </div>
 );
}

