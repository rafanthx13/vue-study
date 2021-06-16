<template>
  <nav class="menu">
    <!-- Ele cria um Link que navega. Cria uma tag a para ser um link -->
    <!-- router-link:
      + Vem junto com o vue-router, ele é um link para navegar
      + Atributo: 'tag':
        - Vai tranformar em essa tag na tag passada, no caso aui : li
      + Atributo 'active-class':
        - Ativa para a tag a classe passada por parametro quando se está no link indicado
      + atributo: 'exact':  
        - Detecta quando está ativo quando toda a URL concotra
        - Sem ele, algumas coisa podem ser ativadas de forma bugada (ativa quando nao deveria) 
        - Exemplo:
          * Se for tag="/usuario/edit/1" COM 'exact' aí só vai quando for para o edit de 1
          * Agora se for tag="/usuarios/" todos que começam com isso vai ativar
        - 
     -->
    <ul>
      <router-link to="/" tag="li" active-class="active" exact>
        <a>Inicio</a>
      </router-link>
      <router-link to="/usuario" tag="li" active-class="active">
        <a>Usuário</a>
      </router-link>
    </ul>


  </nav>
</template>

<script>

export default {

}

</script>

<style>

</style>
