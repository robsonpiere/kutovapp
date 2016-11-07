# Kutovapp

## Atividade aberta - Tópicos especiais Puc Minas 2016

### Criação de uma aplicação híbrida

O objetivo desta atividade é a criação de uma aplicação híbrida relativamente simples, mas que permita uma primeira oportunidade de construção desse tipo de aplicação. Essa aplicação deverá gerenciar uma simples tabela de dados, mas de tal forma que os dados sejam agrupados por algum critério.

A aplicação escolhida para este semestre é um Gerenciador de Tarefas, isto é, uma aplicação web para gerenciar as tarefas que uma pessoa qualquer deve realizar.

Download do aplicativo: [Android](https://github.com/robsonpiere/kutovapp/raw/master/APLICATIVO_GERADO/android-debug.apk)

Link para API [https://github.com/YitzhakStone/kutovapp-api](https://github.com/YitzhakStone/kutovapp-api) (não é necessário dowload nem execução, pois a mesma está publicada no heroku, segue apenas para conhecimento da estrutura).

página do projeto: [https://robsonpiere.github.io/kutovapp/](https://robsonpiere.github.io/kutovapp/)

COMO RODAR O PROJETO
---------

1. Necessário:

    - Nodejs e npm 
    - Ionic V2 (verificar depêndências)
    - Cordova

2. Após Dowload do código fonte devem ser executados 

    ```javascript
    //instala os módulos necessários
    npm install
    ```

    ```javascript
    //instala os plugins cordova
    ionic state restore --plugins 
    ```
3. Para executar e exportar a aplicação para dispositivo móvel:

    ```javascript
    //adicionar a plataforma
    ionic platform add <plataform> // plataform = android, ios ou Windows

    //Executar no  browser
    ionic serve --lab //funções nativas não funcionam

    //exportar o aplicativo
    ionic build <plataform> // plataform = android, ios ou 

    ```

Alunos do Grupo 10
----------

-  :kissing_heart: Mateus Fernando - [Git hub](https://github.com/mfpinheiro)
-  :sleeping:  Robson Piere - [Git hub](https://github.com/robsonpiere)
-  :neutral_face: Tiago Higino - [Git hub](https://github.com/tiagohigino)
-  :bowtie:  Vinícius Ponciano -[Git hub](https://github.com/viniciusponciano)
-  :angry:  Yitzhak Stone - [Git hub](https://github.com/YitzhakStone)

Belo Horizonte, Puc Minas - 2016

Obs: Debugar o projeto no Windows é muito mais fácil...  :trollface:
