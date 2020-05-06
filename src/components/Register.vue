/* eslint-disable space-before-function-paren */
<template>
  <div id="register">
    <main-header />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">Register</div>
            <div class="card-body">

            <p v-if="errors.length">
              <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="error in errors"  v-bind:key="error"><font color="red"> {{ error }}</font></li>
                </ul>
            </p>

              <form @submit.prevent="register">
                <div class="form-group row">
                  <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                  <div class="col-md-6">
                    <input
                      class="form-control"
                      name="username"
                      placeholder="Username"
                      type="text"
                      v-model="username"
                    />
                  </div>
                </div>
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
                  <label
                    for="password-confirm"
                    class="col-md-4 col-form-label text-md-right"
                  >Confirm Password</label>
                  <div class="col-md-6">
                    <input
                      class="form-control"
                      name="password-confirm"
                      placeholder="Confirm Password"
                      type="password"
                      v-model="passwordConfirm"
                    />
                  </div>
                </div>
                <div class="form-group row mb-0">
                  <div class="col-md-6 offset-md-4">
                    <button type="submit" class="btn btn-primary btn-lg loading">Register</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import MainHeader from '@/components/layout/MainHeader'

export default {
  name: 'Register',
  components: {
    MainHeader
  },
  data (router) {
    return {
      errors: [],
      // loading: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    register () {
      // this.toggleLoading()
      this.errors = []
      const { username, email, password, passwordConfirm } = this

      this.validateForm()

      if (this.errors.length > 0) return null

      api.request('post', '/register', { username, email, password, passwordConfirm })
        .then(response => {
          console.log(response)
          // this.toggleLoading()
          // data: {status: "success", message: "user registered successfully"}
          // data: {status: "error", message: {…}}

          var data = response.data
          if (data.status === 'error') {
            var self = this
            data.message.forEach(function (item) {
              self.errors.push(item)
            })
          }
          if (data.status === 'success') {
            console.log(username + password)
            this.$router.push({ name: 'login', params: { p_email: email, p_password: password } })
          }
        })
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    validateForm () {
      if (!this.username) {
        this.errors.push('username required.')
      }

      if (!this.email) {
        this.errors.push('Email required.')
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.')
      }

      if (!this.password) {
        this.errors.push('password required.')
      } else if (this.password.length < 1) {
        this.errors.push('Password must be of minimum 5 characters length')
      }

      if (!this.passwordConfirm) {
        this.errors.push('passwordConfirm required.')
      } else if (this.passwordConfirm !== this.password) {
        this.errors.push('Password confirmation doesn\'t match Password')
      }
    }
    /* toggleLoading () {
      this.loading = this.loading === '' ? 'loading' : ''
    } */
  }
}
</script>
