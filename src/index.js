"use strict";
var express = require("express");
var app = express();
var NAMESPACE_RENTAL_SINK = {
    testnet: 'TAMESPACEWH4MKFMBCVFERDPOOP4FK7MTDJEYP35'
};
var NEM = require('nem-library');
var XEM = require("nem-library/dist/src/models/mosaic/XEM").XEM;
// Initialize NEMLibrary for TEST_NET Network
NEM.NEMLibrary.bootstrap(NEM.NetworkTypes.TEST_NET);
var privateKey = '4d62e849fd3e9df43cb2908034c130d8fcbf50f938e74b9026a5f1059255aeaa';
// const multisigAccountPublicKey: string = process.env.MULTISIG_PUBLIC_KEY;
var account = NEM.Account.createWithPrivateKey(privateKey);
// const transferTransaction = TransferTransaction.create(
//   TimeWindow.createWithDeadline(),
//   new Address("TCFFOM-Q2SBX7-7E2FZC-3VX43Z-TRV4ZN-TXTCGW-BM5J"),
//   new XEM(2),
//   EmptyMessage
// );
// const multisigTransaction = MultisigTransaction.create(
//   TimeWindow.createWithDeadline(),
//   transferTransaction,
//   PublicAccount.createWithPublicKey(multisigAccountPublicKey)
// );
// const transactionHttp = new TransactionHttp();
//
// const signedTransaction: SignedTransaction = account.signTransaction(transferTransaction);
//
// transactionHttp.announceTransaction(signedTransaction).subscribe( x => console.log(x));
var accountHttp = new NEM.AccountHttp();
accountHttp.allTransactions(account.address).subscribe(function (t) { return console.log(t); });
// const NAMESPACE_RENTAL_FEE = 100 XEM
app.get('/', function (req, res) { return res.send('Hello World!'); });
// app.post('/transactions', (req, res) => {
//
// });
app.listen(3000, function () { return console.log('Example app listening on port 3000!'); });
//# sourceMappingURL=index.js.map