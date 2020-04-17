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
                      v-model="password_confirm"
                    />
                  </div>
                </div>
                <div class="form-group row mb-0">
                  <div class="col-md-6 offset-md-4">
                    <button type="submit" class="btn btn-primary">Register</button>
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
import MainHeader from '@/components/layout/MainHeader'

export default {
  name: 'Register',
  components: {
    MainHeader
  },
  data (router) {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    register () {
      // const { username, email, password, passwordConfirm } = this
    // console.log(username + email + password + password_confirm)

      /* api.request('post', '/register', {
        username,
        password
      }) */
    }
  }
}
</script>
