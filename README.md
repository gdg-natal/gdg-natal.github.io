# GDG Natal

## Adicionando sua info

Para adicionar sua info basta adicionar algumas linhas de código no arquivo _config.yml
segue um exemplo do que deve ser adicionado na seção team.

```
- name: Henri Cavalcante
    photo: https://avatars0.githubusercontent.com/u/2352034?v=3&s=460
    desc: A Full-stack developer, DevOps and other things that are necessary for the project. In my spare time, a drone pilot. #GetItDone
    facebook: http://fb.me/henricavalcante
    github: http://github.com/henricavalcante
    plus: https://plus.google.com/u/0/+HenriMichelCavalcante/
```
Lembre-se sempre de respeitar a identação.

## Build

Para que o site funcione offline em sua máquina é necessário possuir o [Jekyll](https://jekyllrb.com/) e para compilar os arquivos JavaScript, CSS e imagens é necessário o [NodeJS](https://nodejs.org/).

```
$ git clone https://github.com/gdg-natal/gdg-natal.github.io.git
$ cd gdg-natal.github.io.git
$ sudo npm install -g grunt-cli
$ npm install
$ grunt
$ jekyll serve
```
Lembre-se que sempre que um build é iniciado as alterações feitas na pasta resource serão perdidas, ou seja, as alterações sempre devem ser feitas nos arquivos da pasta src.
