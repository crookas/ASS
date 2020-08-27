// Search.vue

<template>
  <v-container>
    <v-row class="text-left">
        <v-col class="mb-4">
          <h2 class="mb-3">Search for Configuration Items
        </h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <SearchForm 
          @search_criteria="send_search"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <DataTable 
          :table_headers="data_table_headers"
          :table_key="data_table_key"
          :table_items="data_table_items"
        />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import DataTable from '../components/DataTable.vue'
  import SearchForm from '../components/SearchForm.vue'

  export default {
    name: 'SearchPage',
    computed: {
      ...mapGetters({
          // grab the CI data from the STORE
          data_table_items: 'hardwareData'
      }),
    },
    components: {
      SearchForm,
      DataTable,
    },
    data () {
      return {
        data_table_key: "CIId",
        data_table_headers: [
          {
            text: 'Serial',
            value: 'serialNumber',
            align: 'start',
            sortable: false,
          },
          { text: 'Blueplate', value: 'systemId' },
          { text: 'Status', value: 'Status' },
          { text: 'Owner', value: 'ownerName' },
          { text: 'Make', value: 'make' },
          { text: 'Model', value: 'model' },
          { text: 'Used by', value: 'usedByName' },
          { text: 'Location', value: 'location' },
          { text: 'Warranty', value: 'attr_WARRANTY_DATE', dataType: "Date" },
        ],
      }
    },
    methods: {
      send_search: function(search_criteria) {
        // takes in an object from the searchForm component and gets the data from backend
        // searchForm EMITS the search criteria
        console.log(search_criteria)
      },
    }
  }  
</script>