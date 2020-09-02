//LoginForm.vue

<template>
    <v-form>
        <v-container>
            
            <v-row align="center">
                <!-- <v-col
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
                </v-col> -->
                <v-col
                    cols="12"
                    md="2"
                >
                    <v-btn 
                        v-if='this.loggedIn'
                        rounded 
                        color="primary"
                        v-on:click="logout()"
                    >
                    Logout
                    </v-btn>
                    <v-btn 
                        v-else
                        rounded 
                        color="primary"
                        v-on:click="login()"
                    >
                    Login
                    </v-btn>
                </v-col>       
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    import { mapActions } from 'vuex'
    import { mapGetters } from 'vuex'
    export default {
        name: 'LoginForm',
        computed: {
            ...mapGetters({
                // is a user logged in?
                loggedIn: 'isUserLoggedIn'
            }),
        },
        methods: {
            ...mapActions([
            'setUser',
            'clearUser'
            ]),
            login() {
                var user = {
                    userName: 'crookas',
                    firstName: 'Andrew',
                    lastName: 'Crook',
                    auth_level: 'full_access'
                }
                this.setUser(user)
            },
            logout() {
                this.clearUser()
                if(this.$route.name !== 'landing') {
                    this.$router.push( '/' )
                }
            }
        }
    }
</script>

<style scoped>
    .pushdowntextfield {
        margin-top: 20px;
    }
</style>