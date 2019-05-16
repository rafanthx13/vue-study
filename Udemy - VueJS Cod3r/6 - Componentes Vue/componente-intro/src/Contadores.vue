<template>
    <div class="contadores">
        <app-contador v-for="c in 5" :key="c"/>
    </div>
</template>

<script>
// Registro de forma local Contador
import Contador from './Contador.vue'

export default {
    // Registrando o componente 'Contador' de forma local nesse componente
    components: {
        'app-contador': Contador
    }
}

</script>

<style>

</style>
