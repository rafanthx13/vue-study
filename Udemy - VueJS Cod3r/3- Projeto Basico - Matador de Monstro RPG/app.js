new Vue({
    el: '#app',
    data: {
        // A vida dos monstros
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []

    },
    computed: {
        // Se terminou ou nâo o jogo
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame() {
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        attack(especial) {
            this.hurt('monsterLife', 5, 12, especial, 'Jogador', 'Monstro', 'player')
            if(this.monsterLife > 0){
                this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
            }
        },
        hurt(atr, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            // Evitar ficar negativo, se tornanod no máximo zero
            this[atr] = Math.max(this[atr] - hurt, 0) 
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`Jogador ganhou força de  ${heal}`, 'player')
        },
        healAndHurt() {
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster' )
        },
        registerLog(text, cls) {
            this.logs.unshift({text, cls}) // colocar no inicio da lista
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }

    }
})