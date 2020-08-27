<template>
  <div>
    <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              icon 
              v-bind="attrs" 
              v-on="on" 
              to="/"
            >
              <v-icon >mdi-home</v-icon>
            </v-btn>
          </template>
          <span>Home</span>
        </v-tooltip>
       <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              icon 
              v-bind="attrs" 
              v-on="on" 
              to="/search"
            >
              <v-icon >mdi-text-box-search</v-icon>
            </v-btn>
          </template>
          <span>Search for Assets</span>
        </v-tooltip>

       <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              icon 
              v-bind="attrs" 
              v-on="on"
              to="/create"
            >
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </template>
          <span>Create New CI</span>
        </v-tooltip>

       <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon 
              v-bind="attrs" 
              v-on="on"
              to="/import"
            >
              <v-icon>mdi-plus-box-multiple</v-icon>
            </v-btn>
          </template>
          <span>Import Vendor Asset Report</span>
        </v-tooltip>     

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon 
              v-bind="attrs" 
              v-on="on"
              to="/bulk_update"
            >
              <v-icon>mdi-database-edit</v-icon>
            </v-btn>
          </template>
          <span>Bulk Update from Spreadsheet</span>
        </v-tooltip>  
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon 
              v-bind="attrs" 
              v-on="on"
              to="/software"
            >
              <v-icon>mdi-minidisc</v-icon>
            </v-btn>
          </template>
          <span>Software</span>
        </v-tooltip>  

    </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    data () {
      return {
        //
      }
    }
  }
</script>