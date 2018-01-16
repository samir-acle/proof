var express = require('express')
var router = express.Router()
var NamespaceController = require('./namespace/NamespaceController');
var MosaicController = require('./mosaic/MosaicController');
import {Request, Response} from 'express';
import * as NamespaceService from './namespace/NamespaceService';
import * as _ from "lodash";

router.use(function actionLog (req : Request, res : Response, next : any) {
  console.log('Req: ', req.url)
  next()
})

router.post('/namespace', NamespaceController.createNamespace);
router.get('/namespace', NamespaceController.getAllNamespaces);

// clean up, make separate routers?
router.use(function getNamespace (req : Request, res : Response, next : any) {
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
})

router.post('/mosaic', MosaicController.createMosaic);
router.get('/mosaic', MosaicController.getAllMosaics);

export default router;
