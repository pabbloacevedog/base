<template>
	<q-toolbar style="padding-right: 0px; padding-left:8px" class="toolbar_theme">
		<q-btn style="margin-right:11px" flat round class="q-mr-sm">
			<div class="text-h5 f_panterick">Fancy</div>
		</q-btn>
		<q-toolbar-title class="row justify-center" style="padding-left: 18%;">
			<q-input dark dense standout v-model="text" input-class="text-right" class="q-ml-md buscador" label="Buscar...">
				<template v-slot:append>
					<q-icon v-if="text === ''" name="search" />
					<q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
				</template>
			</q-input>
		</q-toolbar-title>
		<div class="espacio-derecho-menu">
			<q-btn icon="account_circle" outline rounded color="primary" label="Iniciar Sesión"  class="q-mr-sm text-white" @click="$router.push('/login')">
			</q-btn>
			<q-btn icon="person_add" outline rounded color="primary" label="Registrate"  class="q-mr-sm text-white" @click="$router.push('/registry')">
			</q-btn>
		</div>

	</q-toolbar>
</template>

<script src="./header.js">
</script>
<style lang="stylus" >
	@import './header.styl'
</style>
