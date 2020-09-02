<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <NavMenu 
         v-if='this.loggedIn'
      />
      <v-spacer></v-spacer>
      <LoginForm />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

  </v-app>
</template>

<script>
  import NavMenu from './components/NavMenu';
  import LoginForm from './components/LoginForm';
  import { mapGetters } from 'vuex'
  export default {
    name: 'App',
    components: {
      NavMenu,
      LoginForm,
    },
    computed: {
        ...mapGetters({
            // is a user logged in?
            loggedIn: 'isUserLoggedIn'
        }),
    },
    methods: {
      //
    }
  };
</script>
