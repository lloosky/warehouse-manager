<template>
  <div class="view-container">
    <div class="component-navigation">
      <h2>Zadania</h2>
    </div>
    <div id="worker-one" v-for="item in workerOne">{{ item.tasks.worth }}</div>
    <div id="worker-two">Pracownik nr2 = {{ workerTwo }}</div>
    <div id="worker-three">Pracownik nr3 = {{ workerThree }}</div>
    <div class="table-header">
      <span>Lp.</span>
      <span>Pracownik</span>
      <span>Liczba zadań</span>
      <span>Wartość zadań</span>
    </div>
    <div class="table-row"></div>
  </div>
</template>
<script>
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
    updateWorkerOneInfo() {
      console.log(this.workerOne);
      for (let i in this.workerOne) {
        this.workerTwoInfo.push(this.workerOne[i].worth);
      }
      console.log(this.workerTwoInfo.reduce((a, b) => a + b));
    },
    updateWorkerTwoInfo() {
      console.log(this.workerTwo);
      for (let i in this.workerTwo) {
        this.workerTwoInfo.push(this.workerTwo[i].worth);
      }
      console.log(this.workerTwoInfo.reduce((a, b) => a + b));
    },
    updateWorkerThreeInfo() {
      console.log(this.workerThree);
      for (let i in this.workerThree) {
        this.workerTwoInfo.push(this.workerThree[i].worth);
      }
      console.log(this.workerTwoInfo.reduce((a, b) => a + b));
    },
    checkTasks() {
      for (let i in this.orders) {
        if (this.orders[i].employee === "Worker #1") {
          this.workerOne.push({
            tasks: {
              task: this.orders[i].id,
              worth: this.orders[i].orderedProductsValue
            }
          });
        } else if (this.orders[i].employee === "Worker #2") {
          this.workerTwo.push({
            task: this.orders[i].id,
            worth: this.orders[i].orderedProductsValue
          });
        } else {
          this.workerThree.push({
            task: this.orders[i].id,
            worth: this.orders[i].orderedProductsValue
          });
        }
      }
    }
  },
  created() {
    this.$store.commit("GET_ORDERLIST");
    this.checkTasks();
    this.check();
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    }
  }
};
</script>
<style scoped>
div {
  color: black;
}
.table-header,
.table-row {
  grid-template-columns: 5% 60% 15% 20%;
}
</style>
