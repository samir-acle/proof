var express = require('express')
var router = express.Router()
var NamespaceController = require('./namespace/NamespaceController');

router.use(function actionLog (req : Request, res : Response, next : any) {
  console.log('Req: ', req.url)
  next()
})

router.post('/namespace', NamespaceController.createNamespace);

export default router;
