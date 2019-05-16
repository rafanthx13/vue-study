<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>

		<b-alert show dismissible v-for="mensagem in mensagens"
			:key="mensagem.texto"
			:variant="mensagem.tipo"
		>{{ mensagem.texto }}</b-alert>

		<b-card>

			<b-form-group label="Nome">
				<b-form-input type="text" size="lg" v-model="usuario.nome" placeholder="Informe o Nome">
				</b-form-input>
			</b-form-group>

			<b-form-group label="Email">
				<b-form-input type="text" size="lg" v-model="usuario.email" placeholder="Informe o Email">
				</b-form-input>
			</b-form-group>

			<hr>

			<b-button @click="salvar" size="lg" variant="primary">Salvar</b-button>

			<b-button @click="obterUsuarios" size="lg" variant="success" class='ml-2'>Listar</b-button>

		</b-card>

		<!-- Listando usuarios do GET do FIrebase -->
		<hr>
		<b-list-group>
			<b-list-group-item v-for="(usuario, id) in usuarios" :key="id">
				<strong>Nome: </strong> {{ usuario.nome }}<br>
				<strong>E-mail: </strong> {{ usuario.email }}<br>
				<strong>ID: </strong> {{ id }}<br>
				<b-button variant="warning" size="lg"
					@click="carregar(id)">Carregar</b-button>
				<b-button variant="danger" size="lg" class="ml-2"
					@click="excluir(id)">Excluir</b-button>
			</b-list-group-item>
		</b-list-group>

	</div>
</template>

<script>
export default {

	// Exemplo simples de POST feito no created()
	// created () {
	// 	this.$http.post('usuarios.json', {
	// 		nome: 'Maria',
	// 		email: 'maria_maria@gmail.com'
	// 	}).then((result) => {
	// 		console.log('res :', result);
	// 	})
	// },

	data() {
		return {
			mensagens: [],
			usuarios: [],
			id: null,
			usuario: {
				nome: '',
				email: ''
			}
		}
	},

	methods: {

		limpar(){
			this.usuario.nome = ''
			this.usuario.email = ''
			this.id = null
			this.mensagens = []
		},

		salvar() {
			// console.log('this.usuario :', this.usuario);
			// this.$http.post('usuairos.json', this.usuario)
			// 	// snipett thenc
			// 	.then((result) => {
			// 		this.usuario.nome = ''
			// 		this.usuario.email = ''
			// 	})

			// ESTMAOS JUNTANDO O PUT E O POST no mesmo lugar
			const metodo = this.id ? 'patch' : 'post' // decide se vai ser CREATE Ou UPDATE
			const finalUrl = this.id ? `/${this.id}.json` : '.json' // se for o UPDATE coloca o id no final
			this.$http[metodo](`/usuarios${finalUrl}`, this.usuario)
				.then(_ => {
					this.limpar()
					this.mensagens.push({
						texto: 'Operação realizada com sucesso!',
						tipo: 'success'
					})
				})



		},

		carregar(id) {
			this.id = id
			// ESTA CLONANDO. ESSA LINHA FAZ UM CLONE, E CRIA UM NOVO OBJETO pra NAO APONATAR PARA UM ITEM DA LSITA  this.usuarios
			// Aqui estou colocando em this.usuario o que ha dentro do objeto this.usuarios[id]
			this.usuario = { ...this.usuarios[id] }
		},

		excluir(id) {
			this.$http.delete(`/usuarios/${id}.json`)
			.thenc
				
				.then(() => this.limpar())
				.catch(err => {
					this.limpar()
					this.mensagens.push({
						texto: 'Problema para excluir!',
						tipo: 'danger'
					})
				})
		},



		obterUsuarios() {
			this.$http.get('usuarios.json', this.usuario)
			.then((result) => {
				
			}).catch((err) => {
				
			});
			  // .then((result) => {
				// 	this.usuarios = result.data
				// 	// console.log('result.data :', result.data);
					
				// })
		
		}
	},
	

}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>
