import {Request, Response} from 'express';

interface Middleware {
    (req : Request, res : Response, next : any): void;
}

export default Middleware;
