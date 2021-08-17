# 3

**Objetivo**: Vamos criar alguns componentes e deixálos conectados ao nosso Vuex.
+ `components/atoms/CompletedChallenges.vue`
+ `components/atoms/ExperienceBar.vue`
+ `components/molecules/Profile.vue`
+ `layouts/default.vue` : o layout das nossa `/pages`
+ `pages/index.vue` : o corpo da nossa pagina raiz
+ ``

## Template do Vue com TypeScript

``lang=ts``: para ser typescript

Vue.extend : para ver melhor a questao da tipagem do vue

````javascript
<template>
	<div>
		<h1>DEFAULT</h1>
	</div>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({

});
</script>
````

## mapState e mapGetters

Funções auxiliares para chamar getters e o estado.

mapState e mapGetter são usadas em ``computed``

````
import {mapState, mapGetters} from 'vuex'
````
