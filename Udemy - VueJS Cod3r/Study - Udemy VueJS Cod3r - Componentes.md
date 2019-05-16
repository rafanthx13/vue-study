# Udemy - VueJS Cod3r

# Log

- Autor: Rafael Morais de Assis
- Data de criação: 01/02/2019
- TAGS: Desenvolvimento Web, JavaScript, FrameWork Java Scrpit, VueJS

## 6. Introdução à Componentes



Links apra Estudar OCmponentes

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

