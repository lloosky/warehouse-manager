<template>
  <div class="cancel-container">
    <div class="cancel-box">
      <h3>{{confirmMsg}}</h3>
      <input type="text" placeholder="Podaj przyczynę usunięcia zamówienia" v-model="reasonOfCancel">
      <div>
        <button class="button-normal accept-btn" @click="$emit('accept', reasonOfCancel)">Tak</button>
        <button class="button-normal decline-button" @click="$emit('decline')">Nie</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reasonOfCancel: ""
    };
  },
  props: { confirmMsg: String },
  methods: {}
};
</script>

<style scoped>
input {
  margin: 0px;
}
.cancel-container {
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
.cancel-box {
  display: grid;
  padding: 10px;
  width: 50%;
  height: 100%;
  background-color: #ffcd88;
  justify-self: center;
  align-self: center;
  border: 1px solid #e18500;
  grid-template-rows: auto;
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
