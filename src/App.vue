<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <NavMenu />
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

  export default {
    name: 'App',
    components: {
      NavMenu,
      LoginForm,
    },
    data: () => ({
      //
    }),
    methods: {
      //
    }
  };
</script>
