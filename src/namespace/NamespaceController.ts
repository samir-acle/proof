import * as NamespaceService from "./NamespaceService"
import * as _ from "lodash";
import { Request, Response } from "express";

exports.createNamespace = (req : Request, res : Response) => {
  const namespaceName = _.get(req, 'body.name');

  NamespaceService
    .registerNamespace(namespaceName)
    .subscribe(
      (x) => res.json(namespaceName),
      (e) => res.status(500).send(e.message),
    );
}
