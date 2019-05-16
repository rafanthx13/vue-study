<template>
	<div id="app">

		<h1>Rotas com VueRouter</h1>

		<!-- Este é um router-view com nome -->
		<router-view name="menu"></router-view>

		<!-- Usando animated CSS : https://daneden.github.io/animate.css/ -->
		<transition mode="out-in"
			enter-active-class="animated rubberBand"
			leave-active-class="animated rollOut"
		>
			<router-view></router-view>	
		</transition>

	</div>
</template>

<script>


export default {

	
}
</script>

<style>
	#app {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
