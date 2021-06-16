# Vuex - Gerenciador de Estados (transiçâo de dados entre componentes)



**Por que usar Vuex** comunicação que vimos até agora entre componentes costuma ser entre pai <--> filho, agora, por exemplo, se for entre irmao, primos ou de um grau mairo, ou até mesmo um nâo ter nada haver com outro ai fica difícil passar dados pelos métodos que vimos. Para resolver isso, há o Vuex que gerencia estados.



Estratégias:

+ Do pai para o filho: via props
+ Do filho para o pai, `$emit.event` emitir evento e o pai o captura
+ Uma estratégia mais geral é o EventBus mas nâo é tâo eficicente



## Introdução

**Há um Store Central único, um nó notifica e mudando esse estao, outro coponente é notificado e ler essa mudaça. FUnciona bem com propriedades `computeds` , elas vâo ficar vigiando o vuex e alterar quando perceber mudança**



Ou seja, é um *getter* e *setter* em algo central que se pode ler/escrever por qualquer componente

`npm i --save vuex@3.0.1 -E`



## Conceitos do Vuex

+ `state`: estaod compartilhado
+ `getters`: funções que leem estado
+ `mutations`: funçôes para alterar o estado centralisado do vuex
+ `actions`: faz o mesmo que mutations, mas tem a filosofia de fazer coisa maiores. Enquanto que se usa mutations só rpa pegar uma valor e fazer pouca coisa, as actions ficam responsável por fazer mais (ajax, promoisse,chamar backend ou chamar outras mutations)
+ `modules`: para importar arquivos de objeto com vuex

para acessar o vuex, através de

`this.$store`

palavras reservadas:

+ `commit` para executar uma mutations
+ `dispath`: chama actions
+ `state`: como o primeiro parametro de getters/mutations, é obrgatorio para pegar a referencia do vuex
+ `context` o mesmo que o parametro de `state` para as actions

## Exemplo inicial de uso do Vuex

```javascript
// store.js (Vuex)
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // tudo que fica dentro de state do Vuex, é o estaudo centralizado e compartilhável
  state: {
    produtos: [
      { id: 1, nome: 'Produto 1', quantidade: 7, preco: 14.55 },
      { id: 2, nome: 'Produto 2', quantidade: 10, preco: 22.99 },
      { id: 3, nome: 'Produto 3', quantidade: 1, preco: 43.18 }
    ]

  }

})
```

main.js

````javascript
// main.js
import Vue from 'vue'
import App from './App.vue'
import store from './store/store'

Vue.config.productionTip = false

import Painel from './components/Painel'
Vue.component('Painel', Painel)

Vue.filter('dinheiro', valor => {
	return `R$ ${parseFloat(valor).toFixed(2)}`.replace('.', ',')
})

new Vue({
	store,
	render: h => h(App),
}).$mount('#app')

````

para acessar `get`

```javascript
this.$store.state.produtos
```

para mexer nele

```javascript
this.$store.state.produtos.push(produto)
```





Curiosidade:

Colocando esse comentário antes da linha com um `console.log` o build nao acusa erro

````javascript
// eslint-disable-next-line
````

### Getters

Função que le e retorna uma informaçâo. Como é um método vocÊ pode adicionar a essa processo:

+ Seguranaça de Acesso, Tranformação de dados ou outras coisas mais

Costumam ser chamados em `computed`

Exemplo:

```javascript
// store.js // aki está resumido
export default new Vuex.Store({
  
  // tudo que fica dentro de state do Vuex, é o estaudo centralizado e compartilhável
  state: {
    produtos: [
      { id: 1, nome: 'Produto 1', quantidade: 7, preco: 14.55 },
      { id: 2, nome: 'Produto 2', quantidade: 10, preco: 22.99 },
      { id: 3, nome: 'Produto 3', quantidade: 1, preco: 43.18 }
    ]

  },

  getters: {
    valorTotal(state){
      return state.produtos.map(p => p.quantidade * p.preco)
        .reduce((total, atual) => total + atual, 0)
    }
  }

})
```

Para chamar use Chamada 

````javascript
computed: {
        total() {
            // usando getters
            return this.$store.getters.valorTotal
        },
}
````



##### mapGetters	

Pode-se mapear direto do vuex para um atributo

````html
<template>
	{{ total }}
</template>

<script>
    
import { mapGetters } from 'vuex'
    // vai mapaera o valorTotal no getter do vuex e vai jogar aqui como 'total'
export default {
    computed: mapGetters({
        total: 'valorTotal'
    })
}
</script>
````

VOcê pode usar esse trehco também para mapear direto (fica mais limpo e evita ter funçao). O `spread == '...'` é necessário para poder colocar outras propriedade computadas dentro de `computed`

````javascript

...mapGetters({
	total: 'valorTotal'
})
````



## Mutations (Setter)

Se você quer setar em um objeto,  você chama uma `mutattions` dando `commit`. Obs: só pode passar um ***único*** parâmetro. COmo o getters, é uma função que pode fazer mais coisa dentro dela.

Costmam ser chamados em `methods`



```javascript
// trecho no store.js

mutations: {
    // para as mutations, só se pode passar um único valor de parametro
    adcionarProduto(state, payload){
      state.produtos.push(payload)
    }
  }
```

mapMutations:

+ Perceba que o mapMutations serve para registrar mais facilemnete sua mutation para ser chamado dentro de seu código

```javascript
import { mapMutations } from 'vuex'

methods: {
    ..mapMutations(['adicionarProduto']),
        // chamando
     call() {
        this.adicionarProduto(produto)
    }
}

```

## Actions

Fazem o mesmo que as `mutatuons` mas tem uma filosofia diferete. ENquanto que se reserva as `mutations` para alterar um atributo, as `actions` se guardam apra fazer várias mutations de uma vez só, lembrando um `trigger` de um banco de dados.

==> Como mutations, ela só recebe um único aprametro, se passar mais, ele nâo vao chegar la

De prioridade para nas actions fazer chamdas ajax ou reoslver `ṕromise` ou acessar o backend



##### mapActions

Pode-se usar mapActions da mesma forma que o `mapMutations`.



**É ISSO QUE O FAZ O MAP**

````javascript
..mapActions(['adicionarProduto'])

	||
    ||
    \/

adicionarProduto(produto){
	this.$store.dispath('adicionarProduto')
}

````



#### Usando vuex com `vue-model` (através de `computed` alterada)



uma propriedade `computed` costuma ser usada somente para ler.

MAS, VOCÊ PODE SER CAPAZ DE SETAR COISA, ALÉM DISSO DECIDIR COMO COLCOAR ESSES DADOS

Basta transformar de chamada de funçâo para virar um atributo objeto com dois atributis: get e set

ASSIM: **CONSEGUIMOS ALTERAR UM DADO DO `v-model` atraves do vuex (getters/mutations)**

````vue
<template> 
    <Painel titulo="Parâmetros" vermelho>
        <div class="parametros">
            <span>
                <strong>Quantidade Padrão: </strong> 
                <input type="number" v-model="quantidade">
            </span>
            <span>
                <strong>Preço Padrão: </strong>
                <input type="number" v-model="preco">
            </span>
        </div>
    </Painel>
</template>

<script>
export default {
    computed: {
        quantidade: {
            get () {
                return this.$store.state.parametros.quantidade
            },
            set (valor) {
                this.$store.commit('setQuantidade', valor)
            }
        },
        preco: {
            get () {
                return this.$store.state.parametros.preco
            },
            set (valor) {
                this.$store.commit('setPreco', valor)
            }
        }
    }
}
</script>
````

## Usando modulos no vuex

Se você usar módulos, as mutations/gettes/actions sao adicionandas de forma trivial mas os `state` nao. Se você acessar o estado diretemate, terá que colocar o nome do modulo antes para referenciar certo

Exemplo

````javascript
// sotre.js
import Vue from 'vue'
import Vuex from 'vuex'

import carrinho from './modules/carrinho'
import parametros from './modules/parametros'

import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        nome: 'Maria',
        sobrenome: 'Silva',
    },
    getters,
    modules: { carrinho, parametros }
})
````

Modulo 1: carrinho

````javascript
export default {
    namespaced: true,
    state: {
        produtos: []
    },
    getters: {
        valorTotal(state) {
            return state.produtos.map(p => p.quantidade * p.preco)
                .reduce((total, atual) => total + atual, 0)
        }
    },
    mutations: {
        adicionarProduto(state, payload) {
            state.produtos.push(payload)
        }
    },
    actions: {
        adicionarProduto({ commit }, payload) {
            setTimeout(() => {
                commit('adicionarProduto', payload)
            }, 1000)
        }
    }
}
````

Modulo 2: 

```javascript
export default {
    state: {
        quantidade: 2,
        preco: 19.99
    },
    mutations: {
        setQuantidade(state, payload) {
            state.quantidade = payload
        },
        setPreco(state, payload) {
            state.preco = payload
        }
    }
}
```





## Exemplo de `store.js` da neppo



tm2 ticket

````javascript
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const user = {
  state: {
    labelAdmin: "ADMIN",
    labelAgent: "AGENT",
    labelUser: "USER",
    displayName: "",
    admin: localStorage.getItem("admin"),
    domain: localStorage.getItem("domain"),
    email: localStorage.getItem("email"),
    firstName: localStorage.getItem("firstName"),
    genre: localStorage.getItem("genre"),
    lastName: localStorage.getItem("lastName"),
    id: localStorage.getItem("id"),
    name: localStorage.getItem("name"),
    profile: localStorage.getItem("profile"),
    office: localStorage.getItem("office"),
    roles: localStorage.getItem("roles"),
    typeOfCollaborator: localStorage.getItem("typeOfCollaborator"),
    username: localStorage.getItem("username"),
    updateUser: localStorage.getItem("updatedUser"),
    remuneration: localStorage.getItem("remuneration"),
    locale: localStorage.getItem("locale")
  },
  mutations: {
    setUser(state, user) {
      state.admin = user.admin;
      state.displayName = user.displayName;
      state.remuneration = user.remuneration;
      state.domain = user.domain;
      state.email = user.email;
      state.firstName = user.firstName;
      state.genre = user.genre;
      state.profile = user.type;
      // state.profile = 'USER';
      // state.profile = 'AGENT';
      state.lastName = user.lastName;
      state.id = user.id;
      state.office = user.office;
      state.roles = user.roles;
      state.typeOfCollaborator = user.typeOfCollaborator;
      state.username = user.username;
      state.name = user.name;
      state.updatedUser = user.updatedUser;
      state.locale = user.locale;
    },
    setRemuneration(state, remuneration) {
      state.remuneration = remuneration;
    },
    setLocale(state, locale) {
      state.locale = locale;
    }
  },
  actions: {},
  getters: {
    getUser(state) {
      return state;
    },
    getRemuneration(state) {
      return state.remuneration;
    },
    getLocale(state) {
      return state.locale;
    }

  }
};

const response = {
  state: {
    codeStatus: undefined,
    errorMessage: undefined
  },
  mutations: {
    setCodeStatus(state, codeStatus) {
      state.codeStatus = codeStatus;
    },
    setErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    }
  },
  actions: {},
  getters: {
    getResponse(state) {
      return state;
    }
  }
};

const users = {
  state: {
    users: []
  },
  mutations: {
    setUsers(state, listUsers) {
      state.users = listUsers;
    }
  },
  actions: {},
  getters: {
    getUsers(state) {
      return state;
    }
  }
};

const backend = {
  state: {
    URL: localStorage.getItem("URL"),
    token: localStorage.getItem("token"),

    /*
      MASTER

      DATABASE
      Server: mysqlmaster.neppo.com.br:3306
      Schema Database: tm2_ticket
      user: ticket 
      password: n3pp0t1

      SANDBOX
      
      DATABASE
      Server: 172.23.16.15:3307
      Schema Database: tm2_ticket_hom
      user:  tickethom 
      password: n3pp0t1

      [APLICATIONS] - BRANCH sandbox
      TICKET BACK http://172.23.18.248:8093
      TICKET FRONT http://172.23.18.248:8094
      SERVER http://172.23.18.248:8194

      DEVELOPMENT

      DATABASE
      Server: 172.23.18.248:3317
      Schema Database: TM2_TICKET_DEV
      user: ticketdev
      password: ticketdev

      [APLICATIONS] - BRANCH development
      TICKET BACK http://172.23.18.248:8091
      TICKET FRONT http://172.23.18.248:8092
      SERVER http://172.23.18.248:8192    
    */

    // BACK 
    local: "http://localhost:8080",
    development: "http://172.23.18.248:8091",
    sandbox: "https://tm2ticket.tm2digital.com/back",
    master: "",

    // FRONT
    frontLocalhost: "localhost",

    frontDev: "172.23.18.248:8092",
    frontTM2Dev: "172.23.18.248:8192",

    frontSandbox: "https://tm2ticket.tm2digital.com",
    frontTM2Sandbox: "https://tm2ticket.tm2digital.com",

    frontMaster: "",
    frontTM2Master: "",
  },
  mutations: {
    setBackend(state, URL) {
      localStorage.setItem("URL", URL);
      state.URL = URL;
      routes.state.login = URL + "/api/auth";
      routes.state.token = URL + "/api/auth/token";
      routes.state.ticket = URL + "/api/ticket";
      routes.state.ticketGetPages = URL + "/api/ticket/getPages";
      routes.state.ticketGetOne = URL + "/api/ticket/";
      routes.state.channel = URL + "/api/channel";
      routes.state.user = URL + "/api/user";
      routes.state.issue = URL + "/api/issue";
      routes.state.workflow = URL + "/api/workflow";
      routes.state.worktime = URL + "/api/worktime";
      routes.state.priority = URL + "/api/priority";
      routes.state.tag = URL + "/api/tag";
      routes.state.department = URL + "/api/department";
      routes.state.priority = URL + "/api/priority";
      routes.state.state = URL + "/api/state";
      routes.state.draft = URL + "/api/ticket/draft";
      routes.state.upload = URL + "/api/upload?ticketId=";
      routes.state.notification = URL + "/api/notification/findByUserId";
      routes.state.tag = URL + "/api/tag";
      routes.state.answer = URL + "/api/answer";
      routes.state.product = URL + "/api/product";
      routes.state.issueType = URL + "/api/issueType";
      routes.state.company = URL + "/api/company";
    },
    setToken(state, token) {
      localStorage.setItem("token", token);
      state.token = token;
    }
  },
  actions: {},
  getters: {
    getBackend(state) {
      return state;
    }
  }
};

const routes = {
  state: {
    login: localStorage.getItem("URL") + "/api/auth",
    token: localStorage.getItem("URL") + "/api/auth/token",
    ticket: localStorage.getItem("URL") + "/api/ticket/getPages",
    channel: localStorage.getItem("URL") + "/api/channel",
    project: localStorage.getItem("URL") + "/api/project",
    jiraIssue: localStorage.getItem("URL") + "/api/basic/issue",
    user: localStorage.getItem("URL") + "/api/user",
    workflow: localStorage.getItem("URL") + "/api/workflow",
    worktime: localStorage.getItem("URL") + "/api/worktime",
    state: localStorage.getItem("URL") + "/api/state",
    draft: localStorage.getItem("URL") + "/api/ticket/draft",
    upload: localStorage.getItem("URL") + "/api/upload?ticketId=1",
    notification: localStorage.getItem("URL") + "api/notification/findByUserId",
    ticketGetOne: localStorage.getItem("URL") + "api/ticket/",
    ticketGetPages: localStorage.getItem("URL") + "api/ticket/getPages",
    tag: localStorage.getItem("URL") + "api/tag",
    answer: localStorage.getItem("URL") + "api/answer",
    product: localStorage.getItem("URL") + "api/product",
    issueType: localStorage.getItem("URL") + "api/issueType",
    company: localStorage.getItem("URL") + "api/company"
  },
  mutations: {},
  actions: {},
  getters: {
    getRoutes(state) {
      return state;
    }
  }
};

const systemParameters = {
  state: {
    url: localStorage.getItem("URL") + "/systemParameters",
  },
  getters: {
    getSystemParameters(state) {
      return state;
    }
  }
};

const spinner = {
  state: {
    loading: false
  },
  getters: {
    getLoading(state) {
      return state.loading;
    }
  },
  mutations: {
    setLoading(state, loading) {
      Vue.set(state, 'loading', loading);
    }
  },

};

const notifications = {
  state: {
    notifications: undefined,
  },
  mutations: {
    setNotifications(state, notifications) {
      state.notifications = notifications;
    },
  },
  actions: {},
  getters: {
    getNotifications(state) {
      return state;
    }
  }
};

const tags = {
  state: {
    tags: undefined
  },
  getters: {
    getTags(state) {
      return state.tags;
    }
  },
  mutations: {
    setTags(state, tags) {
      Vue.set(state, 'tags', tags);
    }
  },
};

const emails = {
  state: {
    emails: undefined
  },
  getters: {
    getEmails(state) {
      return state.emails;
    }
  },
  mutations: {
    setEmails(state, emails) {
      Vue.set(state, 'emails', emails);
    }
  },
};

const rangeDate = {
  state: {
    rangeDate: []
  },
  getters: {
    getRangeDate(state) {
      return state.rangeDate;
    }
  },
  mutations: {
    setRangeDate(state, rangeDate) {
      Vue.set(state, 'rangeDate', rangeDate);
    }
  },
};

const functions = {
  state: {
    HREF: undefined,
    search: undefined,
    paramsURL: undefined,
    isEmpty: undefined,
    clearSearch: undefined,
    searchQuery: undefined,
    uploads: [],
    locales: ["pt-Br", "en", "es"],
  },
  mutations: {
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setHREF(state, HREF) {
      state.HREF = HREF;
    },
    setClearSearch(state, clearSearch) {
      state.clearSearch = clearSearch;
    },
    setParamsURL(state, paramsURL) {
      state.paramsURL = paramsURL;
    },
    setIsEmpty(state, isEmpty) {
      state.isEmpty = isEmpty;
    },
    setUpload(state, upload) {
      upload === 1 ?
        state.uploads = [] :
        state.uploads.push(upload);
    },
    setSearch(state, search) {
      state.search = search;
    },
  },
  actions: {},
  getters: {
    getFunctions(state) {
      return state;
    }
  }
};

const tickets = {
  state: {
    tickets: undefined,
  },
  mutations: {
    setTickets(state, tickets) {
      state.tickets = tickets;
    },
  },
  actions: {},
  getters: {
    getTickets(state) {
      return state;
    }
  }
};

const ticket = {
  state: {
    ticket: undefined,
  },
  mutations: {
    setTicket(state, ticket) {
      state.ticket = ticket;
    },
  },
  actions: {},
  getters: {
    getTicket(state) {
      return state;
    }
  }
};

const login = {
  state: {
    makeLogin: localStorage.getItem("makeLogin"),
  },
  mutations: { 
    setLogin(state, makeLogin) {
      state.makeLogin = makeLogin;
    }
  },
  action: {},
  getters: {
    getLogin(state) {
      return state;
    }
  } 
};


const store = new Vuex.Store({
  modules: {
    user: user,
    tickets: tickets,
    notifications: notifications,
    ticket: ticket,
    backend: backend,
    response: response,
    routes: routes,
    rangeDate: rangeDate,
    tags: tags,
    emails: emails,
    users: users,
    spinner: spinner,
    systemParameters: systemParameters,
    functions: functions,
    login: login
  }
});

export default store;
````

