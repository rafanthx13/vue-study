# Testes e Deploy

Não faremos todos os testes, faremos de poucos

## Sumário

+ 00:00 à 21min : Teste uniário de store/Countdown
+ 21:00 à

## Teste

+ store/Countdown
  + Testes Unitários
    + 1. Entender como é que está estruturado seu arquivo e as coisas que vai exportar
    + No caso, getters, mutations e state
    + 2. Para cada uma delas vocÊ vai olhar o que ela faz e pensar em como testar cada unidade
    + 3. Estado
      + Funçâo que retorna objeto. 
      + Entâo tenho que garantir que a criaçâo original seja igual a um harcode
    + 4. Getters
      + Garantir que o getter pegue o mesmo de um hardcode
    + 3. Mutations
      + Garantir que, após a ação de uma mutation, o estado esteja com um valor hard-code

+ pages/index (em 21min)
  + Há duas forma de testar um compnoente vue
    + 1. Testar metodos e propriedades computados
    + 2. Testar o comportamento da página como que se feito pelo  usuário. Vou fazer com que os métodos que o usuário chama, ser chamado, e asism verificar se o comportamenteo após a chamada ocorreu ou nâo
    + Usaremos a versâo 2
    + Vamos criar um arquivo `store/helper` é para que o nosso estado/vuex tenha a configuraçâo montada para o teste

## Vercel 01:17:00

crie o arquivo vercel.json e deixe na raiz
````json
{
	"builds": [
		{
			"src": "nuxt.config.js",
			"use": "@nuxtjs/vercel-builder"
		}
	]
}
````

Cadastre-se no vercel

Baixe o VERCEL CLI `npm i -g vercel`

NO DIRETÓRIO DIGITO

`vercel`

faça o login corretamente. e repsonda como abaixo

````
 > vercel
Vercel CLI 22.0.1
? Set up and deploy “D:\personal-projects\movue-it-nuxt”? [Y/n] y
? Which scope do you want to deploy to? rafanthx13
? Link to existing project? [y/N] n
? What’s your project’s name? my-nuxt-movue-it 
````
OBS: O nome tem que ser único entre todos do mundo

Se quiser subir uma nova verçâo rode `vercel --prod`

## Git Diff

````
 M .gitignore
 M README.md
 M layouts/default.vue
 D movue-it-nuxt-01.rar
 D movue-it-nuxt-02.rar
 D movue-it-nuxt-03.rar
 D movue-it-nuxt-04.rar
 M pages/index.vue
 M store/CountDown/index.ts
?? docs/06-tests-and-deploy.md
?? pages/__snapshots__/
?? pages/index.test.js
?? store/Countdown/index.test.js
?? store/helper.js
?? vercel.json
?? versions/
````
