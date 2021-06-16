<template>
	<v-app>

		<!-- Assim o header vai aparecer em todo o site -->
		<Header></Header> 

		<v-content>
			<v-container>

				<router-view></router-view>

			</v-container>
		</v-content>

	</v-app>
</template>

<script>

import Header from './components/Header'

export default {
	
	components: { Header },

	created () {
		this.$store.dispath('initStocks')
	},

}
</script>

<style>

</style>

