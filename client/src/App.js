
import Upload from "./artifacts/contracts/Upload.sol/Upload.json"; 
import {useState, useEffect} from "react";
import {ethers} from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";

import './App.css';

function App() {
  const [account, setAccount] = useState(""); 
  const [contract, setContract] = useState(null); 
  const [provider, setProvider] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false);

  //logic to interact with smart contract
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);//provider is to read the data from blockchain not write & window.etehreum is injected by metamask

    const loadProvider = async () => {
      if(provider){

        //whenever a chain or account would be changed in metamask window will reload by this 
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts",[]);//this will open our metamask account as soon as dapp runs
        const signer = provider.getSigner(); //signer to write the data on blockchain
        const address = await signer.getAddress();
        setAccount(address);

        //to create the instance of smart contract we need 3 things - contract address, abi and signer/provider(based on the need)

        let contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

        const contract = new ethers.Contract(
          contractAddress, Upload.abi, signer
        );
        //console.log(contract)
        setContract(contract);
        setProvider(provider);
      }else{
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider()
  }, []); //[] -> is the dependency array

  return (  //button to open and close modal wheneever we want 
    <>
    
    {!modalOpen && (<button className="share" onClick={ () => setModalOpen(true)}>Share</button>)}{" "}
    {modalOpen && ( <Modal setModalOpen = {setModalOpen} contract = {contract}></Modal> )}
    <div className="App">
      <h1 style={{color:"white"}}>MJ File System</h1>
      <div class = "bg"></div>
      <div class = "bg bg2"></div>
      <div class = "bg bg3"></div>

      <p style={{color:"white"}}>Account : {account ? account:"Not connected"}</p>

      <FileUpload 
        account = {account} 
        provider = {provider} 
        contract = {contract}>
      </FileUpload>
      <Display contract = {contract} account = {account}>

      </Display>
    </div>
    </>
  );
}

export default App;
