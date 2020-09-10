<template>
    <v-container>
        <div class="text-center">
            <v-btn
                rounded
                :loading="loading"
                :disabled="loading"
                color="primary"
                class="ma-2 white--text"
                @click="loader = 'loading'"
            >
            Upload
            <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
        </div>
    </v-container>

</template>

<script>
  export default {
    name: "BaseUploadButton",
    data () {
      return {
        loader: null,
        loading: false,
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
  }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>