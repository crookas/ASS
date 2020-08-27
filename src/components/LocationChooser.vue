// locationChooser.vue
<template>
    <v-container>
        <v-row align="center">
            <v-col class="d-flex" >
                <v-select
                    v-model="campus"
                    @change="campus_change"
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
                    v-model="building"
                    @change="building_change"
                    :items="building_items"
                    label="Building"
                    item-text="name"
                    item-value="locationId"
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
                    v-model="room"
                    @change="room_change"
                    :items="room_items"
                    label="Room"
                    item-text="name"
                    item-value="locationId"
                    hint=""
                    dense
                    persistent-hint
                    return-object
                >
                <v-icon slot="prepend">mdi-office-building</v-icon>
                </v-select>
            </v-col>           
        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'locationChooser',
        computed: {
            ...mapGetters({
                // grab the campus items from the STORE
                campus_items: 'locationCampuses',
            }),
        },
        props: {
            reset: {
                type: String
            }
        },
        data () {
            return {
                building_items: [],
                room_items: [],
                campus: [],
                building: [],
                room: [],
                locationObject: {
                    name: null,
                    fullName: null,
                    locationId: null
                },
            }
        },
        methods: {
            campus_change () {
                this.room_items = [] // reset rooms
                this.locationObject.name = this.campus.name
                this.locationObject.fullName = this.campus.fullName
                this.locationObject.locationId = this.campus.locationId
                this.building_items = this.$store.getters.locationBuildingsRooms(this.campus.locationId)
                this.$emit('location',this.locationObject)
            },
            building_change () {
                this.locationObject.name = this.building.name
                this.locationObject.fullName = this.building.fullName
                this.locationObject.locationId = this.building.locationId
                this.room_items = this.$store.getters.locationBuildingsRooms(this.building.locationId)
                this.$emit('location',this.locationObject)
            },
            room_change() {
                this.locationObject.name = this.room.name
                this.locationObject.fullName = this.room.fullName
                this.locationObject.locationId = this.room.locationId
                this.$emit('location',this.locationObject)
            },
        }
    }
</script>