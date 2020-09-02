<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      width="900"
      scrollable
    >

      <v-card>
        <v-card-title class="headline grey lighten-2">
          <v-icon light left >mdi-playlist-edit</v-icon>
          Update Selected Configuration Item(s)
        </v-card-title>

        <v-card-text>
          <v-container>

            <v-row>
              <v-col v-if="configItems">
                <v-alert type="error">You are about to update {{configItems.length}} configuration items!</v-alert>
                <li v-for="item in configItems" :key="item.serialNumber">{{item.systemId}}</li>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col class="d-flex" >
                <v-select
                    v-model="status"
                    :items="status_items"
                    label="Status"
                    item-text="name"
                    item-value="id"
                    hint=""
                    dense
                    persistent-hint
                    return-object
                >
                    <v-icon slot="prepend">mdi-office-building</v-icon>
                </v-select>
              </v-col>
              <v-col class="d-flex" >
                <v-select
                    v-model="usage"
                    :items="[]"
                    label="Usage"
                    item-text="name"
                    item-value="id"
                    hint=""
                    dense
                    persistent-hint
                    return-object
                  >
                  <v-icon slot="prepend">mdi-office-building</v-icon>
                </v-select>
              </v-col>
              <v-col class="d-flex" >
                <v-select
                    v-model="purpose"
                    :items="purpose_items"
                    label="Purpose"
                    item-text="textValue"
                    item-value="textValue"
                    hint=""
                    dense
                    persistent-hint
                    return-object
                  >
                  <v-icon slot="prepend">mdi-office-building</v-icon>
                </v-select>
              </v-col>           
            </v-row>
            <v-row align="center">

              <locationChooser
                @location="setLocation"
              />
              {{location}}

            </v-row>           

            <v-row align="center">
              <v-col class="d-flex" cols="10" >
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Primary User E-mail"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="2">
                <v-btn
                  color="secondary"
                  rounded
                  @click="dialog = false"
                >
                  Validate
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            rounded
            
            @click="closeDialog"
          >
            CANCEL
          </v-btn>
          <v-btn
            color="primary"
            rounded
            @click="do_action"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import locationChooser from './LocationChooser'
  export default {
    name: 'UpdateDialog',
    components: {
      locationChooser
    },
    props: {
      visible: {
        type: Boolean,
        required: true,
        default: false
      },
      configItems: {
        type: Array,
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
      },
      ...mapGetters({
        // grab the menu items from the STORE
        org_items: 'orgs',
        status_items: 'statuses',
        purpose_items: 'purposes'
      }),
    },
    data () {
      return {
        building_items: [],
        room_items: [],
        status: null,
        usage: null,
        purpose: null,
        location: null,
        email: null,
        emailRules: [
          v => !!v || 'Invalid email format',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
      }
    },
    methods: {
      do_action() {
        //alert("Updating CIs")
        // populate update object with form inputs
        var update_object = []
        update_object.action = 'update'
        update_object.location = this.location
        update_object.status = this.status
        update_object.usage = this.usage
        update_object.purpose = this.purpose
        update_object.email = this.email
        update_object.CIs = this.configItems
        //console.log(update_object)

        this.$emit('updateCi',update_object)
      },
      setLocation(value) {
        this.location = value
      },
      closeDialog() {
        this.show = false
      }
    }
  }
</script>