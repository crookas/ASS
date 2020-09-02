<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      width="900"
      scrollable
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          <v-icon light left>mdi-clipboard-list-outline</v-icon>
          Create a Purchasing Spreadsheet
        </v-card-title>

        <v-card-text>

          <v-row>
            <v-col>
              <v-alert type="info">This will generate an ALMS purchasing spreadsheet with a row for each of the selected CIs. If no CIs are selected you will get a blank purchasing spreadsheet.<br /> Selected CIs: {{configItems.length}}</v-alert>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p><i>Use the form below to auto-fill the fields in the purchasing spreadsheet. Alternatively, don't use the form and fill out the spreadsheet afterwards. However you roll.</i></p>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="serviceCall"
                label="Service Call #"
                required
              ></v-text-field>
              <v-text-field
                v-model="quoteNumber"
                label="Quote Number"
                required
              ></v-text-field>
              <v-text-field
                v-model="cost"
                label="Cost (ex GST)"
                required
              ></v-text-field>
              <v-text-field
                v-model="purchaseOrder"
                label="Purchase Order"
                required
              ></v-text-field>
              <v-text-field
                v-model="costCenter"
                label="Cost Center"
                required
              ></v-text-field>
            </v-col>
             <v-col>
              <v-text-field
                v-model="supplier"
                label="Supplier"
                required
              ></v-text-field>
              <v-text-field
                v-model="make"
                label="Make eg. Dell, Apple"
                required
              ></v-text-field>
              <v-text-field
                v-model="model"
                label="Model eg. Optiplex 7060AIO"
                required
              ></v-text-field>
            </v-col>           
          </v-row>
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
      configItems: {
        type: Array,
        required: true
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
    data () {
      return {
        serviceCall: null,
        quoteNumber: null,
        cost: null,
        purchaseOrder: null,
        costCenter: null,
        supplier: null,
        make: null,
        model: null,
      }
    },
    methods: {
      do_action() {
        var purchasingSpreadsheetObject = []
        purchasingSpreadsheetObject.action = 'createPurchasingSpreadsheet'
        purchasingSpreadsheetObject.serviceCall = this.serviceCall
        purchasingSpreadsheetObject.quoteNumber = this.quoteNumber
        purchasingSpreadsheetObject.cost = this.cost
        purchasingSpreadsheetObject.purchaseOrder = this.purchaseOrder
        purchasingSpreadsheetObject.costCenter = this.costCenter
        purchasingSpreadsheetObject.supplier = this.supplier
        purchasingSpreadsheetObject.make = this.make
        purchasingSpreadsheetObject.model = this.model
        purchasingSpreadsheetObject.configItems = this.configItems
        this.$emit('purchasingSpreadsheet',purchasingSpreadsheetObject)
      },
    }
  }
</script>