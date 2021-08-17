# Vuex

Vamos separar o nosso vuex em módulos. Para nâo ter um únucio Vuex gigante englobando tudo

Duas pastas em /store
+ CountDown e Challenges: para cada uma cria-se 2 arquivos: index.ts (que vai ter o vuex) e types.ts (os tipos, o seuja, a interface do estado)
  + Para Challgens havera a separaçâo de geteres e mutation (para ficar mais organizado) em gettres.ts e mutations.ts.. **O NUXT RECONHCE QUE SÂO GETTER E MUTATIONS E POR ISSO VAI LELOS AO COSNTRUIR O ESTADO**. Por isos você nâo acha ai um 'import' delas na 'store/Challenges/index.ts'

Vantaganes do TypeScript
+ Se tudo está tipado (funçôes, objetos, tipos de retorno e de parametro) entao agente na erra nome nas coisas, pois vai acusar erro

**Ler dados do Vuex: Getters**
+ São funçôes que pegam os dados, mas que também servem para pegar eles de forma modificada

**Write dados no Vuex: Mutations**
+ Inserir dados no meu estado
