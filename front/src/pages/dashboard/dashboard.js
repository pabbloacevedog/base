import Vue from 'vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default Vue.component('Dashboard', {
    $validates: true,
    data() {
        return {
            avatar_default: '../statics/icons/android-chrome-192x192.png',
        }
    },
    computed: {
        ...mapGetters({})
    },
    methods: {
    },
    components: {
        // CardUser: () => import('@/components/card_user/index.vue'),
        // Sections: () => import('@/components/sections/index.vue'),
        // CardProfilePhone: () => import('@/components/card_profile_phone/index.vue'),
        // NewPost: () => import('@/components/new_post/index.vue'),
        // CardProfile: () => import('@/components/card_profile/index.vue'),
        // PhotoViewer: () => import('@/components/photo_viewer/index.vue'),
        // BannerBack: () => import('@/components/banner_back/index.vue'),
        // Followers: () => import('@/components/followers/index.vue'),
        // Follows: () => import('@/components/follows/index.vue'),
        // Header: () => import('@layouts/auth/header/header.vue')
    },
    created() {
    },
    mounted() {
    },
    updated() {

    },
    watch: {
    }

})
