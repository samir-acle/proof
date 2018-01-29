import { AccountHttp, Transaction, Account, AccountInfoWithMetaData, TransferTransaction, Message } from 'nem-library';
import { getAddress } from '../utils/AccountUtils'

const accountHttp = new AccountHttp();

const getAllTransactions = () => {
  return accountHttp
    .incomingTransactions(getAddress('user'))
    .map((ts: TransferTransaction[]): Message[] => {
        return ts.map(t => t.message);
    });
};

export {
  getAllTransactions,
}
