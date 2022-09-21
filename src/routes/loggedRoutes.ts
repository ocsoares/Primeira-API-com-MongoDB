import { Router, Request, Response, NextFunction } from 'express';
import path from 'path';
import { LoggedController } from '../controllers/LoggedController';

const loggedRoute = Router();

const __dirname = path.resolve();

const dashboardEJS = path.join(__dirname, '/src/views/dashboard.ejs');

const useLoggedController = new LoggedController();

loggedRoute.get('/dashboard', useLoggedController.showAllAccounts, (req: Request, res: Response) => {
    // res.render(dashboardEJS);
})

export default loggedRoute;