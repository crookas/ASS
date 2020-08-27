<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      width="900"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          <v-icon light left>{{ titleIcon }}</v-icon>
          {{ dialogTitle }}
        </v-card-title>

        <v-card-text>
          {{ dialogDescription }}
        </v-card-text>

        <slot></slot>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            rounded
            @click.stop="show=false"
          >
            CANCEL
          </v-btn>
          <v-btn
            color="primary"
            rounded
            @click="do_action"
          >
            CREATE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    dialogTitle: {
      type: String,
      required: true,
      default: "Default dialog title"
    },
    titleIcon: {
      type: String
    },
    dialogDescription: {
      type: String,
      default: "Default dialog description"
    },
    dialogAction: {
      type: String,
      default: "DeafultAction"
    }
  },

  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    do_action() {
      var action = this.dialogAction
      //alert("Performing action: " + action)
      this.$emit('action',action)
    },
  }
}
</script>