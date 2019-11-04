<template>
  <div class="realize-container">
    <div class="realize-box">
      <h3>{{realizeMsg}}</h3>
      <div>
        <button class="button-normal accept-btn" @click="$emit('accept')">Tak</button>
        <button class="button-normal decline-button" @click="$emit('decline')">Nie</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: { realizeMsg: String },
  methods: {}
};
</script>

<style scoped>
.realize-container {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  width: 100%;
  height: 30%;
  /* background-color: rgba(0, 0, 0, 0.493); */
  position: absolute;
  top: 25%;
  left: 0%;
}
.realize-box {
  display: grid;
  padding: 10px;
  width: 50%;
  height: 100%;
  background-color: #ffcd88;
  justify-self: center;
  align-self: center;
  border: 1px solid #e18500;
  grid-template-rows: 50% 50%;
  align-items: center;
}
h3 {
  text-align: center;
}
button {
  width: 50%;
  justify-self: right;
}
.decline-button {
  justify-self: left;
}
</style>
