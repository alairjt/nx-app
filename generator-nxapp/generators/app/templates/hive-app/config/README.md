# PagamentoFornecedorWeb

##### Version
1.0.0

## Dependências

Instalar as seguintes dependências:

* **[NodeJs]**
* **[Git]**
* **[NPM]**
* **[GRUNT]**
* **[BOWER]**

#### Configuração das Dependências:

#####**[Git]**

Configurar proxy:
* Após instalado o git, abrir o arquivo **HOME/.gitconfig** e adicionar os dados de proxy conforme o código a seguir:

```bash
[user]
	name = seu.user
	email = seu.email@email.com
[https]
	proxy = user:pass@proxy.nexxera.com:3128
[http]
	proxy = user:pass@proxy.nexxera.com:3128
```

#####**[NPM]**

Configurar proxy:
 * crie um arquivo **.npmrc** em na sua pasta de usuario.
 
```json
proxy=http://user:pass@proxy.nexxera.com:3128/
https-proxy=https://user:pass@proxy.nexxera.com:3128
strict-ssl = false
registry = http://registry.npmjs.org

```

#####**[GRUNT]**

Instalação:
```sh
npm install -g grunt
npm install -g grunt-client
```
#####**[BOWER]**
Instalação:
```sh
npm install -g bower
```
Configurar proxy:
  * Crie um arquivo **.bowerrc** na sua pasta de usuario ou no projeto em **config** ou em **%HOME%/AppData/Roaming/npm**
```json
{
	"registry": "http://bower.herokuapp.com",
	"proxy":"http://user:pass@proxy.nexxera.com:3128",
	"https-proxy":"http://user:pass@proxy.nexxera.com:3128",
	"directory": "library"
}
```

#####**[Artifactory]**
Configuração e proxy:

* Criar arquivo user-config.json na pasta %USER%/.grunt com as informações a seguir:
```json
{
	"artifactory": {
            "username": "seu.user",
            "password": "pass",
			"url": "http://artifactory.nexxera.com:8081",
			"sufixo": "SNAPSHOT",
			"repository": {
				"publish" : "libs-js-snapshot-local",
				"snapshot": "libs-js-snapshot-local",
				"release" : "libs-js-release-local"
			}
	}
}
```
######OBS:
 * o valor **sufix**o representa um nome apos o nome real do artefato. O default será SNAPSHOT para que quando publicado no artifactory ele fique no formato **nome-do-artefato-x.x.x-SNAPSHOT.zip**
 * Em **repository.publish** o valor **"libs-js-snapshot-local"** é para os repos de snapshot podendo ser trocado para **"libs-js-release-local"** que é o repositorio de publicação de bibliotecas.
 * No caso de usar **"libs-js-release-local"** tenha em mente que alterações feitas no compoenente a ser publicado poderá sobrescrever o componente caso já exista versão publicada.
 
## Inicialização do Projeto

* clonar do repositorio do git
```sh
 git clone flnrepo004prd.nexxera.com:/home/repos/git/web/PagamentoFornecedorWeb
```
* executar o arquivo config/grunt_install.bat (windows) ou config/grunt_install.sh (linux)

#### Tasks do Grunt
A seguir algumas outras tasks do projeto:
```sh
## Baixa as dependencias do projeto.
 grunt start
## Gera a distribuição local
 grunt dist-zip
## Gera a distribuição e zipa (utilizada pelo Jenkins)
 grunt dist-zip
## Executa os testes
grunt test
 ```

## Incrementando o projeto
-
#### Inclusão de nova dependencia de terceiro

Para inclusão de nova biblioteca de terceiro siga os passos a seguir:

* Abrir o arquivo **config/bower.json**
* Em "dependencies" incluir a nova biblioteca conforme o exemplo a seguir:

```json
"dependencies": {,
"angular-1.2.25": "angular#1.2.25",
...
"lib-dos-terceiros-que-estao-descendo-a-ladeira-2.1.6": "lib-dos-terceiros-que-estao-descendo-a-ladeira#2.1.6"
}
```

* Siga o formato definido conforme exemplo:

```json
"nomelib-x.x.x": "nomelib#x.x.x"
```

* a primeira parte "nomelib-x.x.x" é o nome da pasta onde a lib será inserida é obrigatorio colocar a versão da biblioteca no formato -x.x.x
* a segunda parte "nomelib#x.x.x" é o nome do componente no bower e a versão a ser utilizada.

** Ao baixar as libs via bower geralmente ele puxa todo o projeto. Arquivos que não são necessários podem vir. Para remover esses arquivos a propiedade "dependenciesIgnore" resolve parte do problema.**

```json
"dependenciesIgnore": {
        "angular-1.2.25": ["**/!(angular)*"],
        "lib-dos-terceiros-que-estao-descendo-a-ladeira-2.1.6": ["**/!(dist)"]
        "when": ["docs", "test", "*.!(js)", ".*"]
    },
```

* Neste exemplo estamos retirando todos os arquivos que não estão dentro da pasta dist.


### Inclusão de nova dependencia da nexxera

Para a inclusão de nova lib da Nexxera, siga os passos a seguir:

* abra o arquivo config/Gruntile.js
* Caso a dependencia seja SNAPSHOT, insira na task artifactory:snapshot conforme o exemplo a seguir:
```js
artifactory: {
  options: {
    url: '<%= userConfig.artifactory.url %>',
   },
   snapshot: {
     options: {
       repository: '<%= userConfig.artifactory.repository.snapshot %>',
        fetch: [
         {id: 'com.nexxera.js:nexxeraComponents:zip:0.0.1-SNAPSHOT', path: '<%= pkg.path.garbage %>'}
         // NOVA TASK
         {id: 'com.nexxera.js:nova_lib:zip:0.0.1-SNAPSHOT', path: '<%= pkg.path.garbage %>'}
         // FIM Nova TASK
         ]
        }
       },
       ...
},
```
* Caso seja uma lib já versionada, faça o mesmo procedimento mas em artifactory:release

[Bower]:http://bower.io/search/
[Artifactory]:http://artifactory.nexxera.com/artifactory/webapp/home.html?0
[NPM]:https://nodejs.org/
[Git]: http://git-scm.com/
[Grunt]:http://gruntjs.com/
[NodeJs]:https://nodejs.org/
