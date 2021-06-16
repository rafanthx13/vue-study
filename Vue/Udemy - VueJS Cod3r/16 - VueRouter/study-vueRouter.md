# Vue Router

O que faz: PErmite manipular tudo pelo Vue como URL, assim, cada página se torna um componente e se torna SPA (Simple Page Apliation), háverá um único HTML e o Vue renderizarar as coisas.

**CADA PÁGINA SERÁ UM COMPOENNTE, QUE SERÁ REDERIZADO AONDE POR O `<router-view>`**



Como instalar:

`npm i --save vue-router@3.0.2 -E`



## Modos do `vue-router`

### Modo Hash

localhost:8080/#/...

Esse Hash significa que as requisições vão sempre para localhost:8080 e depois vai buscar pela url

**OBS**: Nâo é bomUSAR, É MELHOR O HISTORY

### Modo History

localhost:8080/...

Acessar a URL Perfeitamente COMO PENSARIAMOS

**ELE PRECISA CONFIGURAR UMAS COISA EM PRODUÇÃO, PROCURE NA DOC** 

Se você nâo configurar: O problema que pode daŕ é quando o usuário nâo digita a URL diretamente, aí pode da pau e tem que configurar o serve para passar pelo `index.html`



## `router.js` arquivo de configuração

````javascript
import Vue from 'vue'
import Router from 'vue-router'
import Inicio from './components/Inicio.vue'
import Usuario from './components/usuario/Usuario.vue'

import UsuarioLista from './components/usuario/UsuarioLista2.vue'
// import UsuarioDetalhe from './components/usuario/UsuarioDetalhe.vue'
// import UsuarioEditar from './components/usuario/UsuarioEditar.vue'



Vue.use(Router)

const router = new Router({
  mode: 'history', // 'HASH'
  routes: [
    {
      path: '/',
      // component: Inicio,
      name: 'inicio',
      // POdemos escolher EM QUAL ROUTER VIEW SERÁ REDERIZADO O COMPONENTE
      // EISSO É MUITO COMPLESTO, PRESTE ATENÇÂO
      // Com isso o menu some quando vai para usuário, por que em usuairo, só correga o vue-router nao nomeado
      // aqui, vai corregar no nomeado o inicio, e no segundo, agora via ser carregado, o menu
      // Assim,:
      // ==> QUANDO VOCê CARREGA INICIO, 2 COMPONENTE SAO REDERIZADOS:
        // vue-router Defaut = inicio7
        // vue-router Menu = menu
      // Se vocÊ usar componente, carrega em só um vue-router, o default
      components: {
        default: Inicio,
        menu: Menu
      }
    },
    {
      path: '/usuario/',
      component: Usuario,
      // colocando props = true, todos os parametrosda url será passados
      // como uma prop para o opjeto da URLno caso, o componente usuário
      props: true,
      // filhos: ou seja, vamos elabora os filhos de usuairios (este terá um vue-router internmente para renderizar seus filhos)
      // Com isso, a rota usuario tem mais poder e flexibilidade interna
      children: [
        // path = '' => quando for /usuario/
        { path: '', component: UsuarioLista },
        // path = ':id' => quando for /usuario/:id ou seja, com algum parametro
        { path: ':id', component: UsuarioDetalhe, props: true,
          beforeEnter: (to, from, next) => {
            // INTERCEPTADOR LOCAL DE UMA ROTA
            //console.log('antes da rota -> usuário detalhe')
            next()
          }
        },
        // path = ':id/editar' => quando tiver um paramtero e depois um editar
        { path: ':id/editar', component: UsuarioEditar, props: true,
            // atributo : 'name': permite um nome para referenciar a rota, um apelido usado 
            // bom quando a url for muito grande
            name: 'editarUsuario' },
        ]
    },
      // REDIRECIONAR
    {
      path: '/redirecionar/',
      // Redireciona, sem for para /redirecionar/ vai para /usuar/o
      redirect: '/usuario/'
    },
    // Redirecionar todas as páginas que nâo estejam mapeadas
    {
      path: '*',
      redirect: '/usuario'
    },
    //
    

  ],
  // Serve para rolar a pagina quando tiver um hash, serve para titulos de seçoes onde você poe o atributo id 
  // tem haver com o has, navegar para pontos especificos dentro de uma página
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition) { // se tiver uma posicaçâo salva no chace retorna ela
        return savedPosition
    } else if(to.hash) { // senao, se tiver um hash '#', va até ele
        return { selector: to.hash }
    } else { // se nao nao faz nada
        return { x: 0, y: 0 }
    }
},

})

// INTERCEPTOR Global
// vai sex executada cada vez antes
router.beforeEach((to, from, next) => {
  //console.log('antes das rotas -> global')
  next() // se nao colocar next, nao vai para a pagina e bloquia o vue-router

  // travar usuario em /usuario
  // if(to.path != '/usuario'){
  //   next('/usuario/')
  // }

})

export default router

````

### Redirecionar Páginas

````javascript
 // REDIRECIONAR
{
    path: '/redirecionar/',
    // Redireciona, sem for para /redirecionar/ vai para /usuar/o
    redirect: '/usuario/'
},
// Redirecionar todas as páginas que nâo estejam mapeadas
{
    path: '*',
    redirect: '/usuario'
},
````



### Carregamento *Lazy*

O bunlder/webpack, vai juntar tudo e mandar para o usuário quando carrega a página.

Se você tem muita coisa, você pode fazer com que certo compoientes só seja carerregados quando chamos. Asism reduz a sobrecarga na primeira chamada.

O código a seguir busca fazer isso:

````javascript
// nO BUNDLE ORIGNIAL, FAZ UM RPEFECTH, NAO TEM REPSOSTA,
// AI, ENQUANTO EU NAVEGAR, VAI CORREGAR MESMO ESSES COMPONENTES
// const UsuarioEditar = () => import(/* webpackChunkName: "usuario" */'./components/usuario/UsuarioEditar')

// AGRUPAR COMPONENTES PARA CARREGAR DINAMICAMENTE JUNTOS: 
// FAZEMOS UM COMENTARIO QUE SERÁ INTERPRETADO PELO WEBPACK
// Esse usuario é apenas o nome do chunk, anao precisa indicar em lugar nenhum esse usuraio
const UsuarioEditar = () => import(/* webpackChunkName: "usuario" */'./components/usuario/UsuarioEditar')
const UsuarioDetalhe = () => import(/* webpackChunkName: "usuario" */'./components/usuario/UsuarioDetalhe')
````



## `<router-view>  `

Tag irá renderizar as mudanças de rotas

Colocado em `App.vue`

Você também pode `<router-view>` em utras para acessar os `chidren`. 

Exemplo:

+ Tem a tela de Usuário com abas.
+ Cada aba pode ser um componente que é renderizao
+ Aí, em `usuario.vue` teria um `<router-view>` pra trocar elas pela mudança de rota



## `<router-link>`

Cria um link, como a tag `<a>`

router-link (Considerando o trecho de código a seguir)

+ Vem junto com o vue-router, ele é um link para navegar
  + Atributo: 'tag':
    - Vai tranformar em essa tag na tag passada, no caso aui : li
  + Atributo 'active-class':
    + Ativa para a tag a classe passada por parametro quando se está no link indicado
  + atributo: 'exact':  
    - Detecta quando está ativo quando toda a URL concotra
    - Sem ele, algumas coisa podem ser ativadas de forma bugada (ativa quando nao deveria) 
    - Exemplo:
      * Se for tag="/usuario/edit/1" COM 'exact' aí só vai quando for para o edit de 1
      * Agora se for tag="/usuarios/" todos que começam com isso vai ativar

Exemlpo:

````html
<ul>
    <router-link to="/" tag="li" active-class="active" exact>
        <a>Inicio</a>
    </router-link>
    <router-link to="/usuario" tag="li" active-class="active">
        <a>Usuário</a>
    </router-link>
</ul>
````

## Trocar de rota de form imperativa (`JS`)

```javascript
// passar o path diretamente
      this.$router.push('/')

// passar um objeto com atributos
this.$router.push({
    path: '/'
})

// navegar pelo name (aka, apelido)
this.$router.push({
    name: 'inicio'
})
      
```

## Parametros nas Rotas

### Prametros do vue `params`

Especificando o techo a seguir no `router.js`

```javascript
props: true
```

Qunaod fizer o push d euma rota, você pode passar parametro que serâo lidos como uma prop

você pode passar no `push` no objeto com

```javascript
params: ...
```

### `query` O ? na url

Passando no objeto do push

````javascript
query: { completo: true, lingua: 'pt'}
````

REcebendo no componente

````html
<p><strong>Completo:</strong> {{ $route.query.completo ? 'Sim': 'Não' }}</p>
<p><strong>Língua:</strong> {{ $route.query.lingua }}</p>
````

### `hash` para descer scrollbar para um item especifico

```javascript
hash: '#rodape'
```

No coponente terá algo como

````html
<div id="rodape">
    <h1>Curso Vue</h1>
</div>

````

E para fazer isso, tem que configurar no `router.js` pondo:

```javascript
// Serve para rolar a pagina quando tiver um hash, serve para titulos de seçoes onde você poe o atributo id 
// tem haver com o has, navegar para pontos especificos dentro de uma página
scrollBehavior(to, from, savedPosition) {
    if(savedPosition) { // se tiver uma posicaçâo salva no chace retorna ela
        return savedPosition
    } else if(to.hash) { // senao, se tiver um hash '#', va até ele
        return { selector: to.hash }
    } else { // se nao nao faz nada
        return { x: 0, y: 0 }
    }
```

## Interceptando saida/entrada de rotas

### ENTRADA

**De forma Global**

em `router.js`

````javascript
// INTERCEPTOR Global
// vai sex executada cada vez antes
// tem que ter esse next, a chamada dele que dara a troca de rota
router.beforeEach((to, from, next) => {
  //console.log('antes das rotas -> global')
  next() // se nao colocar next, nao vai para a pagina e bloquia o vue-router

  // travar usuario em /usuario
  // if(to.path != '/usuario'){
  //   next('/usuario/')
  // }

})
````

**Na definição do router**

````javascript
{ path: ':id', component: UsuarioDetalhe, props: true,
    beforeEnter: (to, from, next) => {
        // INTERCEPTADOR LOCAL DE UMA ROTA
        //console.log('antes da rota -> usuário detalhe')
        next()
    }
},
````



**Dentro do compoennte**

````javascript
// INTERCEPTAR DESSE COMPONENTE, é um método de cilco de vida que é injetado quando se usa o VUe-ROuter
// Aqui, a prop id nem mesmo está intanciada, você nâo tem acesso à nada
// INtercepta quando se está cehgando em um componente
beforeRouteEnter(to, from, next) {
    // console.log(this.id) // gera um eroro posi ainda nao foi montado
    //console.log('dentro do componente -> usuário detalhe')
    /*  VOce pode acessar o id apartir do cal back a seguir*/
    // next(vm => {
    //     console.log(vm.id)
    // })
    const autenticado = true
    autenticado ? next() : next(false) // next(false) => qnao eprmite avaçar
}
````

### SAIDA

Feito somente dentro do compoenten que está se saindo

````javascript
 beforeRouteLeave(to, from, next) {
    if(this.confirmou) {
        next()
    } else {
        if(confirm('Tem certeza?')) {
            next()
        } else {
            next(false)
        }
    }
  }
````

