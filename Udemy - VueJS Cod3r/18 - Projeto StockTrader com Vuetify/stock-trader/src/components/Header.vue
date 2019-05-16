<template>
  <v-toolbar app>

    <v-toolbar-title class="headline text-uppercase mr-4">
      <span>Stock</span>
      <span class="font-weight-light">Trader</span>
    </v-toolbar-title>

    <!-- com o 'to' ele já vai entender como um routerVue -->
    <v-toolbar-items>
      <v-btn flat to="/"></v-btn>
      <v-btn flat to="/portifolio"></v-btn>
      <v-btn flat to="/stocks"></v-btn>
    </v-toolbar-items>

    <!-- Cria espaçamento entre dois componentes -->
    <v-spacer></v-spacer>

    <v-toolbar-items>

        <v-btn flat @click="endDay">Finalizar Dia</v-btn>

        <v-menu offset-y>
            <v-btn flat slot="activator">Salvar & Carregar</v-btn>
            <v-list>
                <v-list-tile @click="saveData">
                    <v-list-tile-title>Salvar Dados</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="loadDataLocal">
                    <v-list-tile-title>Carregar Dados</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>

        <v-layout align-center>
            <span class="text-uppercase grey--text text--darken-2">
                Saldo: {{ funds | currency }}
            </span>
        </v-layout>

    </v-toolbar-items>

  </v-toolbar>
</template>

<script>
export default {

}
</script>

<style>

</style>
