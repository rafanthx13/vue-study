# Continuando



## Seçâo 11 - Formulários

### Modificadores de INput

São colocados no `v-model.` são else:

+ `lazy`: A atualizaçâo dos dados só é feita no v-model depois que sai do campo

+ `trim`: Tira espaços brancos nas duas pontas da string. Nâo tira a do meio

+ `number`: Converte o valor para `Number` no JS. Por que mesmo que usando o tipo `type='number'` no input, o que é lido é apenas digitos, o valor é string ainda. Com esse modificador, vai sair um inteiro ou um float. 

  + Mesmo que o valor seja numberico no inicio, quando você digitar, vai ser lido uma string

  ````vue
  <Rotulo nome="E-mail">
  	<input type="text" v-model.lazy.trim="usuario.email">
  </Rotulo>
  <Rotulo nome="Senha">
      <input type="password" v-model="usuario.senha"> 
  </Rotulo>
  <Rotulo nome="Idade">
      <input type="number" v-model.number="usuario.idade">
  </Rotulo>
  ````

  

### Criar componente com input

Como os `fg-input` dos projetos da neppo

É preciso fazer um v-model, e quando gerar alguma mudançar, dentro do compoente, emitir um evento.

O compoennte deve ter a prop `value` e e esse é 'um nome especial para fazer isso'

````vue
<!-- Pai que chama o Input -->
<Rotulo nome="Primeira Reclamação?">
    <Escolha v-model="escolha"/>
</Rotulo>

<!-- O input  -->
<template>
    <div class="escolha"
        @click="$emit('input', !value)"
        :class="{ligado: value, desligado: !ligado}">
        <div v-if="ligado" class="botao"></div>
        <div v-else class="botao"></div>
    </div>
</template>

<script>
export default {

    props: {
        value: {
            type: Boolean,
            default: false
        },
    },

}
````


## Seçâo 12 - Direticas

Vamos criar diretivas personalizadas como 'v-on'

// Criando diretiva personalisada
// Métodos hooks: métodos do ciclo de vida das diretivas
/
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

### Exemplo basico

Vue.directive('destaque', {
	bind(el, binding, vnode) {
	 el.style.backgroundColor = 'lightgreen' 
	}

Assim, se eu usa `v-destaque` o background do elemento vai ficar verde
 
OBS: toda direitva é prefexada com 'v-' primeiro, nao tem como tirar isso

Exemplo masi complexo

````
<template>
	<p v-destaque-local-re:fundo.atrasar.alternar="aObject">6</p>
</template>
<script>
directives: {
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


````


## 13 - FIltros e MIxins

16:56

### Filtro

OBS: lembre-se que  filtro so funciona para STRING
+ v-bind suporta filtro, mas v-model não
+ FIltro é mais ideal para usar em casaos simples, como uma mascara PARA APENAS MSOTRAR, E NAO PARA DIGITAR COMO UMA MÁSCARA

````
<template>
	<div id="app">
		<h1>Filtros and Mixins</h1>
		<p>{{ cpfDoAluno | cpf | inverter }}</p>
		<input type="text" :value="cpfDoAluno | cpf | inverter">
	</div>
</template>

<script>

export default {
	filters: {
		cpf(valor) {
			const arr = valor.split('')
			arr.splice(3, 0, '.')
			arr.splice(7, 0, '.')
			arr.splice(11, 0, '-')
			return arr.join('')
		}
	},
	data() {
		return {
			cpfDoAluno: '60070080090',
		}
	},

}
</script>
````


NAO É MASCARA, É APAENSA UMA FUNÇAO QUE MODIFICA UMA STRING APARA VER


### MIXINS

Siguinifica mistura. VOcê consegue pegar propriedades do vue e poder compartilhála.

SERVE PARA COMPARTILHAR UM MESMO CÓDIGO. O QUE ELE E FAZ É UM MERGE DAS INFORMAÇOES DO COMPONENTE COM O DO SEU MIXIN
+ data(), watch(), computed(), methods, filters() e etcc 

Se no seu `mixin` tiver um método de ciclo de vida, e o importar. o componente que faz isso executa o método tanto do mixini quato o seu proprio método dde cilco de vida

EXMEPLO MIXIN SIMPLS:

````
// FILE Frutas.js
export default {
    data() {
        return {
            fruta: '',
            frutas: ['banana', 'maça', 'laranja']
        }
    },
    methods: {
        add() {
            this.frutas.push(this.fruta)
            this.fruta = ''
        }
    }
}
````

````
// FILE App.vue
<template>
<div>
			<ul>
				<li v-for="fruta in frutas" :key="fruta">{{ fruta }}</li>
			</ul>
			<input type="text" v-model="fruta" @keydown.enter="add">
</template>


import usuarioMixin from './usuarioMixin'
import Frutas from './Frutas.vue'

export default {
	components: { Frutas },
	mixins: [frutasMixin, usuarioMixin],
````

PERCEBA QUE, SE VOCê USA MIXINM ENTAO, EM SEU CÓDIGO VAI TER COISA QUE NÂO VAI ESTÁ DEFINIDA. ISSO PODE FICAR UMOOUCO ESTNAHO MAS ANTENTESE.

VOCê PODE IMPORTAE VÁRIOS MIXINS

DEFININDO UM MIXIN GLOBAL:
+ Raramente vcoÊ vai presicisar dssio, a nao ser para algo de monitoramento mesmo assim é raro.
+ Esse mixini, definido ai, é executado em todosos seus compoentens, cuidado entao pois vai texecutar para todos, se atente para o que está la.

````
// FILE APp.vue
Vue.mixin({
	data() {
		return {
			global: 'Estou no Mixin Global!'
		}
	},
	created() {
		console.log('Created - Mixin Global!')
	}
})
````



		
