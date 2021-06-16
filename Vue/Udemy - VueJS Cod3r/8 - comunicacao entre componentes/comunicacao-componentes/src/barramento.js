import Vue from 'vue'

// Aqui centralizamos e encapsulamos

export default new Vue({
    methods: {
        // $emit : emitir um evento (feito depois)
        alterarIdade(idade){
            this.$emit('idadeMudou', idade);
        },
        // $on : ouvir um evento (feito primeiro)
        quandoIdadeMUdar(callback){
            this.$on('idadeMoudou', callback)
        }
    }
});