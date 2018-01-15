import { TimeWindow, ProvisionNamespaceTransaction } from "nem-library";
import {XEM} from "nem-library/dist/src/models/mosaic/XEM";
import { namespace } from "../constants/nem";
import { signAndBroadcastTransaction } from "../TransactionService";
declare let process: any;

const registerNamespace = (namespaceName : string) => {
  let provisionNamespaceTransaction : ProvisionNamespaceTransaction = ProvisionNamespaceTransaction.create(
    TimeWindow.createWithDeadline(),
    namespaceName,
  )

  return signAndBroadcastTransaction(provisionNamespaceTransaction);
};

export {
  registerNamespace
}
