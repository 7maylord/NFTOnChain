import { ethers, run, network } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with account: ${deployer.address}`);

    // Deploy ERC721 Token
    const NFT = await ethers.getContractFactory("NFTOnChain");
    const nft = await NFT.deploy();
    await nft.waitForDeployment();
    const nftAddress = await nft.getAddress();
    console.log(`ERC721 token deployed at: ${nftAddress}`);

    // Wait for a few confirmations before verification
    if (network.name !== "hardhat") {
        console.log("Waiting for transactions to confirm...");
        await new Promise((resolve) => setTimeout(resolve, 30000));

        try {
            console.log("Verifying ERC721 token contract...");
            await run("verify:verify", {
                address: nftAddress,
            });
            console.log("ERC721 token verified successfully!");
        } catch (error) {
            console.error("Verification failed:", error);
        }

        // // Check owner's balance
        // const ownerBalance = await token.balanceOf(deployer.address);
        // console.log(`Owner's balance: ${ethers.formatUnits(ownerBalance, 18)} MTK`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
