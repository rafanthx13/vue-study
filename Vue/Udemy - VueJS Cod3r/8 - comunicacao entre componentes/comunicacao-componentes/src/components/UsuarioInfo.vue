<template>
    <div class="componente">
        <h2>As Informações de Usuário</h2>
        <p>Vários detalhes...</p>
        <p>Nome do Usuário: {{ nome }}</p>
        <button @clik="reiniciarNome">Reiniciar Nome</button>
        <button @click="reiniciarFn">Reiniciar nome (callback)</button>
        <p>idade <strong>{{ idade }}</strong></p>
    </div>
</template>

<script>

import barramento from '@/barramento';

export default {

    // O que eu espero receber
    props: {
        nome: {
            type: [String, Array],
            //require: true
            default: 'Silva'
        },
        reiniciarFn : {
            type: Function
        }
    },

    methods: {
        reiniciarNome() {
            this.nome = 'Pedro';
            // Duas formas
            this.$emit('nomeMudou', this.nome);
            barramento.alterarIdade(this.idade);
        }
    },

    created( ){
        barramento.quandoIdadeMudar('idadeMudou', idade => {
            this.idade = idade
        })
    }
    
}
</script>

<style scoped>
    

    .componente {
        flex: 1;
        background-color: #ec485f;
        color: #fff;
    }
</style>
