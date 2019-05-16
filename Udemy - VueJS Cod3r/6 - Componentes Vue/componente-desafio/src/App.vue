<!-- 
O objetivo desse desafio é organizar em vários componentes
todo o html que estava aqui anteriormtente nesse template
-->

<template>
	<v-app>

		<navigation-bar/>

		<my-toolbar/>

		<my-carrosel/>

		<my-footer/>

	</v-app>
</template>

<script>

import Toolbar from './Toolbar.vue'
import Footer from './Footer.vue'
import NavigationBar from './NavigationBar.vue'
import Carrosel from './Carrosel.vue'

export default {
	components:{
		'my-carrosel': Carrosel,
		'navigation-bar': NavigationBar,
		'my-footer': Footer,
		'my-toolbar': Toolbar
	}
	
}

</script>

<!-- template antigo -->

<!--

<template>
	<v-app>
		<v-navigation-drawer app>
			<v-toolbar flat>
				<v-list>
					<v-list-tile>
						<v-list-tile-title class="title">
							Menu
						</v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-toolbar>

			<v-divider></v-divider>

			<v-list dense class="pt-0">
				<v-list-tile v-for="item in itensMenu" :key="item.titulo">
					<v-list-tile-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{ item.titulo }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>

		<v-toolbar app>
			<v-toolbar-title class="headline text-uppercase">
				<span>Desafio</span>
				<span class="font-weight-light">Componente</span>
			</v-toolbar-title>
		</v-toolbar>

		<v-content>
			<v-carousel>
				<v-carousel-item
					v-for="(item,i) in fotos"
					:key="i"
					:src="item.src"></v-carousel-item>
			</v-carousel>
		</v-content>

		<v-footer class="pa-3" app>
			<v-spacer></v-spacer>
			<div>Curso Vue &copy; {{ new Date().getFullYear() }}</div>
		</v-footer>
	</v-app>
</template>

 -->