<script setup>
import axios from 'axios';

const apiKey = 'tKQVbZ0XoYz53H8VyBsGTg==PftSnkW7fWnOl2yn';

const options = {
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/covid19',
    params: { country: 'sweden' },
    headers: {
        'X-Api-Key': apiKey
    }
};

axios.request(options)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
</script>
<template>
    <div>

    </div>
</template>
