# 15 - Serviços HTTP (Axios)

Axios é a lib que permite ao Vue acessar o backend, permite fazer requisições AJAX assincronas pelos métodos HTTP



## Como instalar

`npm i --S axios`: Vai salvar como dependenica no npm

## Arquivo do `Axios`

É ideial montar um arquivo `.js` para abrigar o axios

Exemplo de arquivo: AXIOS DE FORMA BLOGAL

```javascript
import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = "https://curso-do-vue.firebaseio.com/"
axios.defaults.headers.common['Authorization'] = 'abc123'
axios.defaults.headers.get['Accepts'] = 'application/json' 

```

O axios já é capaz de fazer as requisições HTTP da forma que queremos, temos que apenas configurar para onde e quais coisas a mais queremos que ele faça.



Exemplo : AXIOS DE FORMA LOCAL (RECOMENDADA)

+ Dessa forma é até possivel ter vários axios
+ o `Vue.protoype.$http` : significa que poderemos acessar o axios através de `this.$http` no Vue

```javascript
import Vue from 'vue';
import axios from 'axios';

Vue.use({
    install(Vue) {
        
        Vue.prototype.$http = axios.create({
            baseURL: "https://curso-do-vue.firebaseio.com/",
            // configuranado o header da requisições http
            headers: {
                "Authorization": "abc123"
            } 
        });
    }
});
```

O arquivo aseguir foi usado nos projetos na Neppo

````javascript
// http.js
import axios from 'axios';
import store from '../store';
import app from '../../main';

const http = axios.create({
	baseURL: store.getters.getbackendURL,
	headers: {
		Authorization: 'Bearer ' + localStorage.getItem('token'),
		'Content-Type': 'application/json'
	}
});

http.interceptors.request.use(
	(config) => {
		app.$Progress.start();
		const token = localStorage.token;
		const accessToken = localStorage.accessToken;
		if (token) config.headers.Authorization = `Bearer ${token}`;
		if (accessToken) {
			config.headers.access_token = accessToken;
		}
		return config;
	},
	(error) => {
		app.$Progress.fail();
		return Promise.reject(error);
	}
);

http.interceptors.response.use(
	(response) => {
		app.$Progress.finish();
		return response;
	},
	(error) => {
		app.$Progress.fail();
		return Promise.reject(error);
	}
);

export default http;
````



## CRUD

CreateReadUpdateDelete



EM geral as consultas são feitas da seguinte forma:

````
this.$http.methodHTTP(`url`)
			.then((result) => {
				
			}).catch((err) => {
				
			});
				
````

Existe até mesmo o snipeet `thenc` que gera isso no VS CODE

## Código do Projeto

**Arquivo que configura o AXIOS**

````javascript
// axios.js
import Vue from 'vue';
import axios from 'axios';

//          CONFIGURAÇAO GLOBAL PARA O AXIOS
//axios.defaults.baseURL = "https://curso-do-vue.firebaseio.com/"
// axios.defaults.headers.common['Authorization'] = 'abc123'
// axios.defaults.headers.get['Accepts'] = 'application/json' // quando fizer get, vai mandar o 'accepot' como json ... 

Vue.use({
    install(Vue) {
        // Com esse código, posso acessar o axios atraves de  'this.$http'
        // Assim posso acessar de forma global
        // Vue.prototype.$http = axios
        // CONFIGURAÇÃ LOCAL PARA O AXIOS
        Vue.prototype.$http = axios.create({
            baseURL: "https://curso-do-vue.firebaseio.com/",
            // configuranado o header
            headers: {
                "Authorization": "abc123"
            }
        });

        // INterceptor de requisição
        // Aqui é um interceptor, com ele, podemos verificar as requisições
        Vue.prototype.$http.interceptors.request.use(config => {
            // console.log('foi executado o metodo', config.method)
            // o codigo abaixo muda o post feito na app para put, gerando um grande bug
            // if(config.method == 'post') {
            //     config.method = 'put'
            // }
            return config
        }, error => Promise.reject(error))

        // Estamos recebendo um objeto, nele, podemos modificar a resposta
        //neste codigo, a paritr do inteceptor, modifiquei a esturutra do array de resposta
        Vue.prototype.$http.interceptors.response.use(res => {
            // const array = []
            // for(let chave in res.data) {
            //     array.push({ id: chave, ...res.data[chave] })
            //          Esse codigo acima , o 'spread' '...' é o mesmo que fazer
            //                  {id: chave, nome: res.data[chave].nome, email: res.data[chave.email]}
            // }

            // res.data = array // retorna o fluxo normal
            return res
        }, error => Promise.reject(error))

        
    }
});
````

**main.js - arquivo iniicial de leitura**

````javascript
// main.js
import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';

import './plugins/bootstrap-vue';

import './plugins/axios'; // vai ler p arquivo e registrar o prototype

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

````

**Arquivo Vue**

````javascript
// App,vue
<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>

		<b-alert show dismissible v-for="mensagem in mensagens"
			:key="mensagem.texto"
			:variant="mensagem.tipo"
		>{{ mensagem.texto }}</b-alert>

		<b-card>

			<b-form-group label="Nome">
				<b-form-input type="text" size="lg" v-model="usuario.nome" placeholder="Informe o Nome">
				</b-form-input>
			</b-form-group>

			<b-form-group label="Email">
				<b-form-input type="text" size="lg" v-model="usuario.email" placeholder="Informe o Email">
				</b-form-input>
			</b-form-group>

			<hr>

			<b-button @click="salvar" size="lg" variant="primary">Salvar</b-button>

			<b-button @click="obterUsuarios" size="lg" variant="success" class='ml-2'>Listar</b-button>

		</b-card>

		<!-- Listando usuarios do GET do FIrebase -->
		<hr>
		<b-list-group>
			<b-list-group-item v-for="(usuario, id) in usuarios" :key="id">
				<strong>Nome: </strong> {{ usuario.nome }}<br>
				<strong>E-mail: </strong> {{ usuario.email }}<br>
				<strong>ID: </strong> {{ id }}<br>
				<b-button variant="warning" size="lg"
					@click="carregar(id)">Carregar</b-button>
				<b-button variant="danger" size="lg" class="ml-2"
					@click="excluir(id)">Excluir</b-button>
			</b-list-group-item>
		</b-list-group>

	</div>
</template>

<script>
export default {

	// Exemplo simples de POST feito no created()
	// created () {
	// 	this.$http.post('usuarios.json', {
	// 		nome: 'Maria',
	// 		email: 'maria_maria@gmail.com'
	// 	}).then((result) => {
	// 		console.log('res :', result);
	// 	})
	// },

	data() {
		return {
			mensagens: [],
			usuarios: [],
			id: null,
			usuario: {
				nome: '',
				email: ''
			}
		}
	},

	methods: {

		limpar(){
			this.usuario.nome = ''
			this.usuario.email = ''
			this.id = null
			this.mensagens = []
		},

		salvar() {
			// console.log('this.usuario :', this.usuario);
			// this.$http.post('usuairos.json', this.usuario)
			// 	// snipett thenc
			// 	.then((result) => {
			// 		this.usuario.nome = ''
			// 		this.usuario.email = ''
			// 	})

			// ESTMAOS JUNTANDO O PUT E O POST no mesmo lugar
			const metodo = this.id ? 'patch' : 'post' // decide se vai ser CREATE Ou UPDATE
			const finalUrl = this.id ? `/${this.id}.json` : '.json' // se for o UPDATE coloca o id no final
			this.$http[metodo](`/usuarios${finalUrl}`, this.usuario)
				.then(_ => {
					this.limpar()
					this.mensagens.push({
						texto: 'Operação realizada com sucesso!',
						tipo: 'success'
					})
				})



		},

		carregar(id) {
			this.id = id
			// ESTA CLONANDO. ESSA LINHA FAZ UM CLONE, E CRIA UM NOVO OBJETO pra NAO APONATAR PARA UM ITEM DA LSITA  this.usuarios
			// Aqui estou colocando em this.usuario o que ha dentro do objeto this.usuarios[id]
			this.usuario = { ...this.usuarios[id] }
		},

		excluir(id) {
			this.$http.delete(`/usuarios/${id}.json`)
			.thenc
				
				.then(() => this.limpar())
				.catch(err => {
					this.limpar()
					this.mensagens.push({
						texto: 'Problema para excluir!',
						tipo: 'danger'
					})
				})
		},



		obterUsuarios() {
			this.$http.get('usuarios.json', this.usuario)
			.then((result) => {
				
			}).catch((err) => {
				
			});
			  // .then((result) => {
				// 	this.usuarios = result.data
				// 	// console.log('result.data :', result.data);
				// })
		
		}
	},
	

}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>

````

