# Nuxt Conceitos

## O que é CMS

Sigla muito utilizada por desenvolvedores de websites e portais na internet, o [CMS](https://canaltech.com.br/software/O-que-e-um-CMS/) (Content Management System) é um conjunto de funções utilizadas para facilitar a vida dos criadores de sites. **São o conjunto de ferramentas para criação/edição de conteúdo na internet sem a necessidade de conhecimentos de programação.**

Um dos frameworks mais conhecidos e utilizados no Brasil e no mundo é o **Wordpress**, desenvolvido na linguagem de programação PHP, que permite que **qualquer usuário com conhecimento básico ou médio de computação possa criar websites completos e bastante fáceis de se manter, com um conteúdo interativo. Antes dos CMS, apenas pessoas com conhecimento avançado de programação web eram capazes de colocar e manter conteúdo no ar.**

Ao criar um site utilizando CMS, o usuário só se preocupa com a criação do conteúdo propriamente dito, e não com os detalhes técnicos por trás do funcionamento do site. Isso possibilitou a propagação em larga escala de blogs pessoais e sobre assuntos específicos, e hoje esse ramo de entretenimento representa uma boa parcela de conteúdo na internet onde cada usuário possui afinidade com um determinado framework.

**RESUMO:** Uma UI amigável para criar markdown (s´o conteudo bruto). Você a acessa com API e o laoyut fica a cargo do prgrmaador.

## Diretórios

### `/pages`

`_slug.vue`: usamos esse arquivo para todos as outras páginas sem página especifica. Seve como um template. Assim

## Diferença entre `asyncData()` e `data()`

`asyncData` is called every time before loading the **page** component and is only available for such. It will be called server-side once (on the first request to the Nuxt app) and client-side when navigating to further routes. This method receives the `context` object as the first argument, you can use it to fetch some data and return the component data.

**Resumo:** É um processamento ServerSide. Essa que é a vantagem do nuxt. A chamada que é feito aki é gerada pelo Sistema e não pelo browser do usuário caso fosse um Vue Normal.