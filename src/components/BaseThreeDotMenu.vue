<template>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list
          nav
          dense
        >
          <v-list-item-group  color="primary">
            <v-list-item
              v-for="(item, i) in MenuItems"
              :key="i"
              @click="do_actions(item.text)"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
</template>

<script>
    export default {
        props: {
            MenuItems: {
                // Array of menu items must be in this format:
                // action_menu_items: [
                //     {text: "Download Asset Spreadsheet",icon: "mdi-clipboard-list-outline"},
                //     {text: "Download Purchasing Spreadsheet",icon: "mdi-clipboard-list-outline"},
                //     {text: "Update Selected Items",icon:"mdi-playlist-edit"},
                // ],
                type: Array,
                required: true,
            },
        },
        methods: {
            do_actions: function(value) {
              // emit the event to the parent
              this.$emit('menuAction',value)
            }
        }
    }
</script>