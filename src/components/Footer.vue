<template>
  <div class="footer-container">
    <footer>
      <a href="https://www.linkedin.com/in/karol-świtalla-34a013180">
        <p>Designed & made by Karol Świtalla</p>
      </a>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
footer {
  text-align: center;
  bottom: -10px;
  right: 0px;
  position: fixed;
  width: 85vw;
  padding-top: 5px;
  display: grid;
  grid-template-columns: auto;
  justify-self: center;
}
a {
  text-decoration: none;
  color: #404040;
}
a:hover {
  text-decoration: none;
}
</style>
