<template>
    
    <div class="gui-card" v-bind:style="efeitoClick"  v-on:click="clickEfeito()" v-on:mouseout="removeClickEfeito()" >
        <div class="gui-card__media">
            <img class="gui-card__img" v-bind:src="imagem"  />
        </div>
        <div class="gui-card__details">
            <div class="gui-card__title">
                {{ titulo }}
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: ['titulo', 'imagem'],
    data(){
        // em componentes, a data tem que ser retornanda num objeto
        return {
            efeitoClick: null
            
        }
    },
    methods: {
        clickEfeito: function() {
            this.efeitoClick = 'transform: scale(1.9); margin-right: 110px;';
        },
        removeClickEfeito: function() {
            this.efeitoClick = null;
        }
    }

}
</script>

<style>

</style>
