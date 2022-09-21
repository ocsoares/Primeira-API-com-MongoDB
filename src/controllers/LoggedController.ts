import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { Account } from '../models/Account';

const __dirname = path.resolve();

const dashboardEJS = path.join(__dirname, '/src/views/dashboard.ejs');

export class LoggedController{
    async showAllAccounts(req: Request, res: Response, next: NextFunction){
        const getAllAccounts = await Account.getAccounts();

        console.log('CONTAS:', getAllAccounts);
        res.render(dashboardEJS, { getAllAccounts });

        next();
    }
}