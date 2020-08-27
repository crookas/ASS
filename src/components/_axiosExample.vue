// SearchTable.vue

<template>
  <div>
      <button v-on:click="getDeviceDataAxios">Get Device Data</button>
    <div>{{deviceDataList}}</div>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "DataTable",
        data() {
            return {
            deviceDataList: []
            };
        },
        methods: {
            getDeviceDataAxios() {
                axios.get('test_ci_data.json')
                .then(response => this.deviceDataList = response.data)
                .catch(error => {
                    this.errorMessage = error.message;
                    console.error("There was an error!", error);
                });
            }
        }
    };
</script>