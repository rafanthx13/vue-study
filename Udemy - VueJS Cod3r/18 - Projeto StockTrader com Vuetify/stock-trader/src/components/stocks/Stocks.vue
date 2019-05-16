<template>

  <!-- Sistema do flexBox:
    + row: indica que vai ficar no sentido de linha
    + wrap: para que, quando passar do tamanho do v-laout, pular a linha
  -->
  <v-layout row wrap>
    <Stock v-for="stock in stocks" :key="stock.id" :stock="stock" />
  </v-layout>

</template>

<script>

import Stock from './Stock'

export default {

  components: {
    Stock,
  },

  // A lista de açôes precarregadas de 'data.js'
  computed: {
    stocks() {
      return this.$store.getters.stocks
    }
  },
}
</script>

<style>

</style>
