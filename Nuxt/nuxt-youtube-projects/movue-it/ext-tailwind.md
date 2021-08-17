# TailWind

## Uma classe que agrupa várias calsse `@apply` 

O tailwind usa muitas classes.

Há uma forma de criar uma classe e agrupar várias classes do tailwind, usando `@aply``

`````css
.button {
	@apply p-6 rounded-md flex justify-center items-center font-semibold mt-8 transition-colors w-full;
}

.button.completed {
	@apply bg-white text-text border-b-2 border-green cursor-not-allowed h-20;
}
````
