import { TimeWindow, MosaicDefinition, MosaicDefinitionCreationTransaction, PublicAccount, MosaicId, MosaicProperties, MosaicLevy, MosaicHttp } from "nem-library";
import {XEM} from "nem-library/dist/src/models/mosaic/XEM";
import { signAndBroadcastTransaction } from "../TransactionService";
import * as Rx from 'rxjs';
import * as _ from 'lodash';
import { getAddress, getPublicAccount } from '../utils/AccountUtils';
import * as NamespaceService from "../namespace/NamespaceService";
declare let process: any;

const createMosaic = (mosaicName : string, namespaceName: string) => {
  const mosaicDefinitionTransaction = MosaicDefinitionCreationTransaction.create(
    TimeWindow.createWithDeadline(),
    new MosaicDefinition(
      getPublicAccount(),
      new MosaicId(namespaceName, mosaicName),
      "this is a description",
      new MosaicProperties(0, 100000, false, true),
    )
  )
  
  return signAndBroadcastTransaction(mosaicDefinitionTransaction);
};

const getAllMosaics  = (namespaceName: string) => {
  const mosaicHttp = new MosaicHttp();
  
  return mosaicHttp
    .getAllMosaicsGivenNamespace(namespaceName)
    .map(m => m.map(m => _.get(m, 'id.name')));
}

export {
  createMosaic,
  getAllMosaics,
}
