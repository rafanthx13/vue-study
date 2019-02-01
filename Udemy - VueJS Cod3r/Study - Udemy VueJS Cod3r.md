# Udemy - VueJS Cod3r

# Log

+ Autor: Rafael Morais de Assis
+ Data de criação: 01/02/2019
+ TAGS: Desenvolvimento Web, JavaScript, FrameWork Java Scrpit, VueJS

**Fontes e Controle de Versão**

+ "" (Data)

**Descrição em uma única frase**

+ ""

**Links úteis**

+ [JSSfiddle para codificar com 4 telas pelo Browser](https://jsfiddle.net/)

## Visão Geral do Curso

![](C:\Users\Rafael\Google Drive\Private Studies\VUE\md_images\visaogeral.png)

---

![](C:\Users\Rafael\Google Drive\Private Studies\VUE\md_images\exercicos-propostos.png)



## Short Cut VS Code

`CTRL + D`: Seleciona no arquivo todos os nomes e deixa-os selecionados. Serve para substituir todo de uma só vez.

`SHIFT+ALT+UP|DOWN`: Duplica a linha, para cima ou para baixo



## Emmet

*id*: div#conteudo ==> `<div id="conteudo"></div>`

*class*: div.estilo1 ==> `<div class="estilo1"></div>`

*atributo da tag*: div[src] ==> `<div src=""`

*conteúdo da tag* div{xyz} ==> `<div>xyz</div>`

*tags em sequencia*: div+div+div => `<div></div><div></div><div></div>`

*tags aninhadas* h1>h2 ==> `<h1><h2></h2></h1>`

*priorizar* =>use paranteseis

*multiplicar a linha* ==> div*2 ==> `<div></div><div></div>`

**Exemplo grande**

`div#main>(header>h1{titulo}+nav>ul>li*3>a[href="#"])+(section)`

```html
<div id="main">
	<header>
		<h1>titulo</h1>
		<nav>
			<ul>
				<li><a href="#"></a></li>
				<li><a href="#"></a></li>
				<li><a href="#"></a></li>
			</ul>
		</nav>
	</header>
	<section></section>
</div>
```



## Exemplo inicial

Link: https://jsfiddle.net/smax/c4mcxu7s/

````html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<script>
// Essa instância do Vue vai controlar o id=app do html
new Vue({
	// Nome do elemento ao qual o objeto Vue vai linkar
	el: '#app',
  // área de Dados
  data: {
  	titulo: 'Usando VueJS 2'
  },
  // comporatmento reativo
  methods: {
  	alterarTitulo: function(event) {
    // Esse 'this.' não deveria funcionar, pois esse objeto nâo tem um atributo chamado titulo, tem somente um atributo chamado data.titulo, mas o Vue permite esse atlaho.
    // Esse .target.value é JS puro para tratamento de Eventos
    this.titulo = event.target.value
    }
  }
})
</script>


<div id="app">
  <input type="text" v-on:input='alterarTitulo'>
  <p>{{ titulo }}</p>
</div>
````

## 1. Introdução

### Interpolação do Vue

Aquilo que será interpolado/interpretado  Da mesma forma que o AngularJS, mostra sempre uma string. Lembre-se: HTML só imprime string na tela, ou faz converão   do dado para string. Se não conseguir converter, então não vai  dar muito certo.

Você pode colocar uma expressâo aqui dentro também, como

`<p> {{ idade * 3 }}</p>`

Exemplo

````html
<p>{{ contador }}</p>
<p>{{ 1+2-3 }}</p>
<p>{{ contador > 10 ? 'Maior do que 10' : 'Menor do que 10' }}</p>
````



### Diretivas

**v-bind**

Para fazer a interpolaçâo dentro de uma propriiedade de HTML podemos usar a diretiva  `v-bind` para linkar um dado da Vue com o atributo que queremos

````html
<!-- Em um atributo de uma tag (Que nâo é a string normal)
Não dá pra fazer a interploaçâo dentro das propriedade de 
atributos de uma tag. Aí, devemos usar uma diretiva -->
<!-- <a href="{{ link }}">Google</a> [Não peg ao link] -->
    <a v-bind:href="{{ link }}">Google</a>
    
    <script>
    new Vue({
        el: '#app',
        data: {
            titulo: 'Usando VueJS',
            link: 'http://google.com.br'
        },
        methods: {
            saudacao: function() {
                return this.titulo
            }
        }
    })
</script>
````

Diretivas propriedades personalizada não nativa ao html. Elas são interpretadas pelo framework. Você pode criar ou mesmo usar as que o vue disponibiliza.

Exemplo: `<p cod3er-bind></p>`

**v-once**

**O que faz:** A interpolaçâo só ocorra uma vez, e seu conteudo deixa de ser atualizado caso o seu dado no JS mude

Permite que não haja atualização de um valor interpolado. Como o angularJS, o Vue vai mudar sempre que o dado na Vue muda. Usando `v-once` fará isso só uma vez, depois, você pode mudar o atributo do JS que esse valor do HTMl não vai mudar.

Isso tem a vantagem de evitar que ele fique o tempo todo vigiando essa interpolaçâo pra saber se tem que atualizála ou nâo

**Quando usar**: Quando nâo presisa de forma nenhuma atualizar o conteudo de uma tag.

**v-html**

**O que faz:** Interpreta HTML

Sem isso, quando você faz a interpolaçâo de código HTMl ele nâo o interpreta, ele entende como STRING.

````
<!-- Essa interpolação não vai itnerpretar o html, vai gerar texto bruto -->
    <p>{{ linkHtml }}</p> <!-- '<a href="http://google.com.br"></a>'-->
    <p v-html="linkHtml"></p> <!-- GOOOGLE (LINK)--> <!-- Interpreta html -->
    
    <script>
    new Vue({
        el: '#app',
        data: {
            titulo: 'Usando VueJS',
            link: 'http://google.com.br',
            linkHtml: '<a href="http://google.com.br">GOOGLE</a>'
        },
        })
</script>
````

### Eventos

**v-on**

Diretiva `listenter` serve para receber eventos.

Esse código abaixo mostra um contador, e toda vez que eu `click` o botão, vai acionar uma funçâo e incrementar o contador.

````html
<script src="https://unpkg.com/vue/dist/vue.js"></script>

<div id="app">
    <p>{{ contador }}</p>
    <!-- Se eu colocar 'v-once', aí, não mudaria, e ficara sempre como 0 -->
    <button v-on:click="somar()">Somar 1</button>
</div>

<script>
    new Vue({
        el: '#app',
        data: {contador: 0},
        methods: {somar() {
            this.contador++
        }}
    })
</script>
````

Os enventos smepre retornam um objeto, que pode ou nâo ser útil pra gente.

Nese código abaixo, pegamos a posiçâo do mouse quando o mouse passar pela tag `p`. Perbea que esse evento de `mousemove` retorna um bojeto, que pode ser lido pelo `js` e usado. E que **O OBJETO DE event É PASSADO MESMO VOCÊ NÂO PEDINDO (Aqui apennas tratou o arg)**

**atualizarXY nâo tem argumento, mas o JS o passa por *default***

````html
<script src="https://unpkg.com/vue/dist/vue.js"></script>

<div id="app">
    <p v-on:mousemove="atualizarXY">Mouse: {{ x }} e {{ y }}</p>
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            x: 0,
            y: 0
        },
        methods: {
            atualizarXY(event) {
                this.x = event.clientX
                this.y = event.clientY
            }
        }
    })
</script>
````

**E se minha função passar parâmetro**

Obser a funçâo `somar()`  abaixo, acionada num evento. Nesse caso, O EVENTO NÂO SERÁ PASSADO, POR ESTAMOS PASSADO EXPLICITAMENTE UMA FUNÇÃO

````html
<div id="app">
    <p>{{ contador }}</p>
    <button v-on:click="somar(5)">Somar 1</button>
</div>

<script>
    new Vue({
        el: '#app',
        data: {contador: 0,},
        methods: { somar(passo) {
                this.contador += passo
        }}
    })
</script>
````

**E se eu quiser passar parâmetros e um evento** (`$event`)

O Vue permite passar os dois, mas, apra passar o parametor do evento, temos que usar a special key `$event`. Api, se o objeto gerar um evento, vai colocálo nesse nome

````html
<div id="app">
    <p>{{ contador }}</p>
    <button v-on:click="somar(5, $event)">Somar 1</button>
</div>

<script>
    new Vue({
        el: '#app',
        data: {contador: 0,},
        methods: { somar(passo, ev) {
            	console.log(passo, ev)
                this.contador += passo
        }}
    })
</script>
````

#### Event Handling

Usamos `v-on` para escutar um evento. Mas o Vue permite que agente modifique os eventos também

[Modificadores de Eventos do Vue](https://vuejs.org/v2/guide/events.html#Event-Modifiers)

**Parando um evento**

 Por 'span' está dentro de 'p' que tem o 'v-on' entâo, nele aocntece a mesma coisa.
 Nele, vai ler o evento de '`mousemove`'. Podemos modificar esse evento na `span` para que 
 isso não aconteça. Usaremso Modificadores de eventos.

+ '.stop' interrompe o evento

+ '.prevent' previne que o evento ocorra da forma default

Também há outras forma de fazerisso com JS puro. Como acionar um método que execute isso:

+ event.preventDefault()
+ event.stopPropagation()
  

````html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<div id="app">
    
    <p v-on:mousemove="atualizarXY">
        Mouse: {{ x }} e {{ y }}
        <!-- Por 'span' está dentro de 'p' que tem o 'v-on' entâo, nele aocntece a mesma coisa.
            Nele, vai ler o evento de 'mousemove'. Podemos modificar esse eveto na span apra que 
            isso não aconteça. Usaremso Modificadores de eventos.
            '.stop' interrompe o evento
            '.prevent' previne que o evento ocorra da forma default
            Também há outras forma de fazerisso com JS puro
            Como acionar um método que execute isso:
                event.preventDefault()
                event.stopPropagation()
        -->
        <span v-on:mousemove.stop.prevent="">PARAR AQUI!!!!</span>
    </p>
    <a v-on:click.prevent="naoNavegar" href="http://google.com">Google</a>
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            contador: 0, x: 0, y: 0,
        },
        methods: {
            atualizarXY(event) {
                this.x = event.clientX
                this.y = event.clientY
            },
            naoNavegar(event) {
                console.log('não navegar')
                // event.preventDefault()
            }
            // parar(event) {
            //     event.stopPropagation()
        	// }
        }
    })
</script>
````

#### Key Modifiers

[Modificadores apra eventos de teclas do teclado](https://vuejs.org/v2/guide/events.html#Key-Modifiers)

Detectam quando a pessoa digita algo ou aperta alguma tecla especifica (como `ENTER`)

````html
<!-- Trecho -->
<input type="text" v-on:keyup="exibirAlerta">
<input type="text" v-on:keyup.enter="exibirAlerta">
<input type="text" v-on:keyup.enter.alt="exibirAlerta">

...

<!-- No Vue -->
<script>
    methods:{
        exibirAlerta(event){
        	alert('Estou te alertando')
    	}
    }
</script>
````

### Propriedade Reativas

#### Two Way Data Bind

````html
<script src="https://unpkg.com/vue/dist/vue.js"></script>

<div id="app">
    <p>{{ titulo }}</p>
    <!-- Perceba que, se você muda no 'input' você muda o html mas nâo 
         o do framework. É SOEMNTE um bind de JS ==> HTML  -->
    <input type="text" v-bind:value='titulo'>
    
    <!-- Uma forma de fazer o 2WayDataBind é usando o $event para update o valor -->
    <input type="text" v-bind:value='titulo' v-on:input='titulo = $event.target.value'>

    <!-- Porém a forma mai eficiente é usando 'v-model'
        Isso faz o 2-wayDataBind, haverá uma dupla atualização
        2Way: JS <==> HTML -->
    <input type="text" v-model='titulo'>
</div>

<script>
    new Vue({
        el: '#app',
        data: { titulo: 'Usando VueJS'}
    })
</script>
````

#### Propriedade Computada (Síncrono eficiente) `computed`

[Compted Propriety Oficial BR](https://br.vuejs.org/v2/guide/computed.html)

É um pouco difícil de entender mesmo. esse tópico está mais ligada a eficiência e uso correto de um recurso do Vue. Mas, você pode usa-lo de forma grose eira apesar de que assim ficará ineficiente.

**O que é:** dados computados são cacheados de acordo com suas dependências. Um dado computado somente será reavaliado quando alguma de suas dependências for alterada. Isso significa que enquanto `a depedência` não sofrer alterações, múltiplos acessos ao `computed data`retornarão o último valor calculado sem precisar executar a função novamente, sempre que a tela for rederizada, ou que hoje em dia, seria o tempo todo.

A tradução seria `propriedade calculada` pois ela retorna um valor calculado automaticamente com eficiência de fazer isso somente quando o valor mudar

No exemplo `prop-reactivas-v2.html` podemos ver isso.

**Exemplo sem o `computed Propriedty`**

````html
<script src="https://unpkg.com/vue"></script>

<div id="app">
    <button v-on:click="aumentar">Aumentar</button>
    <button v-on:click="contador2++">Aumentar 2</button>
    <button v-on:click="diminuir">Diminuir</button>
    <p>Contador: {{ contador }} | {{ contador2 }}</p>
    <p>Resultado: {{ resultado() }}</p>
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            contador: 0, contador2: 0},
        methods: {
            aumentar() {this.contador++},
            diminuir() {this.contador--},
            resultado() {
                console.log('método resultado chamado...')
                return this.contador >= 5 ?
                    'Maior ou igual a 5' : 'Menor que 5'
            }
        }
    })
</script>
````

Observe o `contador2`, há dois botões que chama contadores diferente, enquanto que o `resultado()` so depende de um deles. Se você executar e ver o `console.log()` você perceberá que ESSE MÉTODO É EXECUTADO MESMO SABENDO QUE `resultado()` não depende de `contador2`.

**ISSO ACONTECE POR QUE EXPRESSÕES DE TEMPLATE SÂO SEMPRE ATAUALIZADAS A CADA REDERINIZAÇÂO. INDEPENDENTE SE O MODIFICA OU NÂO.**

Então:

> PARA EVITAR DE REDERIZAR TODA HORA, colocamos esses dados com `computed data` , ele possui a propriedade de:
>
> ​                            Atualizar o dado **SOMENTE** quando algum dado que envolve ele mudar.

Exemplo com `computed data`

````html
<script src="https://unpkg.com/vue"></script>

<div id="app">
    <button v-on:click="aumentar">Aumentar</button>
    <button v-on:click="contador2++">Aumentar 2</button>
    <button v-on:click="diminuir">Diminuir</button>
    <p>Contador: {{ contador }} | {{ contador2 }}</p>
    <p>Resultado: {{ resultado }}</p>
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            contador: 0, contador2: 0},
        computed: {
            resultado() {
                console.log('metodo computed resultado chamado...')
                return this.contador >= 5 ? 'Maior ou igual a 5' : 'Menor que 5'
            }
        },
        methods: {
            aumentar() {this.contador++}, diminuir() {this.contador--},
        }
    })
</script>
````

**Descriçâo do caso acima**:

 `computed` é um atributo, por isso nâo usamos `resultado()`

Agora, `resultado` só será chamado quando o `contador ` for modificado. Enquanto isso não acontecer, vai ficar normal

**Conclusão**: Use-o para expressões complexas e em telas em que haja muita rederização. Assim :

​	**Evitará de atualizar sem necessidade, ficando mais eficiente**

**Perguntas **

**PERGUNTA:** toda função que renderizar um valor na tela deve ser uma propriedade computada?

+ **RESPOSTA**: Preferencialmente sim. Pode ser um atributo em data ou uma propriedade computada, mas ambas precisam ter uma lógica síncrona. Quando preciso ter operações assíncronas, usamos um `watch` **para isso.**

**PERGUNTA:**Gostaria de explicação mais afundo de porque o método "resultado" é chamado quando modificado o valor de contador2

+ **RESPOSTA:**A explicação é que o Vue sabe quando uma propriedade computada precisa ser chamada pq ele monitora todas as variáveis que são usadas na propriedade computada, mas esse comportamento não ocorre com um método, por isso o método é chamado sempre.

#### Monitorando Mudanças (Assíncrona) `watch`

**Pra que serve:** Para monitorar a mudança em algum `data` e fazer alguma cosia assíncrona

É uma propriedade do objeto Vue. Ele tem o mesmo nome do atributo de `data` para assim ficar o monitorando. Ele retornar o valor antigo e o valor novo caso ocorra alguma mudança nele

````html
<script src="https://unpkg.com/vue"></script>

<div id="app">
    <button v-on:click="aumentar">Aumentar</button>
    <button v-on:click="contador2++">Aumentar 2</button>
    <button v-on:click="diminuir">Diminuir</button>
    <p>Contador: {{ contador }} | {{ contador2 }}</p>
    <p>Resultado: {{ resultado }}</p>
</div>

<script>
    new Vue({
        el: '#app',
        data: { contador: 0, contador2: 0 },
        computed: { resultado() { return this.contador >= 5 ?
                  'Maior ou igual a 5' : 'Menor que 5' }
        },
        watch: {
            contador(novo, antigo) {
                // Em 2 segundos, vai settar o valor de volta à 0 (Arrow Function)
                setTimeout(() => { this.contador = 0}, 2000)}
        },
        methods: {
            aumentar() {this.contador++}, diminuir() {this.contador--},
        }
    })
</script>
````



### Sintaxe Reduzida

Somente `v-bind` e `v-on` possuem sintaxe reduzida. Lembre-se disso para não achar estranho quando for mexer nele.

`v-bind` ==> `:`

`v-on` ==> `@`

[Abreviação para `v-bind`](https://br.vuejs.org/v2/guide/syntax.html#Abreviacao-para-v-bind)

```html
<!-- sintaxe completa -->
<a v-bind:href="url"> ... </a>

<!-- abreviação -->
<a :href="url"> ... </a>
```

[Abreviação para `v-on`](https://br.vuejs.org/v2/guide/syntax.html#Abreviacao-para-v-on)

```html
<!-- sintaxe completa -->
<a v-on:click="doSomething"> ... </a>

<!-- abreviação -->
<a @click="doSomething"> ... </a>
```

Essas abreviações podem parecer um pouco diferentes do HTML normalmente utilizado, mas os caracteres `:` e `@` são válidos para nomes de atributos em todos os navegadores que o Vue.js suporta. Além disso, não aparecerão no código renderizado. Essa sintaxe é totalmente opcional, mas você provavelmente vai apreciar quando utilizar diretivas frequentemente.

### Desafio 3: `computed, watch e sintaxe`

````html
<script src="https://unpkg.com/vue"></script>

<div id="desafio">
    
    <!-- 1) Exibir em "resultado" o texto 'Valor Diferente' enquanto
        "valor" for diferente de 37 - "valor" é alterado pelos botões.
        Mostrar 'Valor Igual' quando "valor" for igual a 37 -->
        
    <!-- 2) Monitorar as mudança de "resultado" e reiniciar "valor"
        para 0 depois de 5 segundos (dica: setTimeout(..., 5000) -->  
    
    <div>
        <p>Valor atual: {{ valor }}</p>
        <button @click="valor += 5">Somar 5</button>
        <button @click="valor += 1">Somar 1</button>
        <p>{{ resultado }}</p>
    </div>

</div>

<script>
new Vue({
    el: '#desafio',
    data: {valor: 0},
    computed: { 
        resultado() { return this.valor == 37 ?
                    'Valor Igual' : 'Valor Diferente'}
    },
    // Vai vigiar valor quando for alterado, ou seja, só quando resultado for 37
    watch: {
        valor(novo, antigo){
            setTimeout(() => { this.valor = 0 }, 5000) // Arrow Function
        }
    }
});
</script>
````

### Aplicando CSS dinamicamente com Vue

No Exemplo abaixo a primeira `<div>` começa numa cor, e toda vez que é clicada muda de cor. Por que temos `@click` que mudará o dado `aplicarC1` que decide de a classe css `c1` será aplicada ou não no elemento.

````html
<style>
    .c1 {
            background-color: red;
        }
</style>
<div id="app">
    <div class="demo" :class="{c1: aplicarC1}"
        @click="aplicarC1 = !aplicarC1"></div>
    <div class="demo"></div>
    <div class="demo"></div>
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            aplicarC1: false
        }
    })
</script>
````

Da mesmo forma que da pra fazer atribuindo uma `class`, podemos atribuir um `style` diretemante de um `data ` do Vue

````html
<div class="caixas">
    <div class="demo" :style="{backgroundColor: cor}"></div>
    <div class="demo" :style="[meuEstilo, {height: altura}]"></div>
    <div class="demo"></div>
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            cor: 'red', largura: 100, altura: 20
        },
        computed: {
            meuEstilo() { return { 
                backgroundColor: this.cor,   
                width: this.largura + 'px'
                }
            }
        }
    })
</script>
````

> Como nâo gosto muito de css, procure os arquivos `estilos-v.html` ou assista denovo as aulas