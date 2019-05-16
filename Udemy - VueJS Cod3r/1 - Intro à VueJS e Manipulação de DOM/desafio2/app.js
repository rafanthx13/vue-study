new Vue({
    el: '#desafio',
    data: {
        valor: ''
    },
    methods: {
        showAlert: function(){
            alert('Alerta Exibido')
        },
        listenInput: function(ev){
            this.valor = ev.target.value
        }
    }
})