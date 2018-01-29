import * as express from "express";
import * as NamespaceController from "./namespace/NamespaceController";
import * as MosaicController from "./mosaic/MosaicController";
import * as AccountController from "./account/AccountController";
import {Request, Response} from 'express';
import * as NamespaceService from './namespace/NamespaceService';
import * as _ from "lodash";
import setupMessage from './middleware/setupMessage';
import getDefaultNamespaceIfNotProvided from './middleware/getNamespace';

var router = express.Router()
router.use(function actionLog (req : Request, res : Response, next : any) {
  console.log('Req: ', req.url)
  next()
})

router.post('/namespaces', NamespaceController.createNamespace);
router.get('/namespaces', NamespaceController.getAllNamespaces);

// clean up, make separate routers?
// breakout middleware into own files
// create validator middleware

router.post('/mosaics', getDefaultNamespaceIfNotProvided, MosaicController.createMosaic);
router.get('/mosaics', getDefaultNamespaceIfNotProvided, MosaicController.getAllMosaics)
router.post('/mosaics/:mosaicId', setupMessage, MosaicController.sendMosaic);

router.get('/transactions', AccountController.getAllTransactions);

export default router;
