# 04 - Componente CountDonw

Mexemos em  ``/pages/index.ts``.

Criamos a pasta ``/utils`` e colocamos algumas funçôes. 
+ Estamos seguindo o padrâo de SOLID. Nâo deixando muitas coisas técnincas no próprio arquivo vue, e sim, separarmos
+ Ex: playAudio() deixamos seu corpo de fora, pois
  + 1. Poderá ser utilizado 
  + 2. Nâo é responsabildiade do index.ts sebaer fazer o playAudio, e sim, de apenas fazê-lo

## Git Diff

````
 M assets/css/global.css
 M docs/ext-nuxt-working.md
 D docs/start-project.png
 M pages/index.vue
?? components/atoms/CountdownDigits.vue
?? components/molecules/Countdown.vue  
?? docs/04-component-countdown.md
?? docs/ext-tailwind.md
?? docs/npx-create-nuxt-project.png
?? movue-it-nuxt-03.rar
?? movue-it-nuxt-04.rar
?? utils/ 
````
