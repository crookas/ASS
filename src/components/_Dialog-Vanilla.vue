<template>
  <div class="text-center">
    <v-dialog
      v-model="vanillaDialog"
      width="800"
    >

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Dialog Title Goes here
        </v-card-title>

        <v-card-text>
           
          This is where the guts of the dialog goes

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            rounded
            @click="vanillaDialog = false"
          >
            CANCEL
          </v-btn>
          <v-btn
            color="primary"
            rounded
            @click="vanillaDialog = false"
          >
            ACTION
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {event_bus} from '../main'
  export default {
    name: 'vanilla_dialog',
    data () {
      return {
        vanillaDialog: false
      }
    },
    created () {
      var vm = this
      // This dialig component recieves its call from the event bus
      event_bus.$on('dialog', function (value) {
        vm.vanillaDialog = value
        console.log(value)
      })
    },
    methods: {
      //
    }
  }
</script>