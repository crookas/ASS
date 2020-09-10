export default {
    userData: state => {
        return state.user
    },
    isUserLoggedIn: state => {
        //return !!state.user.userName
        if (typeof state.user.userName === 'undefined' || state.user.userName === null) {
            return false
        } else {
            return true
        }
    },
    hardwareCICount() {
        return state => state.marval_data.hardware_data.length;
    },
    hardwareData: state => {
        return state.hardware_data
    },
    locationCampuses: state => {
        // return Campuses only from locations table
        if (state.debug) console.log('store.getter.locationsCampus triggered')
        if(!state.marval_data.locations) {
            return []
        } else {
            return state.marval_data.locations.filter(o => o.parentLocationId == null )
        }
    },
    locationBuildingsRooms: (state) => (parentLocationId) => {
        if (state.debug) console.log('store.getter.locationBuildingsRooms triggered parentLocationId='+parentLocationId)
        if(!parentLocationId) {
            return []
        } else {
            return state.marval_data.locations.filter(o => o.parentLocationId == parentLocationId)
        }
    },
    orgs: state => {
        return state.marval_data.orgs;
    },
    purposes: state => {
        return state.marval_data.purposes;
    },
    statuses: state => {
        return state.marval_data.statuses;
    },
    makes: state => {
        return state.marval_data.makes;
    },
    models: (state) => (makeId) => {
        if (state.debug) console.log('store.getter.models triggered makeId='+makeId)
        if(!makeId) {
            return state.marval_data.models
        } else {
            return state.marval_data.models.filter(o => o.makesId == makeId)
        }
    },
    validator: (state) => (dataType,data) => {
        // validates data before import returns boolean true or false
        if (state.debug) {console.log('store.getter.validData triggered dataType='+dataType+' data='+data)}
        switch(dataType) {
            case 'location':
                if(state.marval_data.locations.filter(location => location.fullName === data).length > 0) { return true }
                return false
            case 'org':
                if(state.marval_data.orgs.filter(org => org.name === data).length > 0) { return true }
                return false
            case 'make':
                if(state.marval_data.makes.filter(make => make.name === data).length > 0) { return true }
                return false
            case 'model':
                if(state.marval_data.models.filter(model => model.name === data).length > 0) { return true }
                return false
            case 'date':
                // figure out how to test for valid date
                // maybe turn into a date object or something??
                return false
            default:
                return false
        }
    }
}