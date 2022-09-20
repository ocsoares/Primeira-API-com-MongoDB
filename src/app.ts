import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectFlash from 'connect-flash';
import bodyParser from 'body-parser';
import cors from 'cors';

// Mudei de ideia, fazer uma Aplicação WEB mesmo !!

// Na pasta Helpers, colocar Códigos que Auxiliam os Controllers (exemplo: Verificar se um Usuário pode Acessar a Rota) !! <<

const __dirname = path.resolve();


    // Daqui pra baixo colocar tudo no Inicializador do Banco de Dados !!
const server = express();

server.set('view engine', 'ejs');

server.use(cookieParser(process.env.COOKIE_SECRET));

server.use(connectFlash());

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(bodyParser.text({ type: 'text/json' }));

server.use(cors());
server.use(express.static(__dirname + '/src/views'));
server.use(express.static(__dirname + '/src/public'));
server.use(express.static(__dirname + '/dist'));

server.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.errorFlash = req.flash('errorFlash');
    res.locals.successFlash = req.flash('successFlash');

    next();
})