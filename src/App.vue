<template>
<div class="container aligning">
    <router-link to="/" >
      <button class="btn btn-outline-dark">GIFS</button>
    </router-link>
    <router-link to="/stickers" >
      <button class="btn btn-outline-dark secLink">STICKERS</button>
    </router-link>
</div>
  <router-view/>
</template>

<style scoped>
.aligning{
    justify-content: center;
    display: flex;
    margin-top: 4%;
}
.secLink{
  margin-left: 20%;
}
</style>

