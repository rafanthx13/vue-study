# Udemy - VueJS Cod3r

# Log

+ Autor: Rafael Morais de Assis
+ Data de criação: 01/02/2019
+ TAGS: Desenvolvimento Web, JavaScript, FrameWork Java Scrpit, VueJS

**Fontes e Controle de Versão**

+ "" (Data)

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

## 1. Introdução: Manipulação da DOM

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

É um pouco difícil de entender mesmo. esse tópico está mais ligada a eficiência e uso correto de um recurso do Vue. Há situações em que, se não usá-lo, perderá eficiência, é uma alternativa a usar `methods()`.

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

## 2. Rederizaçâo Condicional e Listas

Lembrete da Sintaxe Reduzida

`v-bind` ==> `:`

`v-on` ==> `@`

### `v-if`

Determina se uma tag será mostrada ou não deacordo com algum atributo do especificado. ELE REMOVE O ELEMNTO DA PÁGINA

O Vue tem a adiçâo de poder usar a diretiva `v-else-if=attr`. Que faz um link com a ateriori

Você também pode usar `v-else` SE E SEOMENTE SE antes da TAG tiver o `v-if`. Tem que se um elemento depois do outro.

Tanto `v-else-if` quanto `v-else` deve está em sequencia para funcionar corretamente.

**OBS**: o `v-if` e similares fazem com que **O ELEMENTO SUMA DO HTML**. Não é um truque de esconder com CSS, é sumir a tag mesmo. No angualr JS tinha diretivas que tirava e outras que não mostrava. Veremos o do vue em `v-show`



````html
<meta charset="UTF-8">
<script src="https://unpkg.com/vue"></script>

<div id="app">
    <p v-if="logado">Usuário Logado: {{ nome }}</p>
    <p v-else-if="anonimo">Navegando como anonimo</p>
    <p v-else>Nenhum usuário logado</p>
    <!-- Botão muda o estado de logado -->
    <button @click="logado = !logado">
        {{ logado ? 'Sair' : 'Entrar' }}</button>
    <input type="checkbox" v-model="anonimo">
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            nome: 'Maria',
            logado: false,
            anonimo: true
        }
    })
</script>
````

`HTML:<template>`: Essa tag nâo é gerada no HTML FInal. Asim, se vocÊ usar o `v-if` no template, quando rederizar, nâo vai mostrar a tag template. Isso não acontece com outras tags.

### `v-show`

NÂO EXCLUI O ELEMETNO DA DOM. Se você tiver um trecho grande que pode ou não ser mostrado, talvez seja boa ideia usar o `v-show`. Pode ser usado para o aparecer e esconder de uma tag for muito constante numa página. Fazer isso é custoso.

Em geral coloca o CSS `style` `display: none.`

Não possuo `v-else`

````html
<div id="app">
    <footer v-show="logado">
        Desenvolvido pra vc!
    </footer>
    <footer v-show="!logado">
            Desenvolvido pra vc que é desconhecido!
    </footer>
</div>

<script>
    new Vue({
        el: '#app',
        data: {logado: false}
    })
</script>
````



### `v-for` **renderizando** listas

Muito parecido com o AngularJS, utilizamos a diretiva `v-for` e apontamos para a listas como:

````html
<div v-for="pessoa in pessoas"> {{ pessoa }}</div>
````

Serve para renderizar Arrays e objetos JS

Para acessar outros elemetnos como index e chave , basta colocalos com argumentos que recebem do Objeto JS como `v-for="(cor, index) in cores"` para um array ou  `v-for="(valor, chave, index) in pessoa"` para um objeto

````html
<meta charset="UTF-8">
<script src="https://unpkg.com/vue"></script>

<div id="app">

    <ul>
        <!-- Podemos pegar o index como segundo elemento. 
            A nomenclatura nâo interresa, 
            saiba que passa na ordem [1.Elmeento, 2.Index] -->
        <li v-for="(cor, i) in cores">{{ i + 1 }} {{ cor }}</li>
    </ul>

    <!-- Usando template nâo gera a tag template -->
    <!-- Para obersar esse recurso do HTML tem que abir F12 no Browser -->
    <!-- Eu poderia usar uma <div> mas aí ela seria gerada também -->
    <hr>
    <template v-for="(cor, i) in cores">
        <h1>{{ cor }}</h1>
        <p>{{ i }}</p>
    </template>
    <hr>

    <!-- Iterando objetos -->
    <ul>
        <li v-for="pessoa in pessoas">
            {{ pessoa.nome }}
            <div v-for="(valor, chave, index) in pessoa">
            [{{index}}] . {{ chave }} = {{ valor }}
            </div>
        </li>
    </ul>
    <hr>

    <!-- Vai rederizar 10 números começando de 1
         útil para reperitr um bloco de HTML n vezes
         Para isso basta usar esse literal -->
    <span v-for="n in 10">{{ n }} </span>
    <hr>

    <!-- Para trabalhar com listas complexas ou que mudam de ordem
         O Vue recomenda dar uma dica para ele para rederização.
            Site: https://br.vuejs.org/v2/guide/list.html#key
        Entâo, use o atributo: ':key="attr"' e aponte para um atributo
        que seja único para cada objeto do JS como msotrado abaixo
     -->
    <ul>
        <li v-for="(cor, i) in cores" :key="cor">
            ({{ i + 1 }}) {{ cor }}
        </li>
    </ul>

</div>

<script>
    new Vue({
        el: '#app',
        data: {
            cores: ['vermelho', 'verde', 'amarelo', 'azul'],
            pessoas: [
                { nome: 'Ana', idade: 26, peso: 59 },
                { nome: 'Guilherme', idade: 22, peso: 89 }
            ]
        }
    })
</script>

<style> h1, p { display: inline; }</style>
````



## 3. Entendendo a fundo a instância `Vue`

[Como funciona a instância `Vue` na DOC](https://br.vuejs.org/v2/guide/instance.html)

As suas Propriedade:

+ el
+ data
  + Quando este dado for modificado, a camada visual irá “re-renderizar”. Deve-se observar que propriedades em `data` são **reativas** somente se já existem desde quando a instância foi criada.
+ computed
+ watch
+ methods

### É  possível criar várias instâncias do `Vue`?

SIM, apesar de não ser muito usado, pode haver momentos que se possa fazer isso.

Costuma-se usar para fazer pequenas coisas num prjeto web, como widgets.

Lembre-se que uma instância nâo consegue acessar nada de outra.

````html
<!-- mult-instancia-vue.html -->
<div id="app1">
    {{ titulo1 }}
    <button @click="alterar">Alterar</button>
</div>

<div id="app2">
    {{ titulo2 }}
    <button @click="alterar">Alterar</button>
</div>

<script>
    new Vue({
        el: '#app1',
        .....
    })

    new Vue({
        el: '#app2',
        .....
        }
    })
</script>

````

### É possível acessar dados do `vuw` externamente com `js?`

SIM.

Mas nâo há muitos cenários em que isso seja útil. Em geral, seria melhor fazer uma unica instancia do `vue`  maior.

Mas cuidadao. Fique mais por acessar os dados do que modificalos. Por que  `Vue` nâo reage bem a alterações que vem de fora.

````html
<div id="app1"> {{ titulo1 }}
    <button @click="alterar">Alterar</button>
</div>

<div id="app2"> {{ titulo2 }}
    <button @click="alterar">Alterar</button>
</div>

<script>
    const vm1 = new Vue({
        el: '#app1',
        data: {titulo1: 'Teste 1' },
        methods: {
            alterar() {vm2.titulo2 += '????'}
        }
    })
    const vm2 = new Vue({
        el: '#app2',
        data: { titulo2: 'Teste 2'},
        methods: {
            alterar() {vm1.titulo1 += '!!!!'}
        }
    })
</script>
````

### Gerencia de dados

O `Vue` instância dados reativos somente na sua inicialização. Sua instanciação `new Vue()` cria um objeto. Se você não define os dados em na sua estrutura interna de `data`, e define por fora com `inst_vue.new_attr` esse `new_attr` nâo terá as propriedade reativas como as de `data`.



### `$el` `$data`

Se você instancia o Vue em uma variável, você pdoe acessála no browser. Inspecionadno, você pode ver seus atributos, todos começando com `$` como o `$el` e `$data`

`$el`

+ Aponta para os dados HTMLem que a instância do `Vue` referencia e vigia.

`$data`

+ Os dados passados na instância

````html
<div id="app">{{ titulo }}
<button @click="alterar">Alterar</button>
</div>
<script>
    const vm = new Vue({
        el: '#app',
        data: {titulo: 'Teste 1'},
        methods: {alterar() {this.titulo += '!'}}
    })
</script>
````

printar `vm.titulo` é o mesmo que fazer `vm.$data.titulo` só que sem passar pelo setter do `Vue`.

`$template`

Você pode guardar um *template* dentro da instância do `Vue`

Além disso, após criar um elemento, você pode atribuir à uma elemento HTML posteriormente

````html

<meta charset="UTF-8">
<script src="https://unpkg.com/vue"></script>

<div id="app"></div>

<script>
    const vm = new Vue({
        // VocÊ pode guardar treco html dentro da instância do Vue que será depois rederizado
        template: `
            <div>
                <h1>{{ aula }}</h1>
                <h2>{{ modulo }}</h2>
                <button @click="alterarAula">Alterar Aula</button>
                <button @click="alterarModulo">Alterar Módulo</button>
            </div>
        `,
        data: {
            aula: 'Aula: Montando Instância Vue',
            modulo: 'Módulo: Instância Vue'
        },
        methods: {
            alterarAula() {
                this.aula += '#'
            },
            alterarModulo() {
                this.modulo += '#'
            }
        }
    })

    vm.$mount('#app') // Vai direcionar o vm para #app
</script>
````

### Ciclo de Vida da Instância do Vue

![](C:\Users\Rafael\Google Drive\Private Studies\VUE\md_images\life-cycle-instance-vue.png)

Cada um desse passos vermelhos com fundo branco são momentos em que você pode fazer alguma coisa se você precisar.

OBS: **Mount** significa montar. É nessa hora que ele chama o HTML.

Execute o código no browser e veja no `console()`. Todos esse métodos são executados por default no ciclo de vida de uma instância do `Vue`. Dependendo da aplicação pode ser útil você saber disso. 

+ Esse métodos são executados nessa ordem
+ Somente os relacionados ao `update` são chamados mais de uma vez. Para cada vez que algo é atualizado
+ Quando se executa `destroy()` o Vue sai de cena e deixa o HTML do último jeito que estava antes de sair.

````html
<meta charset="UTF-8">
<script src="https://unpkg.com/vue"></script>

<div id="app">
    <h1>{{ titulo }}</h1>
    <button @click="titulo += '#'">Alterar Título</button>
    <!-- destroy() é um método já default do Vue -->
    <button @click="$destroy()">Destruir</button>
</div>

<script>
    new Vue({
        el: '#app',
        data: {titulo: 'Ciclo de Vida'},
        /* Está na ordem em que seria executado
           Esses métodos ficam diertamente na estância, e nâo nos métodos
           Os create e mount sâo chamados somente uma vez na inicialização */
        beforeCreate() {
            console.log('Antes de Criar')
        },
        created() {
            console.log('Criado')
        },
        beforeMount() {
            console.log('Antes de Montar (DOM)')
        },
        mounted() {
            console.log('DOM Montada')
        },
        // beforeUpdate e Update sâo chamdaos vários vezes
        beforeUpdate() {
            console.log('Antes de Atualizar')
        },
        updated() {
            console.log('Atualizado')
        },
        // chamadas 1 vez quando executa destroy()
        beforeDestroy() {
            console.log('Antes de destruir')
        },
        destroyed() {
            console.log('Destruido')
        }
    })
</script>
````

## 5. Vue CLI

é necessário ter o `node`

Para ataulizar o node você pode intallar um pacote que faz isso:

https://stackoverflow.com/questions/18412129/how-can-i-update-npm-on-windows

`npm install -g npm-windows-upgrade`

Depois execute

Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force

`npm-windows-upgrade`

Que vai atualizar seu node

Ou o comando

`npm-windows-upgrade -p -v latest`

`npm-windows-upgrade --npm-version latest`

Tem que executatar com administrador no PowerShell

C:\Users\Rafael\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Windows PowerShell

**Iremos agora a fazer em servidor Web**

Vamos deixar de usar o protodolo `file://` para usa o `http://`. Isso nos fornecerá um cenário mais realista e melhor para as requisições AJAX (Asynchronous *JavaScript* and XML).

**O PRÓPRIO VUE CLI já tem um servidor web dentro de si**

Além do esqueleto fornece váriso recurso interresante por `default` e pode ainda extender pondo plugins

Um dos benefício de usar é:

+ autoreload
+ build de desenvolvimento e produçâo
+ organização das pastas
+ Ambiente de Dev e Build configurados
+ Compila componente em um único arquivo
+ pré-processadores (SASS)



**Fluxo do Vue CLI**

![](C:\Users\Rafael\Google Drive\Private Studies\VUE\md_images\visao-vue-cli.png)





Para installar de forma global o criador de projetos

`npm install -g  @vue/cli`

Depois que instalar, o vue estará apto no cmd

**Criando um projeto simples**

`vue create projeto-simples`

e depois selecione a opçâo default

Como meu PC é lento, vai demorar até está tudo concluido, mas deu tudo certo

Como mensagem final terá

````
$ cd projeto-simples
$ npm run serve
````

Entre na pasta e ao executar o `serve` vai subir o servidorweb. Dessa forma será melhor que simplesmente abrir um arquivo pelo browser.

No final mostrara o endereço de acesso:

````
App running at:
  - Local:   http://localhost:8080/
  - Network: http://172.23.17.141:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.

````



**Estrutura das pastas**

Ele intala muitas dependenicias  no `node_modules` para tudo funcionar, entâo o gitignore nao vai lela. para instalar as dependeicas, execute `npm i` no embiente com o `package.json`

````
projeto-simples/
	node_modules/
	public/
		favicon.ico
		index.html
	src/
		assets/
			logo.png
		components/
			HelloWorld.vue
		App.vue
		main.js
	.gitignore
	babel.config.js
	package-lock.json
	package.json
	REAME.md
````

+ `node_modules`: dependências do `node` para excutar tudo. Não é lançada no `git` pois pode ser refeita ao fazer `npm i` pelo `package.json`

+ `public`: Tem o HTML principla da SPA (Single Page Application)

+ `src/` Pasta em que haverá 95% do trabalho

  + `main.js`: importa o Vue. Cria e redereniza sua instância
  + `App.vue` : Arquivo de vue principal que vai importar os váriso componentes da pasta `components`
  + `components/` poussui compontes, arquivos `.vue`

  #### Estrutura do arquivo `.vue`

  Analisando o arquivo `App.vue` vemos que:

  + O arquivo `.vue` é composto das tags `<template>, <script>, <style>` que definem o componente nas partes respectivamente: HTML, JS e CSS

  + Um componten por importar componentes e ser exportado para outros:

    + `import HelloWorld from './components/HelloWorld.vue'`

    + E coloca em :

    + ````
      components: {
          HelloWorld
        }
      ````

    + No `<script>` de `HelloWorld.vue` está:

      + ````vue
        <script>
        export default {
          name: 'HelloWorld',
          props: {
            msg: String
          }
        }
        </script>
        ````

      + 

  + Um componente, para ser exportável presia definir seu nome em `name:`

  ````vue
  <template>
    <div id="app">
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
  </template>
  
  
  <script>
  import HelloWorld from './components/HelloWorld.vue'
  
  export default {
    name: 'app',
    components: {
      HelloWorld
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
  }
  </style>
  ````

  

  ````vue
  <template>
    <div id="app">
      {{ titulo }}
      <button @click="titulo += '#'">Alterar</button>
    </div>
  </template>
  
  <script>
  export default {
    data: function() {
      return {
        titulo: 'Teste Data Usando VueJS'
      }
    }
  }
  </script>
  
  <style>
    #app {
      background-color: chocolate;
      color: white;
    }
  </style>
  ````

  #### `Vue` JavaScript em `serve` ou em `build`

  O JAVASCRIPT GERADO PELO VUE CLI FICA EM `app.js` . ESSE É UM JAVASCRIPT GERADO EM MEMORIA (PARA EFICIENTE EM AMBIENTE DE PRODUÇÂO E FAZER RELOAD). ELE FICA NA MEMORIA POR ISSO NÃO É UM ARQUIVO**

  Quando eu executar o build

  `npm run build`

  Vai gerar a pasta `dist/` E rodar o processo de construção da pasta que será realmente exportada para produção

  #### Gerando o projeto com plugins

  O `GitBash`  nâo é interativo. Se você quiser colocar plugins você terá que selecionar cada um deles. Para entâo abrir uma cmd mais interativa. use o seguinte comando

  `winpty vue.cmd create hello-world`

  `(Press <space> to select, <a> to toggle all, <i> to invert selection)`

  Use as teclas acima para selecionar

  Para vançar `<entert`

  Não tem como voltar, entâo use `CTRL+C`

+ **OBS**: O vue por default vai subir na porta 8080, mas se já estiver sendo usada, ele vai subir o número, para talvez 8081. TOME CUIDADO COM ISSO.

#### plugins

`electron`: deixar a aplicaçâo des

`veutify`: Material Design para o Vue

---

#### Consultando a DOC deste módulo

**Mais sobre `.vue`** e CLI

**O Arquivo ".vue"**

Você pode aprender mais sobre o arquivo ".vue" nesse artigo da documentação oficial: <https://br.vuejs.org/v2/guide/single-file-components.html>

Você pode aprender mais sobre o método  `render()`  nesse outro artigo na documentação oficial: <https://br.vuejs.org/v2/guide/render-function.html>

---

**The CLI**

Aprenda mais sobre o Vue CLI aqui: <https://cli.vuejs.org/>

**Depurando Projetos VueJS**

Duas ferramentas que você pode usar:

1) Ferramenta de Desenvolvimento Vue (<https://github.com/vuejs/vue-devtools>)

2) A ferramenta de Desenvolvedor do Chrome

Quando estiver trabalhando com projetos criados com o CLI , você pode facilmente debugar a sua aplicação abrindo o a **ferramenta de desenvolvimento** (abaixo exemplo no Chrome) abrir a aba **sources**. Você deverá ver a pasta **webpack://** e dentro você encontrará todos os arquivos do projeto (área em destaque vermelha).

Agora é só abrir os arquivos e colocar os **breakpoints** para debugar a sua aplicação em execução.

---

