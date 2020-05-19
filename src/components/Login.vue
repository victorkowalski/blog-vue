<template>
  <div id="login">
    <main-header />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
              <p v-if="errors.length">
              <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="error in errors"  v-bind:key="error"><font color="red">{{ error }}</font></li>
                </ul>
              </p>
              <form @submit.prevent="login">
                <div class="form-group row">
                  <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                  <div class="col-md-6">
                    <input
                      class="form-control"
                      name="email"
                      placeholder="Email"
                      type="text"
                      v-model="email"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                  <div class="col-md-6">
                    <input
                      class="form-control"
                      name="password"
                      placeholder="Password"
                      type="password"
                      v-model="password"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-6 offset-md-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" name="remember" id="remember" />
                      <label class="form-check-label" for="remember">Remember Me</label>
                    </div>
                  </div>
                </div>
                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button type="submit" class="btn btn-primary btn-lg" :disabled="loading">
                      <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                      Login
                    </button>
                    <a class="btn btn-link" href>Forgot Your Password?</a>
                  </div>
                </div>
              </form>
              <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button @click="AuthProvider('google')">auth Google</button>
                    <button @click="AuthProvider('github')">auth Github</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import api from '../api'
import MainHeader from '@/components/layout/MainHeader'
import VueSocialauth from 'vue-social-auth'

Vue.use(VueSocialauth, {

  providers: {
    google: {
      clientId: '',
      redirectUri: '/auth/github/callback' // Your client app URL
    }
  }
})

export default {
  name: 'Login',
  props: {
    p_email: String,
    p_password: String,
    p_message: String
  },
  components: {
    MainHeader
  },
  data (router) {
    return {
      errors: [],
      loading: false,
      // username: '',
      email: this.p_email !== '' ? this.p_email : '',
      password: this.p_password !== '' ? this.p_password : '',
      // password: '',
      response: ''
    }
  },
  methods: {
    login () {
      this.errors = []
      const { email, password } = this
      this.validateForm()
      if (this.errors.length > 0) return null

      this.toggleLoading()

      // this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      /* Making API call to authenticate a user */

      api
        .request('post', '/login', { email, password })
        .then(response => {
          this.toggleLoading()

          var data = response.data
          /* Checking if error object was returned from the server */
          if (data.status === 'error') {
            this.errors.push('Username/Password incorrect. Please try again.')
            return null
          }
          if (data.status === 'success') {
            if (data.user) {
              var token = 'Bearer ' + data.user.access_token.token

              this.$store.commit('SET_USER', data.user)
              this.$store.commit('SET_TOKEN', token)

              if (window.localStorage) {
                window.localStorage.setItem('user', JSON.stringify(data.user))
                window.localStorage.setItem('token', token)
              }

              this.$router.push('/')
            }
          }
          /* Setting user in the state and caching record to the localStorage */
        })
        .catch(error => {
          this.$store.commit('TOGGLE_LOADING')
          console.log(error)

          this.response = 'Server appears to be offline'
          this.toggleLoading()
        })
    },
    validateForm () {
      if (!this.email) {
        this.errors.push('E-Mail Address required')
      }
      if (!this.password) {
        this.errors.push('Password required')
      }
    },
    toggleLoading () {
      this.loading = !this.loading
    },
    /* resetResponse () {
      this.response = ''
    } */
    AuthProvider (provider) {
      // var self = this
      this.$auth.authenticate(provider).then(response => {
        this.SocialLogin(provider, response)
      }).catch(err => {
        console.log({err: err})
      })
    },
    SocialLogin (provider, response) {
      this.$http.post('/sociallogin/' + provider, response).then(response => {
        console.log(response.data)
      }).catch(err => {
        console.log({err: err})
      })
    }
  }
}
</script>
