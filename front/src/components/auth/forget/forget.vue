<template>
	<div class="contenedor_todo">
		<center>
			<q-card class="card-login login text-white">
				<q-card-section>
					<div class="text-h4 f_MohrRounded_l bienvenido">Olvide mi contraseña</div>
				</q-card-section>
				<q-card-section style="padding-bottom: 0px;">

					<q-input dark dense standout required label='Email' v-model='email' class="q-ml-md input-login">
						<template v-slot:before>
							<q-icon name="account_circle" />
						</template>
					</q-input>
					<span>
						<p><a class="f_MohrRounded_l" @click="$router.push('/login')" style="color: aqua;">Volver al Login</a></p>
					</span>
				</q-card-section>

				<q-card-section style="padding-top: 0px;">
					<q-btn color="info" rounded @click='enviar'>Enviar</q-btn>
				</q-card-section>
			</q-card>
		</center>
	</div>
</template>

<script src="./forget.js">
    export default {
        name: 'forget',
    }
</script>

<style lang="stylus" >
    @import './forget.styl'
</style>
