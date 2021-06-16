# animacoes-exercicios

## Project setup
```
npm install
```

Compiles and hot-reloads for development
```
npm run serve
```

Compiles and minifies for production
```
npm run build
```

Run your tests
```
npm run test
```

Lints and fixes files
```
npm run lint
```

Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## Transiçâo do CSS com `<transition>` FADE : sumir e aparecer um objeto

Vue disponibiliza um componente encapsulador (wrapper) chamado transition , permitindo que você adicione transição de entrada/saída para qualquer elemento ou componente dentro do seguinte contexto:

Renderização condicional (usando v-if)
Exibição condicional (usando v-show)
Componentes dinâmicos
Componentes de nós de raiz
Aqui está um exemplo destes em ação:

````
<template>
	<div id="demo">
	  <button v-on:click="show = !show">
	    Alternar
	  </button>
	  <transition name="fade">
	    <p v-if="show">olá</p>
	  </transition>
	</div>
</template>

<script>
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
</script>

<stylus>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
</stylus>
````

**Etapas do transition**

Entrando:
`-enter`: Objeto nao existe
`-enter-active`: Objetvo vai passar a exitir
`-enter-to`: Objeto existe totalmente

Saindo:
`-leave`: Objeto está inteiro
`-leave-active`: OBjeto está sumindo
`-leave-to`: Objeto SUMIU

Exemplo de código: ao clicar num botâo, aparece uma barra de forma enta e bonita, ou seja, de forma gradual usando a `opacity`.
````
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



</style>

````
## Transiçâo do CSS com `<transition>` SLIDE : mover um objeto


