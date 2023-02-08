<template>
  <header>
    <h1 class="site_title">
      <RouterLink :to="{ name: 'home' }">~ Pizza Planet ~</RouterLink>
    </h1>
    <nav>
      <RouterLink class="link" :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink class="link" :to="{ name: 'menuLink' }">Menu</RouterLink>
      <RouterLink class="link" :to="{ name: 'aboutLink' }">About</RouterLink>
      <RouterLink class="link" :to="{ name: 'adminLink' }">Admin</RouterLink>
    </nav>
    <h2>The #1 Place For Pizza</h2>
  </header>
</template>
