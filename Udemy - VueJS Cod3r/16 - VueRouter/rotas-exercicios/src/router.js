import Vue from 'vue'
import Router from 'vue-router'
import Inicio from './components/Inicio.vue'
import Usuario from './components/usuario/Usuario.vue'

import UsuarioLista from './components/usuario/UsuarioLista2.vue'
// import UsuarioDetalhe from './components/usuario/UsuarioDetalhe.vue'
// import UsuarioEditar from './components/usuario/UsuarioEditar.vue'

import Menu from './components/template/Menu'

// nO BUNDLE ORIGNIAL, FAZ UM RPEFECTH, NAO TEM REPSOSTA,
// AI, ENQUANTO EU NAVEGAR, VAI CORREGAR MESMO ESSES COMPONENTES
// const UsuarioEditar = () => import(/* webpackChunkName: "usuario" */'./components/usuario/UsuarioEditar')

// AGRUPAR COMPONENTES PARA CARREGAR DINAMICAMENTE JUNTOS: 
// FAZEMOS UM COMENTARIO QUE SERÁ INTERPRETADO PELO WEBPACK
// Esse usuario é apenas o nome do chunk, anao precisa indicar em lugar nenhum esse usuraio
const UsuarioEditar = () => import(/* webpackChunkName: "usuario" */'./components/usuario/UsuarioEditar')
const UsuarioDetalhe = () => import(/* webpackChunkName: "usuario" */'./components/usuario/UsuarioDetalhe')

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
