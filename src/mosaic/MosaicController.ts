import * as MosaicService from "./MosaicService";
import * as _ from "lodash";
import { Request, Response } from "express";
import { Mosaic,  } from "nem-library";

exports.createMosaic = (req : Request, res : Response) => {
  const mosaicName = _.get(req, 'body.mosaicName');
  const namespaceName = _.get(req, 'body.namespaceName');

  MosaicService
    .createMosaic(mosaicName, namespaceName)
    .subscribe(
      (x) => res.json(mosaicName),
      (e) => res.status(500).send(e.message),
    );
}

exports.getAllMosaics = (req : Request, res : Response) => {
  const namespaceName : string = _.get(req, 'query.namespaceName') || _.get(req, 'body.namespaceName');
  
  MosaicService
    .getAllMosaics(namespaceName)
    .subscribe(
      mosaics => res.json({mosaics}),
      e => res.status(500).send(e.message),
    );
}

exports.sendMosaic = (req : Request, res : Response) => {
  const namespaceName : string = _.get(req, 'body.namespaceName');
  const mosaicName : string = _.get(req, 'params.mosaicId');
  const recipientAddress : string = _.get(req, 'body.recipientAddress');
  const formattedAddress = recipientAddress.replace(/-/g, '');
  
  MosaicService
    .sendSingleMosaic(namespaceName, mosaicName, formattedAddress, req.body.messageObject)
    .subscribe(
      n => res.json({result: n}),
      e => res.status(500).send(e.message),
    );
}
