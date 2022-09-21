import { Request, Response, NextFunction } from 'express'
import path from 'path';
import { Account } from '../models/Account';

const __dirname = path.resolve();
const registerLoginEJS = path.join(__dirname, '/src/views/register-login.ejs');

export class RegisterLoginController{
    async registerOrLogin(req: Request, res: Response, next: NextFunction){

        const { 
            registerUsername,
            registerEmail,
            registerPassword,
            registerConfirmPassword
         } = req.body

        const {
            loginEmail,
            loginPassword
        } = req.body

        if (registerUsername && registerEmail && registerPassword && registerConfirmPassword) {
            if (typeof (registerUsername) !== 'string' || typeof (registerEmail) !== 'string' || typeof (registerPassword) !== 'string' ||
                typeof (registerConfirmPassword) !== 'string') {
                req.flash('errorFlash', 'Formato dos dados inválidos !');
                return res.redirect('/account');
            }

            if(registerPassword !== registerConfirmPassword){
                req.flash('errorFlash', 'As senhas não coincidem !');
                return res.redirect('/account');
            }
            
            try {
                const createAccount = new Account(registerUsername, registerEmail, registerPassword, 'user');

                createAccount.saveInMongo();

                req.flash('successFlash', 'Conta criada com sucesso !');
                return res.redirect('/account');
            }
            catch (error) {
                console.log(error);
                req.flash('errorFlash', 'Não foi possível criar sua conta !');
                return res.redirect('/account');
            }
        }

        else if(loginEmail && loginPassword){

                // Cookie assinado com o Segredo passado no Cookie Parser (app.ts) !!
                //  OBS: Colocar secure true no DEPLOY !! <<
            res.cookie('session_auth', 'JWT', {signed: true});

                // Pega o Cookie SEM a Assinatura !! <<
            const { session_auth } = req.signedCookies;

            req.flash('successFlash', 'Logado com sucesso !');
            return res.redirect('/account');
        }
        
        else{
            req.flash('errorFlash', 'Dados inválidos !');
            return res.render(registerLoginEJS);
        }

        // next();
    }
}