export const NFTCard = ({ nft }) => {

    return (
        <div className="w-1/5 m-3 flex flex-col ">
        <div className="rounded-md">
            <img className="object-cover h-full w-full rounded-t-md" src={nft.media[0].gateway} ></img>
        </div>
        <div className="flex flex-col y-gap-2 px-2 py-3 bg-purple-600 rounded-b-lg h-110 ">
            <div className="">
                <h2 className="text-xl text-white text-center">{nft.title}</h2>
                <p className="text-sm text-white">Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>        
            </div>

            <div className="">
                <h2 className="text-md text-white text-center">{nft.contract.address}</h2>
                <p className="text-sm text-white"></p>
            </div>

            <div className="flex-grow mt-2">
                <p className="text-sm text-white">Description: {nft.description?.substr(0, 32)}...</p>
            </div>
            <div className="flex justify-center mb-1">
                <a target={"_blank"} href={`https://etherscan.io/address/${nft.contract.address}`} className="py-2 px-2 mr-2 text-sm bg-blue-500 w-1/2 text-center rounded-lg text-white cursor-pointer">Contract on Etherscan</a>
                
                <a target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`} className="py-2 px-2 ml-2 text-sm bg-blue-500 w-1/2 text-center rounded-lg text-white cursor-pointer">Token on etherscan</a>

                
        
        
            </div>
        </div>

    </div>
    )
}