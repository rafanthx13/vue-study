<template>
	<div id="app">
		<h1>Diretivas</h1>
		<hr>
		<p v-text="'Usando diretiva v-text'"></p>
		<p v-html="'Usando diretiva <strong> v-html </strong>'"></p>
		<hr>
		<p v-destaque="'yellow'">1</p>
		<p v-destaque="color">2</p>
		<p v-destaque:fundo="color">3</p>
		<p v-destaque:fundo.atrasar.alternar="color">4</p>
		<p v-destaque:fundo.atrasar.alternar="color">4</p>
		<hr>
		<p>LOCAL</p>
		<p v-destaque-local:fundo="color">3</p>
		<p v-destaque:fundo.atrasar.alternar="color">4</p>
		<hr>
		<p v-destaque-local-re:fundo.atrasar.alternar="aObject">6</p>
	</div>
</template>

<script>

// 14:47

// formato da direitva
// exemplo: diretivva 'teste'
// v-teste:arg.mod1.mod2.mo3="values"
//ar: só pode pasasr um apos o ':""'
export default {

	directives: {
		'destaque-local' : {
			bind(el, binding, vnode) {
				let atraso = 0;
				if(binding.modifiers['atrasar']) // usamos os modificadores para atrasar
					atraso = 3000;
				setTimeout( () => {
					if(binding.arg == 'fundo'){
						el.style.backgroundColor = binding.value
					} else {
						el.style.color = binding.value
					}

				}, atraso)
			}
		},
		'destaque-local-re' : {
			bind(el, binding, vnode) {
				let aplicarCor = cor => {
					if(binding.arg == 'fundo'){
						el.style.backgroundColor = cor
					} else {
						el.style.color = cor
					}
				}

				let atraso = 0;
				if(binding.modifiers['atrasar']) atraso = binding.value.atraso; // atrsa sera o tempo de delay até alterar


				const cor1 = binding.value.cor1
				const cor2 = binding.value.cor2
				let corAtual = cor1


				setTimeout(() => {
					if(binding.modifiers['alternar']) {
						setInterval(() => {
							corAtual = corAtual === cor1 ? cor2 : cor1
							aplicarCor(corAtual)

						}, binding.value.intervalo)
					} else {
						aplicarCor(binding.value.cor1)
					}

				}, binding.value.atraso)
			}
		},
	},

	data() {
		return {
			color: 'green',
			aObject: {
				cor1: 'yellow',
				cor2: 'red',
				atrsado: 2000,
				intervalo: 200
			}
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
	font-size: 2.5rem;
}
</style>
