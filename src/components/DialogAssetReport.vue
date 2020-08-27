<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      width="900"
      scrollable
    >

      <v-card>
        <v-card-title class="headline grey lighten-2">
          <v-icon left light>mdi-clipboard-list-outline</v-icon>
          Download an Asset Report Spreadsheet
        </v-card-title>

        <v-card-text>
          <v-container>

            <v-row>
              <v-col>
                <header>Default</header>
                <v-switch v-model="serial" label="Serial"></v-switch>
                <v-switch v-model="blueplate" label="Blueplate"></v-switch>
                <v-switch v-model="owner" label="Owner (org)"></v-switch>
                <v-switch v-model="make" label="Make"></v-switch>
                <v-switch v-model="model" label="Model"></v-switch>
                <v-switch v-model="cost" label="Cost"></v-switch>
                <v-switch v-model="warranty" label="Warranty Date"></v-switch>
                <v-switch v-model="location" label="Location"></v-switch>
                <v-switch v-model="usageType" label="Usage Type"></v-switch>
                <v-switch v-model="purpose" label="Purpose"></v-switch>
              </v-col>
              <v-col>
                <header>Hardware</header>
                <v-switch v-model="bios" label="BIOS Version"></v-switch>
                <v-switch v-model="chassis" label="Chassis"></v-switch>
                <v-switch v-model="cpu" label="CPU"></v-switch>
                <v-switch v-model="graphics" label="Graphics"></v-switch>
                <v-switch v-model="hdd" label="HDD Size"></v-switch>
                <v-switch v-model="mac" label="MAC Address"></v-switch>
                <v-switch v-model="mac_wireless" label="MAC Wireless"></v-switch>
                <v-switch v-model="memory" label="Memory"></v-switch>
                <v-switch v-model="monitor" label="Monitor(s)"></v-switch>
                <v-switch v-model="os" label="Operating System"></v-switch>
                <v-switch v-model="uuid" label="UUID"></v-switch>
              </v-col>
              <v-col>
                <header>User Info</header>
                <v-switch v-model="lastlogonEmail" label="Last Logon Date"></v-switch>
                <v-switch v-model="lastlogonDate" label="Last Logon Email"></v-switch>
                <v-switch v-model="usedBy" label="Used By"></v-switch>
              </v-col>
              <v-col>
                <header>Purchase Info</header>
                <v-switch class="mx-2" label="Mandatory"></v-switch>
                <v-switch class="mx-2" label="Multiple"></v-switch>
                <v-switch class="mx-2" label="Row"></v-switch>
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
            @click.stop="show=false"
          >
            CANCEL
          </v-btn>
          <v-btn
            color="primary"
            rounded
            @click="do_action"
          >
            Download
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'AssetReportDialog',
    props: {
      visible: {
        type: Boolean,
        required: true,
        default: false
      },
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
    data () {
      return {
        serial: true,
        blueplate: true,
        owner: true,
        make: true,
        model: true,
        cost: true,
        warranty: true,
        location: true,
        usageType: true,
        purpose: true,
        hdd: false,
        memory: false,
        chassis: false,
        lastlogonEmail: false,
        lastlogonDate: false,
        usedBy: false
      }
    },
    methods: {
      do_action() {
        alert("Downloading Asset Report")
      },
    }
  }
</script>