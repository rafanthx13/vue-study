new Vue({
    el: "#desafio",
    data: {
        nome: 'Rafael Morais de Assis',
        idade: 22,
        srcImage: 'deep_dream_01.jpg',
    },
    methods: {
        newIdade: function() {
            return ths.idade * 3
        },
        randomNumber: function() {
            return Math.random()
        }
    }
})