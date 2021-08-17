# movue-it-nuxt

## Start Nuxt TS  

$ npx create-nuxt-app example10-workstation-nuxt

````
create-nuxt-app v3.6.0
✨  Generating Nuxt.js project in movue-it-nuxt
? Project name: movue-it-nuxt
? Programming language: TypeScript
? Package manager: Npm
? UI framework: Tailwind CSS
? Nuxt.js modules: (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Linting tools: ESLint
? Testing framework: Jest
? Rendering mode: Universal (SSR / SSG)
? Deployment target: Server (Node.js hosting)
? Development tools: (Press <space> to select, <a> to toggle all, <i> to invert selection) NONE
? Continuous integration: None
? Version control system: (Use arrow keys)
> Git
````

## Configurando Projeto

+ deletar `components/Logo.vue`
+ Em `layout/default.vue`
````html
  <template>
      <div>
        <Nuxt />
      </div>
  </template>
````
  + Em `page/index.vue`
````html
<template>
	<div />
</template>
````

+ na pasta static: coloca as imagens do repo do github
+ Deletar a pasta de test (pois teste vai haver a cada pasta
+ Em `package.json` muda a parte de lint e por os seguintes `tests`
````json
// lint no typescript
"lint": "eslint --ext \".ts,.js,.vue\" --ignore-path .gitignore .",
"test": "jest", // executar text
"test:watch": "jest --watchAll", // ficar vigiando (auto reload)
"test:coverage": "jest --collectCoverage" //coletar cobertura
````

+ em `jest.config.js` por false para coletar somente quando agente executar aquele comando

````
collectCoverage: false,
collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/layouts/**/*.vue',
    '<rootDir>/store/**/*.ts',
    '<rootDir>/utils/**/*.ts',
    '!<rootDir>/**/types.ts', // acrescentado (nao pegar do types.ts)
],
````
+ Instalar pacotes do `package.json`. São: 

  + `npm install --save cookie-universal-nuxt @types/jest`

  + ```
    "autoprefixer": "^9",
    "postcss": "^7",
    "tailwindcss": "npm:@tailwindcss/postcss7-compat",
    ```

  + Ou você pode clonar do repo mesmo

+ **Configurar ESLINT** COPIA DELE `.eslintrc.js`
+ Criar arquivo `types/vue-shim.d.ts` como do repo
  + Serve para o VSCode reconhecer melhor os arquivos vue com TS
  + `The first file helps your IDE to understand what a file ending in .vue is`

+ **Configurar NUXT**: `nuxt.config.js`

  + Na parte de 'link' por 3 linhas: novo favicon e 2 linhas para instalar fontes do google

  + ```
    link: [
    			{ rel: 'icon', type: 'image/png', href: '/favicon.png' },
    			{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap' },
    		],
    css: [
            '~/assets/css/global.css',
            '~/assets/css/components.css',
            ],
    ```

  + ```
    modules: [
    		['cookie-universal-nuxt', { alias: 'cookiz' }],
    	],
    
    ```

  + ```
    tailwindcss: {
    		// Esse viewr é para gerar um link onde há todas as clases de css geradas pelo tailwind.
    		// colocamos como false para agilizar o desenvolvimento, mas pode colocar como true para ver as classes criadas
    		viewer: false,
    	},
    ```

    

+ **Configurar Tailwind**: `tailwind.config.js`
  + copiar do repo dele
+ **Configurar TypeScript**: `ts.config`
  + adicionar `@types/jest`

+ Em .`gitignore`
  + adicionar 'coverage'





