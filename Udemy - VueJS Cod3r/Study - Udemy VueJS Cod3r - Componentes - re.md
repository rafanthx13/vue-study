# Udemy - VueJS Cod3r

# Log

- Autor: Rafael Morais de Assis
- Data de criação: 01/02/2019
- TAGS: Desenvolvimento Web, JavaScript, FrameWork Java Scrpit, VueJS

## 6. Introdução à Componentes



Links apra Estudar COmponentes

+ https://br.vuejs.org/v2/guide/components.html
+ https://br.vuejs.org/v2/guide/components-registration.html

#### Forma antiga de fazer

Uma  `Vue instance` só pega o primeiro que encontrar. Por isso, para reutiliar algo, tem que ser em componentes

````html
<meta charset="UTF-8">
<script src="https://unpkg.com/vue"></script>

<div id="app">
    <!-- Um compontente pode ser reautilizável o HTML é CaseSenitive -->
    <CONTADOR></CONTADOR>
    <Contador></Contador>
    <contadoR></contadoR>
</div>

<script>
    // Registro Global
    Vue.component('contador', {
        // O template de um compoennte deve ter somente um único elemento raiz
        template: `
            <div>
                <span>{{ contador }}</span>
                <button @click="contador++">+</button>
                <button @click="contador--">-</button>
            </div>
        `,
        // Como componente, data presisa ser um função
        // Tem que ser assim para que cada compoente tenha seu scopo isoladp
        data() {
            return { 
                contador: 0
            }
        }
    })

    new Vue({
        el: '#app',
    })
</script>
````

## Cria um projeto com CLI

`vue create componente-intro`

`winpty vue.cmd create hello-world`

+ Selecione o template default
+ isso demora
+ Depois, para rodar, etnre na pasta e exeucete `npm run serve`

## Criando um Componente `.vue`

No VS Code, você pode usar `scaffold` para gerar o template básico do componente que é o código a seguir.

````vue
<template>
  
</template>

<script>
export default {

}
</script>

<style>

</style>
````

### Exemplo de Componente

````vue
<template>

<div class="contador">
    <span> {{ contador }} </span>
    <button @click="adicionar">+</button>
    <button @click="subtrair">-</button>
</div>
    
</template>

<script>
export default {
    data() {
        return {
            contador: 0
        }
    },
    methods: {
        adicionar() {
            this.contador++
        },
        subtrair() {
            this.contador--
        }
    }
}
</script><style></style>
````



#### Atenção a certos pontos do componente

+ `data`

  + Data deve retornar um objeto com os tributos que você quer, diferente do que fizemos antes.

  + ````
    data() {
        return {
            attr: value
        }
    }
    ````

+ `template`

  + A parte do HTML, a tag `<template>` deve ter somente uma tag raíz para toda a aplicação. 
  + Em geral, usamos uma div com um `id` ou uma `class` para expecificála





## `main.js` 

Importa o Vue e seus componentes

Em `Vue.component('app-contador', Contador)` estou adicionando o componente Contador à aplicação, para ser usado globalmente usando a `tag` `<app-contador>` para chamá-lo

````javascript
import Vue from 'vue'
import App from './App.vue'
import Contadores from './Contadores.vue'

Vue.config.productionTip = false

// Registro do componente 'Contadores' de forma global
// Assim, posos usá-lo em App.vue ou em qualuqer lugar
Vue.component('app-contadores', Contadores)

new Vue({
  render: h => h(App),
}).$mount('#app')

````



### Registro local e global de componentes

Vamos fazer um exemplo: o componente `Contadores`  importará e usará `Contador`



````vue
<!-- Contador.vue -->
<template>

<div class="contador">
    <span> {{ contador }} </span>
    <button @click="adicionar">+</button>
    <button @click="subtrair">-</button>
</div>
    
</template>

<script>
export default {
    data() {
        return {contador: 0}
    },
    methods: {
        adicionar() {this.contador++},
        subtrair() {this.contador--}
    }
}
</script>
````

````vue
<!-- Contadores.vue -->
<template>
    <div class="contadores">
        <app-contador v-for="c in 5" :key="c"/>
    </div>
</template>

<script>
// Registro de forma local Contador
import Contador from './Contador.vue'

export default {
    /* Registrando o componente 'Contador' de forma local 
     	nesse componente */
    
    /* app-contador está entre aspas posi nâo é nome correto
     para um atributo, mas deixando entre apsa o JS aceita
     pois referencia como obj['app-contador'] ao invez
     de 'obj.app-contador'  que ficaria inávlido */
    components: {
        'app-contador': Contador
    }
}
</script><style></style>
````

Perceba que para fazer esse importação fizemos

````vue
<template>
	<!-- Formas de usar -->
	<name_tag></name_tag>
	<name_tag/>
</template>
<script>
    
import Component_name from 'vue_file.vue'


export default {
    components: {
        'name_tag': Component_name
    }
}
</script>
````

**Forma de Registro lobal**

Feita em `main.js` para poder ser usado em qualquer lugar 

````javascript
// main.js
import Vue from 'vue'
import App from './App.vue'
import Contadores from './Contadores.vue'

// Registro Global, posso usar em qualquer lugar de App
// Sem presisar importa, só dár <app-contadores>
Vue.component('app-contadores', Contadores)

new Vue({
  render: h => h(App),
}).$mount('#app')

````

### Propriedade CSS com `scoped`

Cada componente tem css. Para que o css não espalhe colocamos o atributo `scoped ` na tag `stylus`

````vue
<stylus scoped></stylus>
````

O CSS do componente com `scoped` só alcançara o filho (componentes importados e usados em seu próprio template) MAS NÃO NOS FILHOS DOS FILHOS.

**POR TRÁS DOS PANOS**

Quando você faz uso desse `scoped` no html gerado no browser sairá um atributo personalizado como `<stylus="data-v-fa563">`

## Como organizar seus componentes vue

Em geral, em `src/` criamos uma pasta chamada `components/ ` e dentro dela passtas como : 

+ `template`: parte fixa da aplicação como `footer` e `toolbar`
+ `widgets`: partes boninithas
+ `views`: Uma tela inteira da aplicaçâo

## Regra para nomes dos componentes

 O HTML tem o CamielCase. Por conta disso você pode fazer o seguinte:

+ Sendo a `ref` do componente com `appFooter` você pode chamar no HTMLcomo `<app-footer>` pois ele vai reconhecer que a letra maiúscula simboliza o `-`

+ Se preocupe mais com letras maiúscula e minúscula

+ Ou se preferir não coloque uma referencia alguma. Deixe o nome exato e o useo exatamente como registrou como o exemplo abaixo

  + ````vue
    <template>
    	<Menu/>
    </template>
    
    <script>
    	import Menu ..
        export defualt{
            components: {Menu}
        }
    </script>
    
    
    ````

````vue
<template>
	
	<app-footer></app-footer>

</template>
<script>
    export default{
        components: {
            appFooter: Footer
        }
        
    }
</script>
````

## 7. Comunicação entre os componentes

Iniciar projeto

+ `npm i`

+ `npm run serve`

  

Para um componente pai passar para um filho, é necessário definir a propriedade, atraves de `props` no filho.



````html
// No PAI
<template>
<div class="componentes">
	<app-usuario-info v-bind:nome='nome'/>
	<app-usuario-editar />
</div>
</template>

<script>
export default {
data() {
        return {
            'nome': 'Pedro Silva'
        }
    },
}
</script>

// NO FILHO


<template>
    <div class="componente">
        <h2>As Informações de Usuário</h2>
        <p>Vários detalhes...</p>
        <p>Nome do Usuário: {{ nome }}</p>
    </div>
</template>

<script>
export default {

    // O que eu espero receber
    props: [
        'nome'
    ]
    
}
</script>
````

Quando você passa uma prop, você pode acessála como uma variável interna do vues, ocmo um dado de um `data()`.

Lembre-se: Você não presisa usa o `this` no template, mas tem que usar o `this.` na parte do Vue.JS.

Props **não** podem ter o memso nome que outro dado

###### Validando as props

Você pode definir um tipo para a prop. Isso auxilia na hora de debigar e fica mais claro o código

```html
<script>
// props podem ter um valor default, para o caso de nada for passado. Isos é util pra saber se algo foi ou nâo passado
    // a propriedade da prop: 'requirred' informa que vai acusar erro se nâo for passado a prop

props: {
        nome: {
            type: [String, Array],
            //require: true
            default: 'Silva'
        }
    }
</script>
```

###### Do Filho para o pai : Opção 1 : atraves de captura de eventos usando `$emit`

Além do Vuex, vocÊ pdoe passar informaçâo do filho para o pai atraves de: o pai capturar eventos do filho.

Atraves do `$emit` você emite um evento, e o pai, que já estará configurado apra capturálo, responde.

No exmeplo abaixo, eu fiz para atuzliar o `nome` para o que veio do evento, ou seja `this.nom` que é pedro. Mas ao invez disso eu posso:

+ No filho, passar um objeto, passando  assim mais informaçâo
+ No pai chamar uma funçâo específica

```html
<template>
<app-usuario-info 
    v-bind:nome='nome'
    @nomeMudou=" nome = $event"
/>
</template>

// FIlho
<template>
<button @clik="reiniciarNome">Reiniciar Nome</button>
</template>

<script>
methods: {
        reiniciarNome() {
            this.nome = 'Pedro';
            this.$emit('nomeMudou', this.nome);
        }
    }
</script>
```

###### Do Filho para o pai : Opção 2 : O pai passa uma função para o filho e esse a executa

A ideia é o pai passar uma função para o filho e esse a executar, mas **a execuçâo é no contexto do pai** 

````html
// PAI

<app-usuario-info 
    v-bind:nome='nome'
	:reiniciarFn="reiniciarNoome"
/>

<script>
methos: {
    reiniciarNome() {
        this.nome = 'Rafael';
    }
}
</script>
// FILHO

<button @click="reiniciarFn">Reiniciar nome (callback)</button>

<script>
props: {
        nome: {
            type: [String, Array],
            //require: true
            default: 'Silva'
        },
        reiniciarFn : {
            type: Function
        }
    },
</script>
````

##### Como comunicar com irmao: um outro filho de meu pai

Consiste em fazer uma comunicaçâo com o pai e esse mudar a prop que pertecem ao outro filho. Pois direito nâo tem como fazer



##### Comounicações umpouco mais complexas com barramento de eventos

No mercado, a solução apra comunicaçao mais complesxas e masi longas na árvore de componente é o VUEX. Poderem, para pp menores podemos usar algo mais simples: um *event_bus*.

Iremos criar um arquiv `barramento.js` que terá uma intancia do vue e nele centralizado o acesso a emiçôes e audiçâo de eventos para todo o progrrma.

Mandar mensagnes é atraves de eventos, executando o `$emit`

Escutar mensagesn é atraves de usar o `$on``no **created()** , no início



```javascript
// barramento.js : Aqui centralizamos e encapsulamos os acessos

import Vue from 'vue'

export default new Vue({
    methods: {
        setUsuarioSeleciondo(usuario) {
            this.$emit('usuarioSelecionado', usuario)
        },
        onUsuarioSelecionado(callback) {
            this.$on('usuarioSelecionado', callback)
        }
    }
})
```

````vue
<!-- UsuarioDetalhe.vue -->
<template>
    <div class="usuario-detalhe">
        <h2 v-if="!usuario">Usuário não selecionado!</h2>
        <div v-else>
            <h2>ID: {{ usuario.id }}</h2>
            <h2>Nome: {{ usuario.nome }}</h2>
            <h2>Idade: {{ usuario.idade }}</h2>
        </div>
    </div>
</template>

<script>
import barramento from '@/barramento'

export default {
    data() {
        return {
            usuario: null
        }
    },
    // Aqui estará escutando (listening), pois é this.$on('usuarioSelecionado', callback)
    created() {
        barramento.onUsuarioSelecionado(usuario => {
            this.usuario = usuario
        })
    }
}
</script>
````

````vue
<!-- UsuarioLista.vue -->
<template>
    <div class="usuario-lista">
        <table>
            <thead>
                <tr>
                    <th>#ID</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id"
                    @click="setUsuarioSelecionado(usuario)">
                    <td>{{ usuario.id }}</td>
                    <td>{{ usuario.nome }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import barramento from '@/barramento'

export default {
    props: { usuarios: Array },
    methods: {
        setUsuarioSelecionado(usuario) {
            barramento.setUsuarioSeleciondo(usuario)
            this.usuarios.pop()
        }
    }
}
</script>
````

## 8. Componentes avançados

Seçâo 9: Uso avançado de Componentes

### SLOT

+ Passar informação de forma dinmaica html para ser exibido dentro do compoenten filho
+ Isso economisa o uso de propriedades a toda hora

###### Como Passar elementos dentro do corpo de um componente

Como passar corpo HTML para dentro de outro compoente atraves de *slot*. Coloo a tag slot no filho, e quanto o pai passar algo de HTML no corpo do componente filho. Essas taags vão para a área de slot do filho

Atraves de `slot`

````vue
<!-- PAI -->
<Citacao>
            <p>{{ numero }} {{ indice }}</p>
            <p>{{ citacoes[indice].texto }}</p>
</Citacao>

<!-- FILHO -->
<template>
    <div class="citacao">
        <slot> <!-- O conteudo vai entrar aki --> </slot>
    </div>
</template>

````

O estilo do conteudo do slot pode ser **modificando tanto no filho como no pai**.

Cuidado que pode haver conflito no css por causa disso, já que os dois conseguem modificar o counteudo do slot.



##### Usando SLot nomeado

Passando nomeado, o slot filho só mostrará aquilo que for corretamente encoixado pelo `name`

`````vue
<!-- PAI -->

<Citacao>
    <h1 slot="autor"> {{ citacoes[indice].autor }}</h1>    
    <p slot="texto"> {{ citacoes[indice].texto }}</p>
    <h6 slot="fonte"> {{ citacoes[indice].fonte }}</h6>
</Citacao>

<!-- FILHO -->

<template>
    <div class="citacao">
        <slot></slot>
        <slot name="autor"></slot>
        <slot name="texto"></slot>
        <slot name="fonte"></slot>
    </div>
</template>
`````

Mesmo assim, você pode usar `<slot></slot>` sem `name` com os que tem `name`. Esse é o slot default, e tudo que nâo for nomeado no pai cai nele.

Lembre-se de definir a ordem. É aplicado nessa dd

### dCodmpoenente dinâmico

ddUsando a tag `<component>` com `:is="vddariavel"` a partir o valor de `variavel`, eu posso escolher qual compoennte exibir dos que eu importeidd

````vue
<-- O componene te que será eexibido aqui será o do valor da variavel 'compontne' -->
<component :is="componente"></component>


<script>
import Citacoes from './components/Citacoes'
import Sobre from './components/Sobre'

export default {
	components: { Citacoes, Sobre },
	data() {
		return {
			componente: 'Citacoes' 
            // O valor da strins devine qual compoente importado usar 
            // Entre > c'CItacoes' e 'SObre"
		}
	}
}
</script>
````



Um problema: Quando você cria, se ele for trocado, ele será destruido (`destroyed()`) (perde o seu estdao e se colocado de novo vai iniciar do zero).

Para resolver isso, coloque o `<componetne>` entre as tags`<keep-alive></keep-alive>` 

Você usa ele para que o `<componente>` nâo seja destruido, asism mentem seu estado.

Emvez de ser destruido, ele será `activate()`, `deactivated()`. Esse sâo metodos do ciclo de vida que aparecem quando você usar componentes DInmâmicos `comocreated?()` e `mounted() 

OUtro Exemplo:

````vue
<!--  App.vue -->
<template>
	<div id="app">

		<span>
			<button @click="showComponent = 'Vermelho'" 
                    class="vermelho">Carregar Componente Vermelho</button>
			<button @click="showComponent = 'Verde'" 
                    class="verde">Carregar Componente Verde</button>
			<button @click="showComponent = 'Azul'" 
                    class="azul">Carregar Componente Azul</button>
		</span>

		<!-- Aproveitei o proprio nome da variavel para fazer o Componente Dinamico e o Slot -->
		<component :is="showComponent">
			<span slot="conteudo">
                Conteúdo do Componente <strong>{{ showComponent }}</strong>
    		</span>
		</component>

	</div>
</template>

<script>

import Vermelho from './components/Vermelho.vue'
import Verde from './components/Verde.vue'
import Azul from './components/Azul.vue'

export default {
	name: 'app',
	components: { Vermelho, Verde, Azul },
	data() {
		return {
			showComponent: ''
		}
	}
}
</script>

<!--  COmpoentnes Internos.vue -->

<template>
    <div class="caixa azul">
        <slot name="conteudo" />
    </div>
</template>

<script>
export default {

}
</script>


````



