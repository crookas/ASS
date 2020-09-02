// DataTable.vue

<template>
  <v-card>
    <v-card-title>
      <!--Configuration Item Data
      <v-spacer></v-spacer>-->
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Filter"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer></v-spacer>

      <BaseThreeDotMenu
        v-bind:MenuItems="[
          {text: 'Download Asset Spreadsheet',icon: 'mdi-clipboard-list-outline'},
          {text: 'Create Purchasing Spreadsheet',icon: 'mdi-clipboard-list-outline'},
          {text: 'Update Selected Items',icon:'mdi-playlist-edit'},
        ]"
        @menuAction="open_dialog"
      />

    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="table_headers"
      :items="table_items"
      :search="search"
      :single-select="singleSelect"
      :item-key="table_key"
      show-select
      
    >
      <template v-slot:item.attr_WARRANTY_DATE="{ item }">
        <span>{{new Date(item.attr_WARRANTY_DATE).toLocaleString("en-AU",{ year: '2-digit',month: '2-digit',day: '2-digit' })}}</span>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">More info about {{ item.name }}</td>
      </template>  
    </v-data-table>


    <DialogAssetReport 
      :visible="showAssetDialog"
      @close="showAssetDialog=false"
      @assetReport='doDialogAction'
    />
    <DialogPurchasingSpreadsheet
      :visible="showPurchasingDialog"
      :configItems="selected"
      @close="showPurchasingDialog=false" 
      @purchasingSpreadsheet='doDialogAction'
    />
    <DialogUpdate
      :visible="showUpdateDialog"
      :configItems="selected"
      @close="showUpdateDialog=false"
      @updateCi='doDialogAction'
    />


      <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}

        <template v-slot:action="{ attrs }">
          <v-btn v-bind="attrs" text @click="snack = false">Close</v-btn>
      </template>
    </v-snackbar>


  </v-card>


</template>

<script>
  import DialogAssetReport from  './DialogAssetReport.vue'
  import DialogPurchasingSpreadsheet from  './DialogPurchasingSpreadsheet.vue'
  import DialogUpdate from './DialogUpdateCI.vue'
  import BaseThreeDotMenu from './BaseThreeDotMenu.vue'

  export default {
    name: "DataTable",
    // Table data needs to be passed in from parent as Prop
    components: {
      BaseThreeDotMenu,
      DialogAssetReport,
      DialogPurchasingSpreadsheet,
      DialogUpdate,
    },
    props: {
      table_headers: {
        // Table column headers
        type: Array,
        required: true,
      },
      table_items: {
        // Table data
        type: Array,
        required: true,
      },
      table_key: {
        // what field to use as key
        required: true
      }
    },
    data () {
      return {
        showPurchasingDialog: false,
        showAssetDialog: false,
        showUpdateDialog: false,
        search: '',
        singleSelect: false,
        selected: [],
        action_menu_items: [
          {text: "Download Asset Spreadsheet",icon: "mdi-clipboard-list-outline"},
          {text: "Download Purchasing Spreadsheet",icon: "mdi-clipboard-list-outline"},
          {text: "Update Selected Items",icon:"mdi-playlist-edit"},
        ],
        snack: false,
        snackColor: '',
        snackText: ''
      }
    },
    methods: {
      open_dialog(value) {
        
        if(value.includes("Update")) {
          this.showUpdateDialog = true
        }
        if(value.includes("Asset")) {
          this.showAssetDialog = true
        }
        if(value.includes("Purchasing")) {
          this.showPurchasingDialog = true
        }

        //this.snack = true
        //this.snackColor = 'info'
        //this.snackText = 'Dialog opened'

      },
      doDialogAction(value) {
        //console.log("Performing action:")
        //console.log(value)
        switch(value.action) {
          case 'assetReport' :
            this.showAssetDialog = false
            break
          case 'createPurchasingSpreadsheet' :
            this.showPurchasingDialog = false
            break
          case 'update' :
            this.showUpdateDialog = false
            break
        }

        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Action completed: ' + value.action

      }
    }
  }
</script>