// ImportPage.vue

<template>
  <v-container>
    <v-row class="text-left">
      <v-col class="mb-4">
        <h2 class="mb-3">
          Import Vendor Asset Report
        </h2>
        <p>Used by IT Asset Management Team to import vendor asset reports</p>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col>
        <baseFileInput 
          @workbook="processFile"
          @clearFile="clearFile"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
            v-if="fileImported"
            class="mx-left"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">FILE PROPERTIES</div>
                <v-list-item-subtitle>Created: {{ fileProperties.created }}</v-list-item-subtitle>
                <v-list-item-subtitle>Created by: {{ fileProperties.createdBy }}</v-list-item-subtitle>
                <v-list-item-subtitle>Last modified: {{ fileProperties.lastModified }}</v-list-item-subtitle>
                <v-list-item-subtitle>Last modified By: {{ fileProperties.lastModifiedBy }}</v-list-item-subtitle>
                <v-list-item-subtitle>Number rows: {{ fileProperties.numRows }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          v-if="fileImported"
          :headers="table_headers"
          :items="table_items"
          :item-key="table_key"
        >
        </v-data-table>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
    import baseFileInput from '../components/BaseXlsxInput'
    //import { mapGetters } from 'vuex'
    export default {
      name: 'ImportPage',
      components: {
          baseFileInput,
      },
    data () {
      return {
        fileProperties: {
          created: null,
          createdBy: null,
          lastModified: null,
          lastModifiedBy: null,
          numRows: null,
          numCols: null
        },
        fileImported: false,
        table_key: "rowNumber",
        table_headers: [
          { text: 'ORG', value: 'ORG_CODE' },
          { text: 'CAMPUS', value: 'CAMPUS_CODE' },
          { text: 'ROOM', value: 'ROOM_CODE' },
          { text: 'PURCHASED', value: 'PURCHASE_DATE',dataType: "Date" },
          { text: 'MAKE', value: 'MAKE' },
          { text: 'MODEL', value: 'MODEL' },
          { text: 'LOCATION', value: 'LOCATION' },
          { text: 'WARRANTY', value: 'WARRANTY_DATE', dataType: "Date" },
          { text: 'VALIDATED', value: 'ROW_DATA_VALID'},
        ],
        table_items: []
      }
    },
      methods: {
        clearFile() {
          this.table_items = []
          this.fileProperties = {}
          this.fileImported = false
        },
        processFile (file) {
          this.fileProperties.createdBy = file.creator
          this.fileProperties.lastModified = file.modified
          this.fileProperties.lastModifiedBy = file.lastModifiedBy
          this.fileProperties.created = file.created

          var worksheet = file.worksheets[0]

          this.fileProperties.numRows = worksheet.rowCount
          this.fileProperties.numCols = worksheet.columnCount
          this.fileImported = true
   
          // Pull the data from the spreadsheet in a workable format
          // first get headers from row1 (assumes row 1 is headers)
          var keys = worksheet.getRow(1).values

          worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => { 
            var rowData = {}           
            rowData['rowNumber'] = rowNumber
            // Iterate over all cells in a row (including empty cells)
            row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
              rowData[keys[colNumber]] = cell.value
            })
            // build location from campus and room
            var locCamp = rowData['CAMPUS_CODE']
            var locRoom = rowData['ROOM_CODE']
            var locBldg = null
            var locFull = null
            if(locRoom == null) {
              locFull = locCamp
            } else {
              var splitRoom = locRoom.split("-")
              var splitBldg = splitRoom[0].match(/[a-zA-Z]+|[0-9]+/g)
              locBldg = splitBldg[0]
              locFull = locCamp + ' - ' + locBldg + ' - ' + locRoom
            }
            rowData['LOCATION'] = locFull
            rowData['ROW_DATA_VALID'] = true
            var invalidCells = []
            if (rowData.rowNumber !== 1) {
              // VALIDATE ROW DATA
              if (!this.$store.getters.validator('location',rowData['LOCATION'])) {
                invalidCells.push('LOCATION')
              }
              if (!this.$store.getters.validator('org',rowData['ORG_CODE'])) {
                invalidCells.push('ORG_CODE')
              }
              if (!this.$store.getters.validator('make',rowData['MAKE'])) {
                invalidCells.push('MAKE')
              }
              if (!this.$store.getters.validator('model',rowData['MODEL'])) {
                invalidCells.push('MODEL')
              }
              rowData['INVALID_CELLS'] = invalidCells

              if (invalidCells.length > 0) {
                rowData['ROW_DATA_VALID'] = false
              }
              
              this.table_items.push(rowData) // leave out row 1 becasue its the headers
            }
          })
          console.log(this.table_items)
        }
      }
    }
</script>