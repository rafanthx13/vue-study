<template>
    <div class="componente">
        <h2>Alterar os Dados de Usuário</h2>
        <p>Edite as informações</p>
        <p>idade <strong>{{ idade }}</strong></p>
        <button @click="alterarIdade">AlterarIdade</button>
    </div>
</template>

<script>

import barramento from '@/barramento';

export default {

    props: ['idade'],

    methods: {
        // vai alterar o pai, que pasa a prop idade para dois filhos
        // entao, UsuarioEditar estara se comunicando com UsuarioInfo (irmão)
        alterarIdade() {
            this.idade += 1
            //this.$emit('idadeMudou', this.idade); // forma antiga
            barramento.alterarIdade(this.idade)// eventbus
        }
    }
    
}
</script>

<style scoped>
    .componente {
        flex: 1;
        background-color: #98b99a;
        color: #fff;
    }
</style>
