import apiUrls from '../appURLs'
import headers from './headers'
import React from 'react';
import sha1 from 'sha1'
import superagent from 'superagent'

export default  {
    post: (data, url, isAuth) => {
        console.log('api post')
        let header = headers(isAuth);

        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                dataType: 'json',

                headers: header,

                body: JSON.stringify(data),
            };

            window.fetch(apiUrls.baseAppUrl + url, options)
                .then((res) => {
                    return res.json()
                })
                .then((json) => {

                    resolve(json)
                })
                .catch(error => reject(error))

        })
    },
    get: (url, isAuth) => {

        let header = headers(isAuth);

        return new Promise((resolve, reject) => {
            let options = {
                method: 'GET',
                dataType: 'json',
                headers: header,

            };

            window.fetch(apiUrls.baseAppUrl + url, options)
                .then((res) => {
                    return res.json()
                })
                .then((json) => {

                    resolve(json)
                })
                .catch(error => reject(error))

        })
    },

    uploadImage: (file) => {

        return new Promise((resolve, reject) => {

            let url = "https://api.cloudinary.com/v1_1/dqyb8sdlc/image/upload"
            const timeStamp = Date.now() / 1000
            const preset = 'o084xowa'
            const paramStr = 'timestamp=' + timeStamp + '&upload_preset=' + preset + 'QjDHP3mk7FaeYO4ZIPoCadztjH4'
            const encriptParams = sha1(paramStr)
            const params = {
                'api_key': '973266941424727',
                'timestamp': timeStamp,
                'upload_preset': preset,
                'signature': encriptParams
            }
            let uploadRequest = superagent.post(url)
            uploadRequest.attach('file', file)
            uploadRequest.field('upload_preset','o084xowa')
            uploadRequest.field('timestamp', timeStamp)
            uploadRequest.field('api_key','973266941424727')
            uploadRequest.field('signature', encriptParams)

            uploadRequest.end((error, response) => {
                if (error) {
                    reject(error)
                }
                resolve(response.body)
            })

        })
    }
}