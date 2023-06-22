import { defineStore } from "pinia";
import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        loggedIn: localStorage.getItem("loggedIn") ?? false,
        user: JSON.parse(localStorage.getItem("user")),
    }),

    actions: {
        async login(credentials) {
            const { login } = (
                await useMutation({
                    mutation: gql`
                    mutation ($input: LoginInput!) { 
                        login(input: $input) 
                        { 
                            token 
                        } 
                    }`,
                    variables: { input: credentials },
                })
            ).data;

            if (!login) return;

            localStorage.setItem("token", `Bearer ${login.token}`);

            await apolloClient.resetStore();

            this.fetchUser();
        },

        fetchUser() {
            useQuery({
                    query: gql`
                        query {
                            me {
                                id
                                name
                                email
                                created_at
                                updated_at
                            }
                        }
                    `,
                })
                .then(({ data }) => {
                    this.loggedIn = true;
                    this.user = data.me;
                    localStorage.setItem("loggedIn", this.loggedIn);
                    localStorage.setItem("user", JSON.stringify(this.user));
                });
        },

        async logout() {
            const { logout } = (
                await useMutation({
                    mutation: gql`
                        mutation {
                            logout
                        }
                    `,
                })
            ).data;

            if (logout) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("loggedIn");

                this.loggedIn = false;
                this.user = null;

                await apolloClient.resetStore();
            }
        },
    },

    getters: {},
});
