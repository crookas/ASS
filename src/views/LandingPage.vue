// LandingPage.vue

<template>
  <v-container>
    <v-row class="text-left">
      <v-col class="mb-4">
        <h2 class="mb-3">
          Welcome to ALMS 3.0
        </h2>
        <p class="subheading font-weight-regular">
          For help and suggestions please raise a call with the 
          <a
            href="https://helpdesk.unisa.edu.au/MSM/Default.aspx"
            target="_blank"
          >IT Asset Management Team</a>
        </p>
      </v-col>
    </v-row>
    
    <v-row>
      <exportSpreadsheet />
    </v-row>
    
    
  </v-container>
</template>

<script>
    import exportSpreadsheet from '../components/BaseExportSpreadsheet'
    export default {
      name: 'LandingPage',
      components: {
          exportSpreadsheet
      },
      data () {
        return {
          location: [],
        }
      },
      methods: {
        setLocation(value) {
          this.location = value
        }
      }
    }
</script>