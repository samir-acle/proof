import * as express from "express";
import * as dotenv from "dotenv";
import {NEMLibrary, NetworkTypes} from "nem-library";
dotenv.config();
NEMLibrary.bootstrap(NetworkTypes.TEST_NET);

import nemRouter from "./nem-router";
const app = express();

app.use(express.json() );
app.use(express.urlencoded({
  extended: true
})); 

app.use('/nem', nemRouter);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
