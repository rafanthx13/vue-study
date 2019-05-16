<template>
	<div id="app" class="container-fluid">
		<h1>Animações</h1>
		<hr>
		<b-button variant="primary" class="mb-4"
		@click="exibir = !exibir">Monstrar Mensage</b-button>

		<!-- Essa tag determina a animação no Vue -->
		<!-- name="fade" fase será o identificador para as clases do CSS
					+ Assim, as classes do CSS começaraão com 'fade'
					+ Se você nâo usá-se o 'name, seria somente o 'v' na frente
		 -->
		<transition name="fade">
			<b-alert variant="info" show v-if="exibir">{{ msg }}</b-alert>
		</transition>

		<!-- Fade e transição -->
		<!-- type: Serve pra dizer qual atributo de tempo será usado:
					+ Exemplo: Se uma animaçâo for 2s e a transiçâo de 6s ficará estranho
					+ Com type, você pode decidir qual o tempo que o vue vai pegar para manipular a DOM
	 -->
		<transition name="slide" type="animation" appear>
			<b-alert variant="info" show v-show="exibir">{{ msg }}</b-alert>
		</transition>

	</div>
</template>

<script>

export default {

	data(){
		return {
			msg: 'Uma mensagem de informação',
			exibir: false
		}
	}

}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	font-size: 1.5rem;
}

/* Transiçâo para entrar e para sair*/
.fade-enter, .fade-leave-to {
	opacity: 0; /* Começa invisível pois está mostrando */

}

.fade-enter-active, .fade-leave-active {
	transition: opacity 2s;
}

/* Slideing */
@keyframes slide-in {
	from { transform: translateY(40px); }
	to { transform: translateY(0); }
}

@keyframes slide-out {
	from { transform: translateY(0); }
	to { transform: translateY(40px); }
}

.slide-enter-active {
	animation: slide-in 2s ease;
	transition: opacity 2s;
}


</style>
