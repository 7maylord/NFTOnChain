# NFTOnChain

NFTOnChain is a fully on-chain ERC721 NFT smart contract that dynamically generates metadata and SVG-based images. This project allows users to mint unique NFTs without relying on external storage like IPFS or centralized servers.

- **Contract Address**: 0x4dB4200950E5F9a0569EB41e5b8a28C764e1AF5b
- **NFT Address**: https://sepolia.etherscan.io/address/0x4dB4200950E5F9a0569EB41e5b8a28C764e1AF5b#code

## Features
- Fully on-chain NFT metadata and images (SVG stored in smart contract)
- ERC721 compliant using OpenZeppelin's implementation
- Limited supply with a customizable maximum supply
- Ethers.js deployment script for easy deployment
- Automated verification process on Etherscan

## Technologies Used
- Solidity (Smart Contract Development)
- OpenZeppelin Contracts (ERC721, Strings, Ownable, Base64 encoding)
- Hardhat (Smart Contract Testing and Deployment)
- TypeScript & Ethers.js (Deployment script)
- dotenv (Environment variable management)

---

## Smart Contract: NFTOnChain.sol

### Constructor
```solidity
constructor(
    string memory name_,
    string memory symbol_,
    uint256 maxSupply_
) ERC721(name_, symbol_) Ownable(msg.sender) {
    MAX_SUPPLY = maxSupply_;
}
```
- Initializes the NFT collection with a name, symbol, and maximum supply.

### Minting Function
```solidity
function mint() public {
    if (_tokenIdCounter >= MAX_SUPPLY) revert MaxSupplyReached();
    _tokenIdCounter += 1;
    _safeMint(msg.sender, _tokenIdCounter);
}
```
- Allows users to mint NFTs until the max supply is reached.

### Token URI (Metadata Generation)
```solidity
function tokenURI(uint256 tokenId) public view override returns (string memory)
```
- Returns metadata as a base64-encoded JSON string, including an SVG image.

### On-Chain SVG Image Generation
```solidity
function generateBase64Image() internal pure returns (string memory)
```
- Generates an SVG-based NFT image stored fully on-chain.

---

## Deployment Script: `deploy.ts`

### Steps in Deployment
1. **Load Signer**: Fetches deployer wallet.
2. **Deploy Contract**: Deploys `NFTOnChain` with provided name, symbol, and max supply.
3. **Mint First NFT**: Calls the `mint()` function to mint an initial NFT.
4. **Verify Contract on Etherscan** (if not using Hardhat network).

### Running the Deployment

#### Prerequisites
Ensure you have:
- Node.js & npm installed
- Hardhat installed globally
- An Alchemy or Infura RPC URL
- Sepolia testnet tokens since we are using sepolia to deploy.
- A private key for deployment stored in `.env`

#### Clone the repository:
```sh
git clone https://github.com/7maylord/NFTOnChain.git
cd NFTOnChain
cd Smart-Contract
```

#### Install Dependencies
```bash
npm install
```

#### Create a `.env` File
```
ALCHEMY_SEPOLIA_API_KEY_URL=
ACCOUNT_PRIVATE_KEY=
ETHERSCAN_API_KEY=
```

#### Compile the smart contracts:
```sh
npx hardhat compile
```

#### Deploy the Contract
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

#### Verify the Contract (Optional if deploy script fails)
```bash
npx hardhat verify --network sepolia <contract_address> <name> <symbol> <MAX_SUPPLY>
```

---

## Interacting with the Smart Contract

Once deployed, you can interact with the contract using Hardhat Console:

### Mint an NFT
```javascript
const nft = await ethers.getContractAt("NFTOnChain", "<contract_address>");
await nft.mint();
```

### Get Token Metadata
```javascript
const metadata = await nft.tokenURI(1);
console.log(metadata);
```

---

## License
This project is unlicensed.

## Author
Developed by **[MayLord](https://github.com/7maylord)**. Feel free to contribute and improve the project!

---

Happy coding! 🚀
