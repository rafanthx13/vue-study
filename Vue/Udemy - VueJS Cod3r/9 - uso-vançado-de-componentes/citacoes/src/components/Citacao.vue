<template>
    <div class="citacao">
        <slot></slot>
        <slot name="autor"></slot>
        <slot name="texto"></slot>
        <slot name="fonte"></slot>
    </div>
</template>

<script>
export default {

  props: {
    texto: {
      type: String,
      default: ''
    }
  },
  
  created(){
    console.log('created');
  },
  activated() {
    console.log('activated');
  },
  deactivated(){
    console.log('deativated');
  },
  destroyed() {
    console.log('destroyed');
  }

}
</script>

<style scoped>
    .citacao {
        border: 1px solid #DDD;
        background-color: rgba(0, 0, 0, .1);
        padding: 25px;
        max-width: 450px;
    }

    .h1 {
      color: red;
    }
</style>
