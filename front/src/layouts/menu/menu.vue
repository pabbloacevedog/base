<template>
	<q-layout view="lHh LpR fFf" class="contenedor">
        <q-header class="transparent" v-if="$q.platform.is.desktop">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="miniState = !miniState" />

                <q-toolbar-title>
                    <BuscarHome/>
                </q-toolbar-title>
                <div>
                    <BtnNotificaciones/>
                </div>
                <div>
                    <ChipUsuario :funciones="funciones_chip"/>
				</div>
            </q-toolbar>
        </q-header>
        <q-drawer 
            v-model="mostrarDrawer" 
            side="left"          
            :width="180"
            :breakpoint="500"
            content-class="bg-primary text-positive"
            class="menu_lateral"
            show-if-above
            :mini="miniState"

            v-if="$q.platform.is.desktop"
        >
            <q-list>
                <div v-if="existe_empresa" class="column items-center">
                    <AvatarMenuEmpresa :datos_empresa="datos_empresa" :state="miniState"/>
                </div>
                 <!-- <q-separator /> -->
                <div v-for="(menuItem, index) in menuList" :key="index">
                    <q-item
                            clickable
                            v-ripple
                            :active="link === menuItem.router"
                            :to="menuItem.router"
                            @click="link = menuItem.router"
                            class="item_menu q-ma-sm"
                            >
                        <q-item-section avatar style="min-width: 24px !important;">
                            <q-icon :name="menuItem.icono" />
                        </q-item-section>
                        <q-item-section class="text-titulo">{{ menuItem.nombre }}</q-item-section>
                    </q-item>
                    <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
                </div>
            </q-list>
        </q-drawer>
		<q-page-container v-if="$q.platform.is.mobile" class="container_color_mobile">
			<router-view/>
		</q-page-container>
        <q-page-container v-else class="container_color">
			<router-view/>
		</q-page-container>
        <q-footer elevated v-if="$q.platform.is.mobile" style="height: 65px;padding-top: 2%;padding-bottom: 2%;">
            <q-toolbar style="padding-right: 0px; padding-left:8px" >
                <div class="row" style="    width: 100%;">
                    <div class="col" style="padding-left: 4%;">
                        <q-btn
                        size="16px"
                        round
                        color="secondary"
                        icon="home"
                        @click="$router.push('/')"
                        />
                        <!-- <q-btn fab icon="home" color="accent" @click="$router.push('/')" size="xl" /> -->
                    </div>
                    <div class="col">
                        <q-btn icon="close" class="close" color="red" dark flat round @click="logout" size="16px">
                            <q-tooltip content-class="tooltip-menu" :offset="[10, 10]">
                                Salir
                            </q-tooltip>
                        </q-btn>
                        <!-- <q-btn
                        size="17px"
                        round
                        color="accent"
                        icon="explore"
                        /> -->
                    </div>
                    <div class="col">
                        <q-btn
                        size="16px"
                        round
                        color="secondary"
                        icon="add"
                        @click="openDialog"
                        />
                    </div>
                    <div class="col">
                        <q-btn
                        size="16px"
                        round
                        color="secondary"
                        icon="far fa-comments"
                        @click="$router.push('/messages')"
                        >
                        </q-btn>
                    </div>
                    <div class="col">
                        <q-btn round @click="goProfile">
                            <q-avatar size="50px">
                                <img :src="src_avatar">
                            </q-avatar>
                            <q-tooltip content-class="tooltip-menu" :offset="[10, 10]">
                                {{nombre}}
                            </q-tooltip>
                        </q-btn>
                    </div>
                </div>
			</q-toolbar>
        </q-footer>
        <q-dialog v-model="mostrar_ajustes_usuario" transition-show="fade slide-down">
            <AjustesUsuario :usuario_id="usuario_id" />
        </q-dialog>
	</q-layout>
</template>

<script src="./menu.js">
</script>
<style lang="stylus" >
	@import './menu.styl'
</style>
