<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div v-if="!isLogin" id="app">
		<div class="contenedor_todo">
			<center style="padding-top: 3%">
				<q-card class="card-login no-shadow f_MohrRounded_l">
						<q-card-section>
                            <img :src="avatar_default">
							<div class="text-h4 f_MohrRounded_l  bienvenido">{{ $t('login.bienvenido') }}</div>
						</q-card-section>
						<q-card-section style="padding-bottom: 0px;">
							<q-input  dense standout="bg-principal text-titulo" required :label="$t('login.email')" v-model='email' class="q-ml-md input-login border-radius">
								<template v-slot:before>
									<q-icon name="account_circle"  />
								</template>
							</q-input>
							<q-input  dense standout="bg-principal text-titulo" required :label="$t('login.pass')" v-model="password" class="q-ml-md input-login-2" :type="isPwd ? 'password' : 'text'">
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
							<!-- <span class='danger' style="padding: 10px;">{{error}}</span> -->
							<span style="padding-top: 10px;">
								<p class="f_MohrRounded_l">{{ $t('login.usuario_nuevo') }} <a  @click="$router.push('/registry')" class="bienvenido">{{ $t('login.registrate') }}</a></p>
							</span>
							<span>
								<p><a class="f_MohrRounded_l bienvenido" @click="$router.push('/forget')">{{ $t('login.olvido') }}</a></p>
							</span>
						</q-card-section>

						<q-card-section class="no-padding">
							<q-btn color="positive" rounded @click='authenticate'>{{ $t('login.btn_inicio') }}</q-btn>
						</q-card-section>
                        o inicia sesión con:
                        <q-card-section style="padding-top: 1%">
                              <g-signin-button
                                :params="googleSignInParams"
                                @success="onSignInSuccess"
                                icon="fab fa-google"
                                @error="onSignInError">
                                <q-avatar class="col float-left logo_google">
                                    <img :src="logo_google" class="img_google">
                                </q-avatar>
                                Google
                            </g-signin-button>
						</q-card-section>
				</q-card>
			</center>
		</div>
	</div>
</template>


<script src="./login.js">
</script>

<style lang="stylus" >
    @import './login.styl'
</style>
