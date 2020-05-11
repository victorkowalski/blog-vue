<template>
  <div>
    <main-header></main-header>
    <h1>{{ msg }}</h1>
    <h1>{{ msgback }}</h1>
    <h2>Ecosystem</h2>
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors"  v-bind:key="error"><font color="red">{{ error }}</font></li>
            </ul>
      </p>
  </div>
</template>

<script>
import api from '../api'
import MainHeader from '@/components/layout/MainHeader'

export default {
  name: 'HelloWorld',
  components: {
    MainHeader
  },
  data () {
    return {
      errors: [],
      msg: 'Welcome to Your Vue.js App',
      msgback: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      api.request('get', '/index')
        .then(response => {
          console.log(response)
          // this.toggleLoading()

          var data = response.data
          if (data.status === 'error') {
            this.errors.push(data.message)
          }
          if (data.status === 'success') {
            this.msgback = data.message
          }
        })
    }
  }
}
</script>
