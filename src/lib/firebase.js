const axios = require('axios')

const authKey = process.env.FIREBASE_SECRET
const baseUrl = 'https://webpush-test-a5073.firebaseio.com/'

const firebase = {
    request: function(method, path, data) {
        const params = method == 'get' ? data : {}
        params.auth = authKey

        return axios({
            method: method,
            url: baseUrl + path + '.json',
            params: params,
            data: method != 'get' ? data : {}
        })
    },

    all: function(requests) {
        return axios.all(requests)
    },

    spread: function(callback) {
        return axios.spread(callback)
    },

    get: function(key, params) {
        return this.request('get', key, params || {})
    },

    add: function(path, data) {
        return this.request('post', path, data)
    },

    update: function(path, data) {
        return this.request('put', path, data)
    },

    settings: function(user) {
        return this.get('settings/' + user)

        return new Promise((resolve, reject) => {
            this.get('settings/' + user)
                .then(response => {
                    const data = response.data || {
                        salary: 0,
                        deduction: 0
                    }
                })
                .catch(error => console.log(error))
        })
    },


}

module.exports = firebase
