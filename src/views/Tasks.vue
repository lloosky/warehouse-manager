<template>
  <div class="view-container">
    <div class="component-navigation">
      <h2>Zadania</h2>
    </div>
    <div class="table-header">
      <span>Lp.</span>
      <span>Pracownik</span>
      <span>Liczba zadań</span>
      <span>Wartość zadań</span>
    </div>
    <div class="table-row" v-if="(this.workerOneInfo != false)">
      <span>1</span>
      <span>Pracownik nr 1</span>
      <span>{{workerOne.length}}</span>
      <span>{{ formatCurrency(this.workerOneInfo.reduce((a, b) => a + b)) }}</span>
    </div>
    <div class="table-row" v-if="(this.workerTwoInfo != false)">
      <span>2</span>
      <span>Pracownik nr 2</span>
      <span>{{workerTwo.length}}</span>
      <span>{{ formatCurrency(this.workerTwoInfo.reduce((a, b) => a + b)) }}</span>
    </div>
    <div class="table-row" v-if="(this.workerThreeInfo != false)">
      <span>3</span>
      <span>Pracownik nr 3</span>
      <span>{{workerThree.length}}</span>
      <span >{{ formatCurrency(this.workerThreeInfo.reduce((a, b) => a + b)) }}</span>
    </div>
  </div>
</template>
<script>
import formatCurrency from "../utils/formatCurrency.js";

export default {
  name: "tasks",
  data() {
    return {
      workerOne: [],
      workerTwo: [],
      workerThree: [],
      show: false,
      workerOneInfo: [],
      workerTwoInfo: [],
      workerThreeInfo: []
    };
  },
  methods: {
    formatCurrency,
    updateWorkerOneInfo() {
      for (let i in this.workerOne) {
        this.workerOneInfo.push(this.workerOne[i].worth);
      }
    },
    updateWorkerTwoInfo() {
      for (let i in this.workerTwo) {
        this.workerTwoInfo.push(this.workerTwo[i].worth);
      }
    },
    updateWorkerThreeInfo() {
      for (let i in this.workerThree) {
        this.workerThreeInfo.push(this.workerThree[i].worth);
      }
    },
    checkTasks() {
      for (let i in this.orders) {
        if (this.orders[i].employee === "Worker #1") {
          this.workerOne.push({
            task: this.orders[i].id,
            worth: this.orders[i].orderedProductsValue
          });
        } else if (this.orders[i].employee === "Worker #2") {
          this.workerTwo.push({
            task: this.orders[i].id,
            worth: this.orders[i].orderedProductsValue
          });
        } else if (this.orders[i].employee === "Worker #3") {
          this.workerThree.push({
            task: this.orders[i].id,
            worth: this.orders[i].orderedProductsValue
          });
        } else {
          console.log("Brak danych o zadaniach")
        }
      }
    }
  },
  created() {
    this.$store.commit("GET_ORDERLIST");
    this.checkTasks();
    this.updateWorkerOneInfo();
    this.updateWorkerTwoInfo();
    this.updateWorkerThreeInfo();
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    }
  }
};
</script>
<style scoped>
.table-header,
.table-row {
  grid-template-columns: 5% 60% 15% 20%;
}
</style>
