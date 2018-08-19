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

    get: function(key, params) {
        return this.request('get', key, params)
    },

    add: function(path, data) {
        return this.request('post', path, data)
    },

    update: function(path, data) {
        return this.request('put', path, data)
    }
}

module.exports = firebase
