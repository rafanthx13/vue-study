<template>
    <h1> {{ titulo }} </h1>
</template>

<script>
// vocÊ deixa 'default' se você só tiver um único compoenten
export default {
    name: 'teste',
    props: ['titulo']

}
</script>

<style>

h1 {
    color: red;
}

</style>
