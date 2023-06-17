<template>
	<div class="contenedor_todo">
		<center>
			<q-card class="my-card login text-white">
				<q-card-section>
					<div class="text-h2 f_robotto_t">Restablecer contraseña</div>
				</q-card-section>
				<q-card-section style="padding-bottom: 0px;">

					<q-input dark dense standout required label='Password' v-model="password" class="q-ml-md input-login-2" :type="isPwd ? 'password' : 'text'">
						<template v-slot:before>
							<q-icon name="vpn_key" />
						</template>
						<template v-slot:append>
							<q-icon
								:name="isPwd ? 'visibility_off' : 'visibility'"
								class="cursor-pointer"
								@click="isPwd = !isPwd"
							/>
						</template>
					</q-input>
					<q-input dark dense standout required label='Password' v-model="password" class="q-ml-md input-login-2" :type="isPwd ? 'password' : 'text'">
						<template v-slot:before>
							<q-icon name="vpn_key" />
						</template>
						<template v-slot:append>
							<q-icon
								:name="isPwd ? 'visibility_off' : 'visibility'"
								class="cursor-pointer"
								@click="isPwd = !isPwd"
							/>
						</template>
					</q-input>
					<span style="padding: 10px;">
						<p color="purple"><a  @click="$router.push('/login')" style="color: aqua;">Volver al Login</a></p>
					</span>
				</q-card-section>

				<q-card-section style="padding-top: 0px;">
					<q-btn class="inicio text-white " rounded @click='guardar'>Enviar</q-btn>
				</q-card-section>
			</q-card>
		</center>
	</div>
</template>

<script src="./reset.js">
    export default {
        name: 'reset',
    }
</script>

<style lang="stylus" >
    @import './reset.styl'
</style>
