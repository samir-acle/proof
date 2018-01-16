import { Address, Account, PublicAccount } from "nem-library";

const privateKey: string = process.env.PRIVATE_KEY;
const account = Account.createWithPrivateKey(privateKey);

const getAddress = () => {
  return account.address;
}

const getAccount = () => {
  return account;
}

const getPublicAccount = () => {
  return PublicAccount.createWithPublicKey(account.publicKey);
}

export {
  getAddress,
  getAccount,
  getPublicAccount
}
