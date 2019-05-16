<template>
  <div class="usuario-editar">

    <h3>Usuário Editar</h3>

    <p><strong>Código</strong> {{ id }}  / {{ this.$route.params.id }} </p>

    <!-- Pegando parametro que vinheram na wuey do vue-router -->

    <p><strong>Completo:</strong> {{ $route.query.completo ? 'Sim': 'Não' }}</p>
    <p><strong>Língua:</strong> {{ $route.query.lingua }}</p>

    <button primario @click="confirmou = true">Confimar</button>

    <div id="rodape">
      <h1>Curso Vue</h1>
    </div>

  </div>
</template>

<script>

export default {

  props: ['id'],

  data() {
    return {
      confirmou: false,
    }
  },

  // Interceptando a saida de um componente
  // voce pode garantir que saia da pagina somente no momento certo
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



}

</script>

<style>

#roda{
  margin-top: 1000px;
}

</style>
