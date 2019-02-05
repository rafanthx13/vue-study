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

