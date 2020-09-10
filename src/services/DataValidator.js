import { store } from '../store/store'

export default {
    validLocation(value) {
        if(value === null) {
            return false
        } else {
            return store.state.marval_data.locations.includes(value)
            //return true
        }
    },
    validOrg(value) {
        if(value === null) {
            return false
        } else {
            return true
        }
    },
    validCampus(value) {
        if(value === null) {
            return false
        } else {
            return true
        }
    },
    validMake(value) {
        if(value === null) {
            return false
        } else {
            return true
        }
    },
    validModel(value) {
        if(value === null) {
            return false
        } else {
            return true
        }
    },
    validDate(value) {
        if(value === null) {
            return false
        } else {
            return true
        }
    },
}