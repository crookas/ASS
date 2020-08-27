<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" >
        <v-select
            v-model="campus"
            :items="campus_items"
            label="Campus"
            item-text="name"
            item-value="id"
            hint=""
            dense
            persistent-hint
            return-object
        >
            <v-icon slot="prepend">mdi-office-building</v-icon>
        </v-select>
      </v-col>

      <v-col class="d-flex" >
        <v-select
            v-model="org"
            :items="org_items"
            label="Org2"
            item-text="name"
            item-value="id"
            hint=""
            dense
            persistent-hint
            return-object
        >
            <v-icon slot="prepend">mdi-account-group</v-icon>
        </v-select>
      </v-col>

      <v-col class="d-flex" >
        <v-select
            v-model="status"
            :items="status_items"
            label="Status"
            item-text="name"
            item-value="id"
            hint=""
            dense
            persistent-hint
            return-object
        >
            <v-icon slot="prepend">mdi-recycle-variant</v-icon>
        </v-select>
      </v-col>

      <v-col class="d-flex" >
        <v-menu
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
        >
            <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="date"
                label="Warranty Before"
                prepend-icon="mdi-calendar-range"
                readonly
                v-bind="attrs"
                v-on="on"
                dense
            ></v-text-field>
            </template>
            <v-date-picker v-model="date" @input="warranty_menu = false"></v-date-picker>
        </v-menu>
        </v-col>

       <v-col class="d-flex" >
        <v-select
            v-model="make"
            @change="make_change"
            :items="make_items"
            label="Make"
            item-text="name"
            item-value="id"
            hint=""
            dense
            persistent-hint
            return-object
        >
            <v-icon slot="prepend">mdi-laptop-chromebook</v-icon>
        </v-select>
      </v-col>

      <v-col class="d-flex" >
        <v-select
            v-model="model"
            :items="model_items"
            label="Model"
            item-text="name"
            item-value="id"
            dense
            persistent-hint
            return-object
        >
            <v-icon slot="prepend">mdi-laptop-chromebook</v-icon>
        </v-select>
      </v-col>

      <v-col class="d-flex" >
        <v-select
            v-model="more"
            @change="more_change"
            :items="more_items"
            label="More"
            dense
            persistent-hint
            return-object
        >
            <v-icon slot="prepend">mdi-arrow-down-drop-circle</v-icon>
        </v-select>
      </v-col>     
      <v-col class="d-flex" v-if="more">
          <v-text-field
            v-model="more_text"
            :label="more_textbox_label"
            dense
          ></v-text-field>
        </v-col>     
        <v-col class="d-flex" cols="1">
            <v-spacer></v-spacer>
             <v-btn @click="do_search" rounded color="primary" dark><v-icon left>mdi-magnify</v-icon>Search</v-btn>        
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
    // dropdown menu items are downloaded from server by main.js and saved as a prototype
    import { mapGetters } from 'vuex'
    export default {
        name: 'searchForm',
        computed: {
            ...mapGetters({
                // grab the menu items from the STORE
                campus_items: 'locationCampuses',
                org_items: 'orgs',
                status_items: 'statuses',
                make_items: 'makes',
                //model_items: 'modelsNew(2)', // filtered by store getter
            }),
        },
        data () {
            return {
                date: null,
                warranty_menu: false,
                more_items:['Blueplate','Purchase Order','Room','Serial','User'],
                more: null,
                more_text: null,
                more_textbox_label: null,
                model_items: null,
                campus: null,
                org: null,
                status: null,
                warranty: null,
                make: null,
                model: null,
                blueplate: null,
                po: null,
                room: null,
                serial: null,
                user: null,
                search_object: [], // this is the object that will be emitted to the parent searchPage
            }
        },
        mounted() {
            this.model_items = this.$store.getters.models(null)
        },
        methods: {
            make_change: function(value) {
                this.model_items = this.$store.getters.models(value.id)
            },
            more_change: function() {
                // update the label on the text box when the More dropdown is selected
                this.more_textbox_label = this.more;
            },
            do_search () {
                // populate search object with form inputs then emit it to parent
                this.search_object.campus = this.campus;
                this.search_object.org = this.org;
                this.search_object.status = this.status;
                this.search_object.warranty = this.date;
                this.search_object.make = this.make;
                this.search_object.model = this.model;
                this.search_object.more_field = this.more;
                this.search_object.more_value = this.more_text;
                this.$emit('search_criteria',this.search_object)
            },
        }
    }
</script>