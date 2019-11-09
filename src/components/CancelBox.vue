<template>
  <div class="cancel-container">
    <div class="cancel-box">
      <h3>{{confirmMsg}}</h3>
      <div>
        <input
          type="text"
          placeholder="Podaj przyczynę usunięcia zamówienia"
          v-model="reasonOfCancellation"
        />
        <div>
          <button
            class="button-normal accept-btn"
            @click="$emit('accept', reasonOfCancellation)"
          >Tak</button>
          <button class="button-normal decline-button" @click="$emit('decline')">Nie</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reasonOfCancellation: ""
    };
  },
  props: { confirmMsg: String },
  methods: {}
};
</script>

<style scoped>
input {
  margin: 0px;
  margin-bottom: 10px;
}
.cancel-container {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  width: 100%;
  height: 30%;
  position: absolute;
  top: 25%;
  left: 0%;
}
.cancel-box {
  display: grid;
  padding: 10px;
  width: 50%;
  height: 100%;
  background-color: #3f88c5;
  justify-self: center;
  border: 1px solid #163248;
  grid-template-rows: 50% 50%;
  color: white;
  -webkit-box-align: center;
  -ms-flex-align: center;
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
