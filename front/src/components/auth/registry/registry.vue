<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="contenedor_todo row">
        <div class="col-7 logo_registro">
            <center style="">
                <q-card class="transparent no-shadow">
                    <q-card-section >
                        <img :src="avatar_default">
                    </q-card-section>
                </q-card>
            </center>
        </div>
        <div class="col-5 form_registro">
            <center style="">
                <form>
                <q-card class="form_registro transparent f_MohrRounded_l no-shadow">
                    <q-card-section >
                        <div class="text-h3 f_MohrRounded unete">{{ $t('registro.titulo') }}</div>
                    </q-card-section>
                    <q-card-section style="padding: 10% 10%;">
                        <div>
                            <div style="float:left">
                                <q-input  dense standout required :label="$t('registro.nombre')" v-model='name' class="q-ml-md">
                                    <template v-slot:before>
                                        <q-icon  name="account_circle" />
                                    </template>
                                </q-input>
                            </div>
                            <div style="float:rigth;">
                                <q-input  dense standout required :label="$t('registro.apellido')" v-model='lastname' class="q-ml-md namelast" style=""/>
                            </div>
                        </div>
                        <q-input  dense standout required :label="$t('registro.email')" v-model='email' class="q-ml-md input-reg">
                            <template v-slot:before>
                                <q-icon name="email" />
                            </template>
                        </q-input>
                        <q-input  dense standout required :label="$t('registro.pass')" v-model="password" class="q-ml-md ultimo-input" :type="isPwd ? 'password' : 'text'">
                            <template v-slot:before>
                                <q-icon name="vpn_key"  />
                            </template>
                            <template v-slot:append>
                                <q-icon
                                    :name="isPwd ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="isPwd = !isPwd"
                                />
                            </template>
                        </q-input>
                        <span class='danger' style="padding: 10px;">{{error}}</span>
                        <span>
                            <p class="texto">{{ $t('registro.usuario_antiguo') }} <a href="/login" class="unete">{{ $t('registro.inicia_sesion') }}</a></p>
                        </span>
                        </q-card-section>

                        <q-card-section style="padding-top: 0px;">
                            <q-btn color="positive" rounded @click='register'>{{ $t('registro.btn_inicio') }}</q-btn>
                        </q-card-section>
                </q-card>
                </form>
            </center>
        </div>

	</div>
</template>

<script src="./registry.js">
</script>

<style lang="stylus" >
@import './registry.styl';
</style>
