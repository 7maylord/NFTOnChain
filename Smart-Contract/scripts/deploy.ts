import { ethers, run, network } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with account: ${deployer.address}`);

    // Deploy ERC721 Token
    const NFT = await ethers.getContractFactory("NFTOnChain");

    const name = "MayNFT";
    const symbol = "NFT";
    const maxSupply = 10000;

    const nft = await NFT.deploy(name, symbol, maxSupply);
    await nft.waitForDeployment();
    const nftAddress = await nft.getAddress();
    console.log(`ERC721 token deployed at: ${nftAddress}`);

    // Mint the first token to the deployer
    console.log("Minting the first NFT to the deployer...");
    const mintTx = await nft.mint(); // Calling the mint function
    await mintTx.wait(); // Wait for the mint transaction to be mined
    console.log("Minted the first NFT to the deployer at:", mintTx.hash);

    // Wait for a few confirmations before verification
    if (network.name !== "hardhat") {
        console.log("Waiting for transactions to confirm...");
        await new Promise((resolve) => setTimeout(resolve, 30000));

        try {
            console.log("Verifying ERC721 token contract...");
            await run("verify:verify", {
                address: nftAddress,
                constructorArguments: [name, symbol, maxSupply],
            });
            console.log("ERC721 token verified successfully!");
        } catch (error) {
            console.error("Verification failed:", error);
        }

        // // Check owner's balance
        // const ownerBalance = await nft.balanceOf(deployer.address); // Fetch the minting balance
        // console.log(`Deployer's balance: ${ethers.formatUnits(ownerBalance, 18)} NFT(s)`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
