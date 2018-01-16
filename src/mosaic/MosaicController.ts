import * as MosaicService from "./MosaicService";
import * as _ from "lodash";
import { Request, Response } from "express";
import { Mosaic,  } from "nem-library";
import { getAddress } from '../utils/AccountUtils';

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
