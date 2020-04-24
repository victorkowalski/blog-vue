<template>
  <div id="login">
    <main-header />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">Login</div>
            <div>User {{ p_username }}</div>
            <div class="card-body">
              <form method="POST" action="login">
                <div class="form-group row">
                  <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                  <div class="col-md-6">
                    <input
                      id="email"
                      type="email"
                      class="form-control @error('email') is-invalid @enderror"
                      name="email"
                      value="email"
                      required
                      autocomplete="email"
                      autofocus
                      v-model="username"
                    />
                    <span class="invalid-feedback" role="alert">
                      <strong>message</strong>
                    </span>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                  <div class="col-md-6">
                    <input
                      id="password"
                      type="password"
                      class="form-control @error('password') is-invalid @enderror"
                      name="password"
                      required
                      autocomplete="current-password"
                    />
                    <span class="invalid-feedback" role="alert">
                      <strong>message</strong>
                    </span>
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
                    <button type="submit" class="btn btn-primary">Login</button>
                    <a class="btn btn-link" href>Forgot Your Password?</a>
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
  name: 'Login',
  // props: ['p_username', 'p_password', 'p_message'],
  props: {
    p_username: String,
    p_password: String,
    p_message: String
  },
  components: {
    MainHeader
  },
  data (router) {
    return {
      section: 'Login',
      loading: '',
      // username: '',
      username: this.p_username !== '' ? this.p_username : '',
      password: '',
      response: ''
    }
  },
  methods: {
    checkCreds () {
      // const { username, password } = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      /* Making API call to authenticate a user */
      /*
      api
        .request('post', '/login', { username, password })
        .then(response => {
          this.toggleLoading();

          var data = response.data;
          /* Checking if error object was returned from the server */ /*
          if (data.error) {
            var errorName = data.error.name;
            if (errorName) {
              this.response =
                errorName === "InvalidCredentialsError"
                  ? "Username/Password incorrect. Please try again."
                  : errorName;
            } else {
              this.response = data.error;
            }

            return;
          }

          /* Setting user in the state and caching record to the localStorage */ /*
          if (data.user) {
            var token = "Bearer " + data.token;

            this.$store.commit("SET_USER", data.user);
            this.$store.commit("SET_TOKEN", token);

            if (window.localStorage) {
              window.localStorage.setItem("user", JSON.stringify(data.user));
              window.localStorage.setItem("token", token);
            }

            this.$router.push(data.redirect ? data.redirect : "/");
          }
        })
        .catch(error => {
          this.$store.commit("TOGGLE_LOADING");
          console.log(error);

          this.response = "Server appears to be offline";
          this.toggleLoading();
        });
        */
    },
    toggleLoading () {
      this.loading = this.loading === '' ? 'loading' : ''
    },
    resetResponse () {
      this.response = ''
    }
  }
}
</script>
