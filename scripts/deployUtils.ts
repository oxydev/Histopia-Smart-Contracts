const fs = require("fs");

export async function readAddresses(chainID: string) {
  let a = JSON.parse(fs.readFileSync(`deployedAddresses/HistopiaAddresses_${chainID}.json`));
  return a;
}

export async function writeAddresses(chainID: string, HistopiaAddresses: any) {
  let a = fs.readFileSync(`deployedAddresses/HistopiaAddresses_${chainID}.json`);
  fs.writeFileSync(`deployedAddressesOld/HistopiaAddresses_${chainID}.json`, a);

  fs.writeFileSync(`deployedAddresses/HistopiaAddresses_${chainID}.json`, JSON.stringify(HistopiaAddresses));
}
