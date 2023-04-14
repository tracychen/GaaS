// import { network } from "hardhat";
import * as fs from "fs";
import contractAddresses from "../contractAddresses.json";
import { task } from "hardhat/config";

task(
  "deploy",
  "Deploys implementation contract",
  async (args: { [key: string]: string }, hre) => {
    await hre.run("compile");

    console.log(`Deploying contract on ${hre.network.name}`);
    const GaaS = await hre.ethers.getContractFactory("GaaS");
    const deployedContract = await GaaS.deploy();

    await deployedContract.deployed();

    console.log(
      `Deployed to ${deployedContract.address} on ${hre.network.name}`
    );

    // Write deployed address to config file
    (contractAddresses as Record<string, string>)[hre.network.name] =
      deployedContract.address;
    fs.writeFile(
      "contractAddresses.json",
      JSON.stringify(contractAddresses, null, 2),
      function writeJSON(err) {
        if (err) return console.log(err);
      }
    );
  }
);
