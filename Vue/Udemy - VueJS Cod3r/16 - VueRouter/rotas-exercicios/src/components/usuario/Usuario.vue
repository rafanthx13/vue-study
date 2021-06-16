<template>
  <div class="usuario">

    <h2>Usuários</h2>

    <hr>

    <p><strong>Código</strong> {{ id }} </p>
    
    <!-- Nesse componente será aplicado as rotas aninhadas de usuarios que estao em chilren -->
    <router-view></router-view>

    <button sucesso @click="irParaInicio">
      Voltar
    </button>
    
    </div>  
</template>

<script>
export default {

  // Todo componente tem acesso global à $route
  data() {
    return {
      id: this.$route.params.id
    }
  },

  methods: {
    irParaInicio() {
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
      
    }
  },

  watch: {
    // Atualiza o $route quando troca de página numa mesma rota com parametros diferentes
    $route(to, from) {
      this.id = to.params.id
    }
  },

}
</script>

<style>

</style>
