import {Request, Response} from 'express';
import Middleware from './middlewareInterface';
import * as _ from 'lodash';
import * as NamespaceService from '../namespace/NamespaceService';

let getDefaultNamespaceIfNotProvided: Middleware;

getDefaultNamespaceIfNotProvided = (req : Request, res : Response, next : any) => {
  const namespaceName = _.get(req, 'body.namespaceName') || _.get(req, 'query.namespaceName')
  if (namespaceName) {
    next();
  } else {
    console.log('getting namespace name')
    
      NamespaceService
        .getDefaultNamespace()
        .subscribe(
          (n) => {
            req.body.namespaceName = n;
            next();
          },
          (e) => res.status(500).send(e.message),
        );
  }
};

export default getDefaultNamespaceIfNotProvided;
