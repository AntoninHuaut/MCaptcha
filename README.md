# MCaptcha
Une application écrite NodeJS

## Présentation
L'application embarque un bot discord et une application web  
Elle permet de protéger des serveurs Discords par la vérification d'un captcha en utilisant le service [reCAPTCHA](https://www.google.com/recaptcha) de Google  
Pour la faire fonctionner, vous aurez besoin :
* D'un [bot discord](https://discordapp.com/developers/)
* D'une [clé d'api reCAPTCHA](https://www.google.com/recaptcha/admin/)
* D'une base de données MySQL

## Lancer l'application
```shell
$ git clone https://github.com/Manerr/MCaptcha.git && cd MCaptcha/
$ mv config_template.json config.json && nano config.json
$ npm i && npm start
```