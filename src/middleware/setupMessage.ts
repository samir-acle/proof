import {Request, Response} from 'express';
import Middleware from './middlewareInterface';
import { getAccount, getPublicAccountFromAddress } from '../utils/AccountUtils';
import * as _ from 'lodash';
import { EmptyMessage, PublicAccount, PlainMessage } from 'nem-library';

let encryptMessageIfNeeded: Middleware;

encryptMessageIfNeeded = (req : Request, res : Response, next : any) => {
  const encrypt : boolean = _.get(req, 'body.encrypt') || false;
  const message : string = _.get(req, 'body.message') || '';

  if (!message) {
    req.body.messageObject = EmptyMessage;
    next();
  }
  
  if (encrypt) {
    getPublicAccountFromAddress(req.body.recipientAddress)
      .subscribe(
        account => {
          const encryptedMessage = getAccount('org').encryptMessage(message, account.publicAccount);     
          req.body.messageObject = encryptedMessage;
          next();   
        },
        e => {
          res.status(500).send("unable to encrypt message");
        })    
  } else {
    req.body.messageObject = PlainMessage.create(message);
    next();
  }
};

export default encryptMessageIfNeeded;
