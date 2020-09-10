<template>
    <v-container>
        <v-file-input
            v-model="file"
            show-size
            truncate-length="200"
            accept=".xlsx"
            label="Select xlsx file"
            @change="processFile"
        ></v-file-input>

      <v-row v-if="loading">
        <v-col>
            <p>Loading please wait...</p>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
    import Excel from 'exceljs'
    export default {
        name: 'BaseXlsxInput',
        data() {
            return {
                file: null,
                worksheet: null,
                loading: false,
            }
        },
        methods: {
            processFile() {
                this.$emit('clearFile') // forst clear any existing data
                if(this.file == null) {
                    return
                }
                this.loading = true
                const workbook = new Excel.Workbook()
                workbook.xlsx.load(this.file)
                .then(() => {
                    console.log('File loaded')
                    
                    /*
                    var worksheet = workbook.worksheets[0]

                    console.log(workbook.creator,'creator')
                    console.log(worksheet.rowCount,'row count')
                    console.log(worksheet.columnCount,'col count')

                    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
                        console.log("Row " + rowNumber + " = " + JSON.stringify(row.values))
                    }) */
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
                .finally(() => {
                    this.loading = false
                    this.$emit('workbook',workbook)
                })
            }
        }
    }
</script>