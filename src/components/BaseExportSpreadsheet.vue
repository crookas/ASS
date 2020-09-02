

<template>
  <v-container>
      <v-btn type="button" v-on:click="createXlsx" color="error">Excel download</v-btn>
  </v-container>
</template>

<script>
import Excel from 'exceljs'
import FileSaver from 'file-saver'

export default {

  data() {
    return {
      columnHeaders: [
        {header: 'CIId', key: 'CIId'},
        {header: 'Blueplate', key: 'systemId'},
        {header: 'Owner', key: 'ownerName'},
        {header: 'Make', key: 'make'},
        {header: 'Model', key: 'model'},
        {header: 'Warranty', key: 'attr_WARRANTY_DATE'}
      ],
      rowData: this.$store.state.hardware_data
    }
  },
  props: {
    //columnHeaders : {
    //  type: Array,
      // array structure:
      //  [
      //    { header: 'Id', key: 'id'},
      //    { header: 'Name', key: 'name'},
      //    { header: 'D.O.B.', key: 'DOB'}
      //  ];
   // },
    //rowData: {
    //  type: Array,
      // array keys should match the column headers
    //}
  },
  computed: { 
    user () { 
      return this.$store.state.user
    }
  },
  methods: {
    createXlsx() {

      // put together filename. This is a bit harder than it should be
      var now = new Date();
      var nowDateString;
      const fileExtension = '.xlsx'
      nowDateString = now.getFullYear()
                      + ('0' + (now.getMonth()+1)).slice(-2)
                      + ('0' + now.getDate()).slice(-2)
      var fileName = "UniSA_AssetReport-" + nowDateString
      var fullFileName = "UniSA_AssetReport-" + nowDateString + fileExtension

      const blobType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
      
      // open up a new workbook
      const workbook = new Excel.Workbook()
      // set workbook properties
      workbook.creator = this.user.emailAddress
      workbook.lastModifiedBy = this.user.emailAddress
      workbook.created = now
      workbook.modified = now
      workbook.addWorksheet(fileName)
      var sheet = workbook.getWorksheet(1);
      sheet.columns = this.columnHeaders

      // set auto-filter on top row
      sheet.autoFilter = {
        from: {row: 1, column: 1},
        to: {row: 1, column: sheet.columnCount}
      }

      // iterate through each non-null cell in top row and set up style
      var topRow = sheet.getRow(1);
      topRow.eachCell(function(cell) {
        cell.fill = {
          type: 'pattern',
          pattern:'solid',
          fgColor:{argb:'157CFB'}
        },
        cell.font = {
          color: { argb: 'FFFFFF' },
          bold: true
        }
      });
      
      // add row data to spreadsheet
      this.rowData.forEach(function(row) {
        sheet.addRow(row)
      });




      // write the file to buffer or something then use fileSaver to save it
      workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data], { type: blobType }); 
        FileSaver.saveAs(blob,fullFileName);
      })
    }
  }
};
</script>