<template>
    <div style="height: 100%;">
        <center>
            <q-card class="fondo_dashboard">
                <q-card-section>
                    <img :src="avatar_default">
                    <div class="text-h4 f_MohrRounded_l bienvenido">Bienvenido</div>
                </q-card-section>
            </q-card>
        </center>
    </div>
</template>

<script src="./dashboard.js">
export default {
    name: "dashboard"
};
</script>

<style lang="stylus" >
@import './dashboard.styl';
</style>
