import AppMongoClient from "../database/database";

export class Account{
    username: string
    email: string
    password: string
    // confirm_password: string   // NÃO precisa disso, porque NÃO tem sentido Armazenar a Confirmação da Senha, APENAS a Senha !! <<
    type: string

    constructor(username: string, email: string, password: string, type: 'user' | 'admin'){
        this.username = username,
        this.email = email,
        this.password = password,
        this.type = type
    }

    saveInMongo(){
        const accountsCollection = AppMongoClient.db().collection('accounts').insertOne({
            username: this.username,
            email: this.email,
            password: this.password,
            type: this.type 
        })

        return accountsCollection;
    }

        // Usei static nesse caso porque torna esse Método ESTÁTICO, ou seja, NÃO precisa INSTANCIAR novamente a Classe para usar esse Método (que
        // nesse caso, teria que criar uma NOVA Conta para poder usar esse Método) !! << 
    static getAccounts(){                                       // PRECISA transformar em Array, se não da ERRO !!
        const accountsCollection = AppMongoClient.db().collection('accounts').find().toArray();

        return accountsCollection;
    }
}