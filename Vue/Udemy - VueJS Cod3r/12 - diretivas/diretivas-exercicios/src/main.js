import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Criando diretiva personalisada
// Métodos hooks: métodos do ciclo de vida das diretivas
/*
	1. bind(el, binding, vnode)
		==> chamada apenas uma vez, quando a directiva é interligada pela primeira vez ao elemento. Aí é onde você pode fazer o trabalho de configuração inicial.
		+ bidings: configuraçâo da sua diretiva
		+ vnode: nó virtual (nao mexe)
		+ SO mudaremos o 'el', os outros nao muda
	2. inserted(el, binding, vnode)
		==> chamada quando o elemento for inserido no nó pai (garante a presença no nó pai, mas não necessariamente no documento).

	3. update(el, binding, vnode, oldNode)
		==> chamada após a atualização do VNode que contém o componente, mas possivelmente antes da atualização de seus filhos. O valor da diretiva pode ou não ter mudado, mas você pode evitar atualizações desnecessárias comparando os valores atuais com os antigos (veja abaixo, em argumentos dos gatilhos).
	+ Quando o componente

	4. componentUpdated(el, binding, vnode, oldNode)
	 ==> chamada após a atualização do Vnode que contém o componente, inclusive de seus filhos.

	5. unbind(el, binding, vnode)
	 ==> chamada somente uma vez, quando a diretiva é desvinculada do elemento.
		+ desvincular a diretiva ao elemento

		binding: Um objeto contendo as seguintes propriedades:
	name: O nome da diretiva, sem o prefixo v-.
	value: O valor passado para a diretiva. Por exemplo em v-my-directive="1 + 1", o valor passado seria 2.
	oldValue: O valor anterior, somente disponível em update e componentUpdated. Está presente tanto se o valor foi alterado quanto não alterado.
	expression: A expressão de vinculação como uma String. Por exemplo em v-my-directive="1 + 1", a expressão seria "1 + 1".
	arg: O argumento passado para a diretiva, se houver algum. Por exemplo em v-my-directive:foo, o argumento seria "foo".
	modifiers: Um objeto contendo modificadores, se houver algum. Por exemplo em v-my-directive.foo.bar, o objeto seria { foo: true, bar: true }.

	Exceto el, você deve tratar os outros argumentos como somente leitura e nunca modificá-los.

*/

// Declarado globalmente (v-destaque)
Vue.directive('destaque', {
	bind(el, binding, vnode) {
		// el.style.backgroundColor = 'lightgreen' (cte)
		// el.style.backgroundColor = binding.value

		const aplicarCor = cor => {
			if(binding.arg == 'fundo'){
				el.style.backgroundColor = cor
			} else {
				el.style.color = cor
			}
		}


		let atraso = 0;
		if(binding.modifiers['atrasar']) atraso = 3000; // atrsa sera o tempo de delay até alterar


		const cor1 = binding.value
		const cor2 = 'purple'
		let corAtual = cor1


		setTimeout(() => {
			if(binding.modifiers['alternar']) {
				setInterval(() => {
					corAtual = corAtual === cor1 ? cor2 : cor1
					aplicarCor(corAtual)

				}, 1000)
			} else {
				aplicarCor(binding.value)
			}

		}, 1000)


	}

});

new Vue({
	render: h => h(App),
}).$mount('#app')
