# Como funciona Nuxt

## Links

+ 



### /pages

Cada page é uma rota da nossa aplicação.

Já o diretório **pages** armazena todas as páginas de nosso projeto. Podemos dizer que é neste diretório que iremos agrupar os vários componentes que criarmos e também iremos definir as meta tags de cada página. O mais incrível é que o Nuxt converte cada arquivo neste diretório em uma rota de nossa aplicação. Assim as rotas são criadas automaticamente, não precisamos nos preocupar com isso. Vamos ver isso acontecendo na prática.

### /layout

Define o conteudo fora de '/pages' ou seja, coisas com header e footer que é compatilhand entre várias páginas


### Alterar meta tags do header do html

O head abaixo altera o titulo

````javascript
interface Head {
	title: string;
}


export default Vue.extend({
	head (): Head {
		return {
			title: 'Home | movue.it',
		};
	},
````

Para ver outras tags que possa acesar, acesse  `vue-metatag`

## ARQUIVOS ESTÁTICOS

ficam na pasta `/static` e devem ser configurados em  `nuxt.config.js`.

Se configurado corretamente, toda referÊncia a algo static será feita sem utilizar todo  o path.

Ex: ``playAudio('/notification.mp3');``

## path com `~`

~: Representa a razi do nosso projeto

##

v-on ==> @
v-bind ==> :

## pages/_id

pages/_id.vue => significa que essa pagaina abre para cada id, como o `:id` do vue-touter

## Id invalido

`layouts/error.vue`

Esse arquivo vai para varias cosias de error

chamando

```
// caso nao acahar um id, ai cai no catch
return error({ statusCode: 404 })
```

## Metatags

```
head(){
	return {
	title: 'Blog'
	meta: [
		{
		uid: 'description'
		name: 'description
		content: 'Descriçâo do meu blog legal
		}
	]
	}
}
```

## Atomic Design

https://vuedose.tips/how-to-structure-a-vue-js-app-using-atomic-design-and-tailwindcss/

https://github.com/milad-alizadeh/vue-cli-plugin-atomic-design

![GitHub - milad-alizadeh/vue-cli-plugin-atomic-design: Vue CLI plugin for Atomic  Design & Storybook](https://raw.githubusercontent.com/milad-alizadeh/vue-cli-plugin-atomic-design/master/vue-atomic-design.png)

### Atoms

It is the smallest unit that composes our application, it is not useful by itself but it allows us to have more control over the application elements.

Imagine that you want to create a basic layout, in it there will be a header, a body and a footer. But, in addition, each of them is made up of smaller elements such as the links you can see in the header and also in the footer.

Well, we’re talking about the atoms being the HTML tags that will be reused throughout the application, as link, heading and svg, among others

### Molecules

Molecules, as in nature, are groups of atoms linked together. In our application, molecules are the smallest components composed of one or more repeated atoms, always simple combinations built for reuse.

Having composed a molecule by several atoms already made, make us work with "do one thing and do it well" mentality. Both atoms and molecules encourage the creation of independent and reusable components.

### Organisms

Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface, as the header and the footer.

Now, we can see the final interface beginning to take shape. As in molecules with atoms, organisms can consist of similar and/or different molecule types.

As in the previous sections, we will see the possibilities we have to create the organisms. Let's have a look directly on each one:

### Templates

Now, we left behind the chemistry-based theory to get into common web language. Templates consist mostly of groups of organisms and/or molecules to form the common structure of a page, what we used to call layout.

At this stage, we already have created every piece of our template, so let's add them together to see how it looks.