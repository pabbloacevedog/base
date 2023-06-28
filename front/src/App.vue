<template>
    <div>
        <auth-login v-if="!isLogin" />
        <main-layout v-if="isLogin" />
        {{ title }}
    </div>
</template>

<script>
import { defineComponent, computed, defineAsyncComponent, ref } from 'vue'
import { useAuthStore } from 'stores/auth/auth'
export default defineComponent({
    name: 'App',
    components: {
        AuthLogin: defineAsyncComponent(() => import('components/auth/login/login.vue')),
        // eslint-disable-next-line vue/no-reserved-component-names, vue/no-unused-components
        MenuLayout: defineAsyncComponent(() => import('layouts/menu/menu.vue')),
    },
    setup() {
        const authStore = useAuthStore()
        const title = ref('Quasar App')
        const isLogin = computed(() => authStore.getLogin)
        return { isLogin, title }
    },
    created: function () {
        console.log('created', this)
    }
})
</script>
