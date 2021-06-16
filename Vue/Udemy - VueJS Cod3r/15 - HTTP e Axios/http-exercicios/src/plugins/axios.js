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