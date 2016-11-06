export class Funcoes {

    constructor(){

    }

     obterCor(numero:number):string{
       let cor:string;

       switch (numero) {
         case 1:
           cor = "prior1";
           break;
        case 2:
           cor = "prior2";
           break;
       case 3:
           cor = "prior3";
           break;
        case 4:
           cor = "prior4";
           break;
        case 5:
           cor = "prior5";
           break;       
         default:
          cor = "dark"
           break;
       }

       return cor;

    }

}


