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
      <span data-label="Lp.">1</span>
      <span data-label="Pracownik">Pracownik nr 1</span>
      <span data-label="Liczba zadań">{{workerOne.length}}</span>
      <span data-label="Wartość zadań">{{ formatCurrency(this.workerOneInfo.reduce((a, b) => a + b)) }}</span>
    </div>
    <div class="table-row" v-if="(this.workerTwoInfo != false)">
      <span data-label="Lp.">2</span>
      <span data-label="Pracownik">Pracownik nr 2</span>
      <span data-label="Liczba zadań">{{workerTwo.length}}</span>
      <span data-label="Wartość zadań">{{ formatCurrency(this.workerTwoInfo.reduce((a, b) => a + b)) }}</span>
    </div>
    <div class="table-row" v-if="(this.workerThreeInfo != false)">
      <span data-label="Lp.">3</span>
      <span data-label="Pracownik">Pracownik nr 3</span>
      <span data-label="Liczba zadań">{{workerThree.length}}</span>
      <span data-label="Wartość zadań">{{ formatCurrency(this.workerThreeInfo.reduce((a, b) => a + b)) }}</span>
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
        const workerTasks = {
          task: this.orders[i].id,
          worth: this.orders[i].orderedProductsValue
        };
        if (this.orders[i].employee === "Worker #1") {
          this.workerOne.push(workerTasks);
        } else if (this.orders[i].employee === "Worker #2") {
          this.workerTwo.push(workerTasks);
        } else if (this.orders[i].employee === "Worker #3") {
          this.workerThree.push(workerTasks);
        } else {
          console.log("Brak danych o zadaniach");
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
