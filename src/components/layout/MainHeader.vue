<template>
  <header class="main-header">
    <span class="logo-mini">
      <p>Header Logo</p>
    </span>
    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <!-- Navbar Right Menu -->
      <!--div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <messages-menu></messages-menu>
          <notifications-menu></notifications-menu>
          <tasks-menu></tasks-menu>
          <user-menu :user="user"></user-menu>
        </ul>
      </div-->
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MainHeader'
}
</script>