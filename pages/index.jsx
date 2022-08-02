import { useState } from 'react'
import {NFTCard} from "./components/nftCard"

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection]=useState("")

  const fetchNFTs = async() => {
    let nfts; 
    console.log("fetching nfts");
    const api_key = "ZzM_Zo3H6Wl6YwAHvD74oG6rDwJvrEW8"
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;

    
    var requestOptions = {
      method: 'GET'
    };

    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
    }

    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }


  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "ZzM_Zo3H6Wl6YwAHvD74oG6rDwJvrEW8"
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }
  

  return (
    
    <div className="h-screen w-screen bg-slate-900 ">
    <div className="flex flex-col items-center justify-center">
      <span className="bg-clip-text text-transparent py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-8xl font-bold ...">Alchemy RTW3 Week4 (NFT GALLERY)</span>
      <div className="flex flex-col items-center justify-center">
        
        <input id="wa" disabled={fetchForCollection} className="w3-container w-full bg-gradient-to-r from-violet-900 to-fuchsia-600 py-2 px-2 rounded-lg text-white focus:outline-slate-300 disabled:let text=purple-900" onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={"text"}  placeholder="Enter a wallet address here"></input>
        
        <label className="text-white"><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2 mt-2 mb-3"></input>Disable wallet address and search NFT collections only!</label>

        <input id="ca" className="w3-container w-full bg-gradient-to-r from-violet-900 to-fuchsia-600 py-2 px-2 rounded-lg text-white focus:outline-slate-300" onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Enter a collection address here"></input>

        <button className={"disabled:bg-slate-900 text-white bg-gradient-to-r from-violet-900 to-fuchsia-600 px-4 py-2 mt-3 rounded-lg w-1/8"} onClick={
          () => {
            if (fetchForCollection) {
              fetchNFTsForCollection()
            }
            else fetchNFTs()
          }
        }>Discover NFTs! </button> 

      </div>
      <div className='h-full bg-slate-900 flex flex-wrap gap-y-12 w-screen gap-x-2 justify-center text-slate-900'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}>No NFTs Currently!</NFTCard>
            )
          })
        }
      <div className='bg-slate-900 text-white text-3xl flex flex-wrap w-screen mt-3 mb-24 gap-x-96 justify-center'>
        <a href="#" class="">&#10094; Previous </a>
        <a href="#" class=""> Next &#10095;</a>
      </div>
      </div>
    </div>
    </div>
  )
}
export default Home