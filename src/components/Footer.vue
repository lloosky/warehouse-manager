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
  background-color: #4a4a8cf5;
  bottom: -10px;
  left: 0px;
  position: fixed;
  color: white;
  width: 100%;
  padding-top: 5px;
  display: grid;
  grid-template-columns: auto;
  justify-self: center;
}
a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}
a:hover {
  text-decoration: none;
}
</style>
