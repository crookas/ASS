//LoginForm.vue

<template>
    <v-form>
        <v-container>
            <v-row align="center">
                <v-col
                    cols="12"
                    md="5"
                >
                    <div class="pushdowntextfield">
                        <v-text-field
                            v-model="username"
                            label="E-mail"
                            required
                            prepend-icon="mdi-account"
                        ></v-text-field>
                    </div>
                </v-col>
                <v-col
                    cols="12"
                    md="5"
                >
                    <div class="pushdowntextfield">
                        <v-text-field
                            v-model="password"
                            label="Password"
                            :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showpass ? 'text' : 'password'"
                            name="password"
                            @click:append="showpass = !showpass"
                        ></v-text-field>
                    </div>
                </v-col>
                <v-col
                    cols="12"
                    md="2"
                >
                    <v-btn 
                        rounded 
                        color="primary"
                        v-on:click="login()"
                    >
                    Login</v-btn>
                </v-col>       
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    export default {
        name: 'LoginForm',
        data () {
            return {
                showpass: false,
                username: null,
                password: null
            }
        },
        methods: {
            login() {
                this.$store.commit('setUserMutation', this.username)
            },
            logout() {
                console.log(this.username + ' has logged out')
            }
        }
    }
</script>

<style scoped>
    .pushdowntextfield {
        margin-top: 20px;
    }
</style>