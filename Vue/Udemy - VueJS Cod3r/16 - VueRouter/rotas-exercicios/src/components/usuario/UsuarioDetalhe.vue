<template>
  <div class="usuario-detalhe">

    <h3>Usuário Detalhe</h3>

    <p><strong>Código:</strong> {{ id }}</p>

    <router-link tag="button" primario :to="`/usuario/${id}/editar`"> 
      Editar
    </router-link>

    <!-- Chamdno pelo 'name' -->
    <!-- Passar query a url: nesse caso a url irá para localhost:8080/usuario/2/editar/?completo=true&lingua=pt-->
    <router-link tag="button" primario 
      :to="{ name: 'editarUsuario', params: { id }, query: { completo: true, lingua: 'pt'}, hash: '#rodape' }"
    >
      Editar RE
    </router-link>



  </div>
</template>

<script>
export default {
  props: ['id'],

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

}
</script>

<style>

</style>
