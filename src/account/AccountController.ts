import * as AccountService from "./AccountService"
import * as _ from "lodash";
import { Request, Response } from "express";

const getAllTransactions = (req : Request, res : Response) => {
  AccountService
    .getAllTransactions()
    .subscribe(
      (transactions) => {
        res.json({transactions})
      },
      e => res.status(500).send(e.message),
    );
}

export {
  getAllTransactions,
}
