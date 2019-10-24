<template>
  <div class="calc-container">
    <hr />
    <h4>Wybierz format</h4>
    <div class="calc-inputs">
      <div style="padding:5px;">
        <p>Wybierz format</p>
        <select v-model="selected" id="listOfFormats">
          <option
            v-for="product in productsFormats"
            v-bind:value="product.value"
          >{{product.format }}</option>
        </select>
      </div>
      <div style="padding:5px;">
        <p>Ilość sztuk:</p>
        <input type="text" v-model="items" />
      </div>
    </div>
    <button @click="multiply" style="width:100%">przelicz</button>
    <div>
      <span>Wynik:</span>
      <span id="calcResult"></span>
      <span>
        m
        <sup>2</sup>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "calculator",
  data() {
    return {
      selected: "",
      items: "",
      result: ""
    };
  },
  methods: {
    multiply() {
      this.result = 0;
      const productFormat = document.getElementById("listOfFormats").value;
      this.result += productFormat * this.items;
      document.getElementById("calcResult").innerHTML =
        Math.round(this.result * 100) / 100;
    }
  },
  computed: {
    productsFormats() {
      return [
        { format: "30x60 cm", value: 0.18 },
        { format: "30,5x61 cm", value: 0.185 },
        { format: "40x60 cm", value: 0.24 },
        { format: "60x60 cm", value: 0.36 },
        { format: "120x60 cm", value: 0.72 },
        { format: "120x120 cm", value: 1.44 }
      ];
    }
  },
  created() {
    this.$store.commit("GET_PRODUCTLIST");
  }
};
</script>
<style scoped>
select,
input {
  width: 100%;
}
.calc-inputs {
  display: grid;
  grid-template-columns: auto auto;
}
</style>
