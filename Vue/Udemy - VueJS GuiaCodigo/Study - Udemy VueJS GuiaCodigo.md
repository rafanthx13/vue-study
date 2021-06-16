# Udemy - Introduçâo ao VueJS (GuiaCódigo)



## Default Stand

+ Link: https://www.udemy.com/introducao-ao-vue-js-2/

## 1. O que é O Vue

+ Foi pensado para se integrar com outros `libs` existentes. 
+ Capaz de fazer SPA (SinglePageApplication)
+ Melhor que o React e Angular no ponto de aprendizagem. Para aprender o Vue você só presisa de HTML, CSS, JS. Mas para os outros frameworks você presisa aprender respectivamente JSX e TypeScript respectivamente.

#### Semehana com outras libs



#### Comparação com outros `frameWorks`

Link: https://br.vuejs.org/v2/guide/comparison.html

+ Aprendizagem, não precisa aprender outras tecnologias
+ mais fácil de implementar lógica
+ Tem um melhor controle de renderização
+ É tão rápido quanto o angular e react apesar de ser complicado medir isso.
+ Em relação ao projeto em produção, o Vue é bme mais leve

## Diretivas

````html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Introdução ao Vue JS</title>
    <script src="https://unpkg.com/vue"></script>
</head>
<body>

    <div id="app">
        <!-- {} => Interpolação no HTML-->
        {{ msg }}
        <!-- v-bind => interpolar atributo de tag  -->
        <p v-bind:title="titulo">Teste com titulo</p>
        <!-- v-if => Mostrando ou não um elemetno: v-if (remove o HTML) -->
        <p v-if="condicao">Teste com IF</p>
        <!-- v-for => laço de repetição e iteração  -->
        <p v-for="registor in registros">
            {{ registor.titulo}}
        </p>
        <!-- v-else => Somente pode ser usado -->
        <!-- v-on => Reagir a eventos executando uma funçâo de 'methods' -->
        <button v-if="cliclou" v-on:click="usuarioClicou">salvar</button>
        <button v-else v-on:click="usuarioClicou">aguarde...</button>
        <!-- v-model => faz ligação de duas vias entre a variável 
             Modifica tanto o próprio campo quatno na instância do Vue -->
        <input type="text" v-model="usuario.nome">
    </div>

    <script type="text/javascript">

        var app = new Vue({
            el:"#app",
            data:{
                msg:'Iniciando com Vue JS',
                titulo: "Teste com V-bind",
                condicao: true,
                registros: [
                    {titulo: 'registro1'},
                    {titulo: 'registro2'},
                    {titulo: 'registro3'},
                    {titulo: 'registro4'},
                    {titulo: 'registro5'}
                ],
                cliclou: true,
                usuario: {nome:""}
            },
            methods: {
                usuarioClicou: function(){
                    this.cliclou = !this.cliclou
                }
            }
        });

    </script>

</body>
</html>


````

## Componentes

+ A ideia deles é de reaproveitar código
+ Um compoennte tem seu conteudo HTML em 'template'
    - E ele é colocado na tag de seu nome
+ `props`
       - É o atributo titulo. Perceba que com issio eu consigo passar argumetnos ao meu compoentne dentro da tag e por meio da `props`, usalo internamente.
       - Dentro desse template pode fazer interpolaçâo com os dados dos atributos da tag HTML. Asism, eu possa passar qualquer coisa pelo attr da tag que entrará no compoentne. Como uma parâmentro de função.

**Descrição do código:** em `gui-tabela` criamos um componetne que exibe uma tabela, passando para ele em seus atributos os `titulos` (no caso as colunas) e os `registros` (as linhas). Com `v-bind` ele virão da App  `Vue`



````html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Introdução ao Vue JS</title>
    <script src="https://unpkg.com/vue"></script>
</head>
<body>

    <div id="app">

        <gui-titulo v-bind:titulo="meuTitulo"></gui-titulo>
        
        <input type="text" v-model="meuTitulo">

        <gui-tabela v-bind:titulos="['TIULO', 'DESC', 'LINK']"
                    v-bind:registros="registros"></gui-tabela>
       
    </div>

    <script type="text/javascript">

        /* Componentes
        + A ideia deles é de reaproveitar código
        + Um compoennte tem seu conteudo HTML em 'template'
            - E ele é colcoado na tag de seu nome
        + props
            - É o atributo titulo. Perceba que com issio eu consegio passar argumetnos
                ao meu compoentne dentro da tag e por meio da props, usalo internamente.
            - Asism, eu possa passar qualquer coisa pelo attr da tag
        */
        
        Vue.component('gui-titulo', {
            props: ['titulo'],
            template: `<h2>{{ titulo }}</h2>`
        });

        // Outro exemplo de componente dinâmico
        Vue.component('gui-tabela', {
            props: ['titulos', 'registros'],
            template: `
            <table style="width: 100%">
                <thead>
                    <tr>
                        <th v-for="titulo in titulos">{{titulo}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="regist in registros">
                        <td v-for="item in regist">{{item}}</td>
                    </tr>
                </tbody>
            </table>`
        });



        var app = new Vue({
            el:"#app",
            data: {
                meuTitulo: "Esse é o meu Título",
                registros: [
                    {titulo: "Título1", desc: 'desc1', link: 'l1'},
                    {titulo: "Título2", desc: 'desc2', link: 'l2'},
                    {titulo: "Título3", desc: 'desc3', link: 'l3'},
                ]
            },
            methods: {
                usuarioClicou: function(){
                    this.cliclou = !this.cliclou
                }
            }
        });

    </script>

</body>
</html>
````

## `v-once` e `v-html`

##### `v-once`

+ Depois de renrizar uma primiera vez, nâo vai mudar o valor. Isso evita fazer um bind a toda hora.

##### `v-html`

+ Permite convetert a string em 'comando interpretado' de HTML.
+ Sem isso, imprime um conteudod e HTML (tags) como String

````html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Introdução ao Vue JS</title>
    <script src="https://unpkg.com/vue"></script>
</head>
<body>

    <div id="app">

        <gui-titulo v-bind:titulo="meuTitulo"></gui-titulo>
        
        <input type="text" v-model="meuTitulo">

        <!-- Depois de rederizado, nâo permite mais mudar -->
        <p v-once>{{ titulo }}</p>

        <!-- Renderizar HMTL -->
        <p v-html="html_text">{{html_text}}</p>
   
    </div>

    <script type="text/javascript">
        
        Vue.component('gui-titulo', {
            props: ['titulo'],
            template: `<h2>{{ titulo }}</h2>`
        });

        var app = new Vue({
            el:"#app",
            data: {
                meuTitulo: "Esse é o meu Título",
                html_text: '<a href="#">Esse é um link</a>'
            },
            methods: {
                usuarioClicou: function(){
                    this.cliclou = !this.cliclou
                }
            }
        });
</script></body></html>
````

## Filtros

Sâo muito fáceis de ser colocado. É um atributo da inatância do `Vue` como `data`. 

````javascript
filters: {
                TrataValor: function(valor) {
                    return ('R$ ' + (valor).toFixed(2)).replace('.',',')
                }
}
````

Depois, para usálo é da memsa forma que o AngularJS. Usando PIPE

````html
<p>{{ 23.983475235 | TrataValor }}</p>
````
Código Completo

````html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Introdução ao Vue JS</title>
    <script src="https://unpkg.com/vue"></script>
</head>
<body>

    <div id="app">

        <gui-titulo v-bind:titulo="meuTitulo"></gui-titulo>
        
        <input type="text" v-model="meuTitulo">

        <p>{{ 23.983475235 | TrataValor }}</p>
        
    </div>

    <script type="text/javascript">
        
        Vue.component('gui-titulo', {
            props: ['titulo'],
            template: `<h2>{{ titulo }}</h2>`
        });

        var app = new Vue({
            el:"#app",
            data: {
                meuTitulo: "Esse é o meu Título",
                html_text: '<a href="#">Esse é um link</a>'
            },       
            filters: {
                TrataValor: function(valor) {
                    return ('R$ ' + (valor).toFixed(2)).replace('.',',')
                }
            }
        });

</script></body></html>
````

## Métodos Computado `computed`

O VueJS monitora tudo que pode ser mudado. Cada vez em que há a renderizaçâo de um item ele atualiza tudo. Por fazer com tudo, ele acaba tendo um mal desempenho (algo que relamente ocorria com o AngularJS).

Com o método `computed` você faz com que vigie somente aquilo que pode mudar somente quando mudar. Assim vai ser mais eficiente.

O exmeplo dado no curso. Para calcular uma somatória na abertura de uma página, no `methods` executou 102 evzes enquanto que no computed somente uma.

cada vez que vocÊ interagia com algo `model` o calculo era refeito mais 100 vezes, enquatno que o `computed` não, só faria denovo se os dados relamente muda-sem.

Então, analisando a situaçâo, voc~e guanha bastante desmpenho em usar `computed`.

O exemplo abaixo mostra isso. `contaMetodo` e `contaComputada` contam quantas vezes executa esse metodos (`index-v-computed.html`) e mostram a diferença de 100 ==> 1

**Dica de quando usar `computed` ou `methods`** : Se a ação que você é executada na inicializaçâo da página, entâo use `computed`. `methods` é bom reagir a ações do usuário.

````html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Introdução ao Vue JS</title>
    <script src="https://unpkg.com/vue"></script>
</head>
<body>

    <div id="app">
        <gui-titulo v-bind:titulo="meuTitulo"></gui-titulo>
        
        <input type="text" v-model="meuTitulo"> 
        <!-- mudar aqui faz executr +100 metodo-->

        <ul>
            <li v-for="registro in registros">
                {{ registro.titulo }} - {{ registro.desc }} -  {{ registro.link }} - 
                {{ registro.valor | TrataValor }}
            </li>
        </ul>
        <p>Total: (Método) {{ totalValorMetodo() | TrataValor}} </p>
        <p>Total: (Computado) {{ totalValorComputado | TrataValor}} </p>
        <p>contaMetodo: {{ contaMetodo }}</p> <!-- Na abertura: exec 102 vezes -->
        <p>contaComputado: {{ contaComputado }}</p> <!-- Na abertura: exec 1 vez -->
    </div>

    <script type="text/javascript">
        
        Vue.component('gui-titulo', {
            props: ['titulo'],
            template: `<h2>{{ titulo }}</h2>`
        });

        var app = new Vue({
            el:"#app",
            data: {
                meuTitulo: "Esse é o meu Título",
                registros: [
                    {titulo: "Título1", desc: 'desc1', link: 'l1', valor: 12.54363463},
                    {titulo: "Título2", desc: 'desc2', link: 'l2', valor: 10.43262},
                    {titulo: "Título3", desc: 'desc3', link: 'l3', valor: 32.52353},
                ],
                contaMetodo: 0,
                contaComputado: 0
            },       
            filters: {
                TrataValor: function(valor) {
                    return ('R$ ' + (valor).toFixed(2)).replace('.',',')
                }
            },
            // Se mostra ineficiente para renderizar 
            methods: {
                totalValorMetodo: function(){
                    this.contaMetodo++;
                    let total = 0;
                    for(item of this.registros){ total += item.valor;}
                    return total;
                }
            },
            // Eficiente para renderizar 
            computed: {
                totalValorComputado: function(){
                    this.contaComputado++;
                    let total = 0;
                    for(item of this.registros){total += item.valor;}
                    return total;
                }
            }
        });
</script></body></html>
````

## Observadores `watch`

**Ele vigia mudanças**. Quando elas acontecerem ele reagirá. Você coloca o elemento de `data` que você quer monitora em  `watch`. Devem ter o mesmo nome.

Recebe por `default` (valor_novo, valor_antigo).

Neste exemplo: Nome está sendo *monitorada*. Cada vez que mudar, acrescentará o contador

````html
<!DOCTYPE html><html>
<head>
    <meta charset="utf-8">
    <title>Introdução ao Vue JS</title>
    <script src="https://unpkg.com/vue"></script>
</head>
<body>

    <div id="app">
        <gui-titulo v-bind:titulo="meuTitulo"></gui-titulo>
        <input type="text" v-model="meuTitulo">
        <p><input type="text" v-model="nome" placeholder="Nome"></p>
        <p>Alterações {{ contaAleteracoes }}</p>
    </div>

    <script type="text/javascript">
        
        Vue.component('gui-titulo', {
            props: ['titulo'],
            template: `<h2>{{ titulo }}</h2>`
        });

        var app = new Vue({
            el:"#app",
            data: {
                meuTitulo: "Esse é o meu Título",
                contaMetodo: 0,
                contaComputado: 0,
                nome: '', // !!!!!!!!!!!!
                contaAleteracoes: 0 // Vai contar cada vez que mudar
            },       
            // Observadores - Vai ficar vendo se uma variável
            // Tem o mesmo nome de quem eu quero viagiar
            // Recebe por default (valor_novo, valor_antigo)
            watch: {
                nome: function(valor){
                    this.contaAleteracoes++;
                    this.nome = valor.toUpperCase();
                }
            }
        });
</script></body></html>
````

## Manipulando Formulários

Modificações de `v-model`

+ `v-model.lazy`: Faz com que atualize o `data` no Vue somente quando sair do campo. útil para ferramentas de busca, para que não execute a busca a cada palavra digitada
+ `v-model.number`: Converter o campo em número. Sem isso, um campo que deveria receber um número para fazer operações aritméticas vai ser `String` e não o fará.

No exemplo abaixo há vários campos com formulários ligados por `v-model`

````html
<!DOCTYPE html><html>
  <head>
    <meta charset="utf-8" /><title>Introdução ao Vue JS</title>
    <script src="https://unpkg.com/vue"></script>
  </head>
  <body>
      
    <div id="app">
      <gui-titulo titulo="Formulários"></gui-titulo>

      <p>Texto: {{ texto }}</p>
      <p>
        <input type="text" v-model="texto" />
      </p>

      <p>Textarea: {{ textarea }}</p> 
      <!-- Com esse CSS, vai querbrar a linha -->
      <p style="white-space: pre-line">{{ textarea }}</p>
      <p>
        <textarea v-model="textarea" rows="8" cols="80"></textarea>
      </p>

      <hr>

      <p>CheckBox</p>
      <input type="checkbox" id="aceitaTermos" v-model="termos">
      <label for="aceitaTermos">Aceitar os Termos! {{ termos }}</label>
      
      <hr>

      <p>Multiplos CheckBox {{ notificacoes }}  </p>
      <p>
        <input type="checkbox" id="recebreEmails" value="email" v-model="notificacoes">
        <label for="recebreEmails">Receber emails</label>
        <input type="checkbox" id="recebreSMS" value="sms" v-model="notificacoes">
        <label for="recebreSMS">Receber emails</label>
        <input type="checkbox" id="receberTel" value="tel" v-model="notificacoes">
        <label for="receberTel">Receber emails</label>
      </p>

      <hr>

      <p>Radios {{ sexo }}  </p>
      <p>
        <input type="radio" id="masculino" value="M"  v-model="sexo">
        <label for="masculino">Masculino</label>
        <input type="radio" id="feminino" value="F"  v-model="sexo">
        <label for="feminino">Masculino</label>
      </p>

      <hr>

      <p>Select {{ ano }} </p>
      <select v-model="ano">
        <option disabled value="">Escolah o ano</option>
        <option value="2017">Ano 2017</option>
        <option value="2018">Ano 2018</option>
        <option value="2019">Ano 2019</option>
      </select>

      <hr>

      <p>Multiple Selects {{ cores }} </p>
      <select multiple v-model="cores">
        <option disabled value="">Escolha as cores</option>
        <option>Azul</option>
        <option>Verde</option>
        <option>Vermelho</option>
      </select>

      <hr>

      <!-- Com o lazy, a atribuiçâo do valor ao JS
            Só será feito quando sair do campo. Isso é
            útil para um campo de buscar, para que o usuário
            digite e soemente quando ele clicar num botão
            mandar a requisição. Para nâo fazer a busca a cada letra-->
      <p>Lazy : {{ busca }}  </p>
      <p>
        <input type="text" v-model.lazy="busca">
      </p>

      <hr>

      <!-- v-model.number: Obriga ao JS a deixar a var sempre com o tipo number
            Sem isso, quando o usuário começar a digita, o JS vai entender como
            String e aasim nâo daria para fazer certas operações-->
      <p>Number: {{ idade }} {{ "tipo" + typeof(idade) }}  </p>
      <input type="number" v-model.number="idade">
      
    </div>

    <script type="text/javascript">
        
      Vue.component("gui-titulo", {
        props: ["titulo"],
        template: "<h2>{{ titulo }}</h2>"
      });

      var app = new Vue({
        el: "#app",
        data: {texto: "", textarea: "", termos: false, notificacoes: [],
          sexo: null, ano: null, cores: ['Verde','Vermelho'], busca: '', idade: 45}
      });
</script></body></html>
````

## Vue CLI

Link do Github: https://github.com/vuejs/vue-cli

Link desde projeto puro em HTML/CSS/JS:> https://github.com/guiferreira/Netflix-Template



Instalando o `vue-init-cli`

````
npm install -g @vue/cli-init
````



Comandos

+ `vue -V`
  + Ver a versão do Vue instalada
+ iniciar projetos
  + Exemplo: `vue init webpack-simple netflixVue`
  + Templates possíveis: https://github.com/vuejs-templates



##  Anotações sobre o Projeto do Netflix Layout Vue

`ref`

+ Serve para buscar uma atributo do objeto. 

+ Exemplo: Se um componente eu crio 4 instâncias, e nele fala para pegar uma tag com o atributo `x`  então todos eles vão se referir a mesma  coisa, ao primeiro que aparecer essa `tag`.

+ link: https://vuejs.org/v2/api/#vm-refs

  

````html
<div ref="scroller" class="row">
        
    ...
    
 <script>
    methods: {
        scrollDireita(){
    const self = this; // faço isso para apontar para o objeto do vue
    this.intervalo = setInterval(function(){ this.$ref.scroller.scrollLeft += 1 }  , 5);
        },
        scrollEsquerda(){
       const self = this; // Outra forma é usar arrow function
       this.intervalo = setInterval( () => { this.$ref.scroller.scrollLeft -= 1 }  , 5);
        },
        clearScroll(){
            clearInterval(this.intervalo);
        },
    } 
 </script>
````

Agora, com esse `$ref` vai pega o atributo de `ref` de cada componente.



####`v-bind:key`

+ Quando vocÊ fizer um `v-for` para objetos,mande também um identificador e coloque em `v-bind:key`. Isso ajuda a compila o `vue` ea renderizar melhor nâo dando erros

####**Ciclo de vida `created()`**

Linik: https://br.vuejs.org/v2/guide/instance.html

+ O momento `created()` é um bom momento para colocar chamadas de API.

#### LIB **`json-serveer`**

Link: https://github.com/typicode/json-server

+ **O que faz:**Serve para simular uma API REST rapidamente acessando um arquivo `json` `db.json.` útil para prototipagem e testar o funcionamento rápido de acesso ao HTTP

Install JSON Server

```
npm install -g json-server
```

Create a `db.json` file with some data

```
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

Start JSON Server

```
json-server --watch db.json
```

Now if you go to <http://localhost:3000/posts/1>, you'll get

```
{ "id": 1, "title": "json-server", "author": "typicode" }
```