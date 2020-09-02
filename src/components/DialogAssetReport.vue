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
                <v-switch v-model="serial" label="Serial" hide-details></v-switch>
                <v-switch v-model="blueplate" label="Blueplate" hide-details></v-switch>
                <v-switch v-model="owner" label="Owner (org)" hide-details></v-switch>
                <v-switch v-model="make" label="Make" hide-details></v-switch>
                <v-switch v-model="model" label="Model" hide-details></v-switch>
                <v-switch v-model="cost" label="Cost" hide-details></v-switch>
                <v-switch v-model="warranty" label="Warranty Date" hide-details></v-switch>
                <v-switch v-model="location" label="Location" hide-details></v-switch>
                <v-switch v-model="usageType" label="Usage Type" hide-details></v-switch>
                <v-switch v-model="purpose" label="Purpose" hide-details></v-switch>
              </v-col>
              <v-col>
                <header>Hardware</header>
                <v-switch v-model="bios" label="BIOS Version" hide-details></v-switch>
                <v-switch v-model="chassis" label="Chassis" hide-details></v-switch>
                <v-switch v-model="cpu" label="CPU" hide-details></v-switch>
                <v-switch v-model="graphics" label="Graphics" hide-details></v-switch>
                <v-switch v-model="hdd" label="HDD Size" hide-details></v-switch>
                <v-switch v-model="mac" label="MAC Address" hide-details></v-switch>
                <v-switch v-model="mac_wireless" label="MAC Wireless" hide-details></v-switch>
                <v-switch v-model="memory" label="Memory" hide-details></v-switch>
                <v-switch v-model="monitor" label="Monitor(s)" hide-details></v-switch>
                <v-switch v-model="os" label="Operating System" hide-details></v-switch>
                <v-switch v-model="uuid" label="UUID" hide-details></v-switch>
              </v-col>
              <v-col>
                <header>User Info</header>
                <v-switch v-model="lastlogonEmail" label="Last Logon Date" hide-details></v-switch>
                <v-switch v-model="lastlogonDate" label="Last Logon Email" hide-details></v-switch>
                <v-switch v-model="usedBy" label="Used By"></v-switch>
              </v-col>
              <v-col>
                <header>Purchase Info</header>
                <v-switch class="mx-2" label="Mandatory" hide-details></v-switch>
                <v-switch class="mx-2" label="Multiple" hide-details></v-switch>
                <v-switch class="mx-2" label="Row" hide-details></v-switch>
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
        bios: false,
        chassis: false,
        cpu: false,
        graphics: false,
        hdd: false,
        mac: false,
        mac_wireless: false,
        memory: false,
        monitor: false,
        os: false,
        uuid: false,
        lastlogonEmail: false,
        lastlogonDate: false,
        usedBy: false,
      }
    },
    methods: {
      do_action() {
        var assetReportObject = []
        assetReportObject.action = 'assetReport'
        this.$emit('assetReport',assetReportObject)

      },
    }
  }
</script>