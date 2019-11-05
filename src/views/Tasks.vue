<template>
  <div class="view-container">
    <div class="modal-container">
      <div class="modal-box" v-if="show">
        <form action>
          <label for>Imię:</label>
          <input type="text" />
          <label for>Nazwisko:</label>
          <input type="number" />
          <label for>Jednostka:</label>
          <input type="text" />
          <label for>Cena netto:</label>
          <input type="number" />
        </form>
        <div class="btn-container">
          <button>dodaj zadanie</button>
        </div>
      </div>
    </div>
    <div class="component-navigation">
      <h2>Zadania</h2>
      <div class="btn-container">
        <button class="confirm-btn">dodaj zadanie</button>
      </div>
    </div>
    <div id="worker-one">Pracownik nr1 = {{ workerOne }}</div>
    <div id="worker-two">Pracownik nr2 = {{ workerTwo }}</div>
    <div id="worker-three">Pracownik nr3 = {{ workerThree }}</div>
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
      show: false
    };
  },
  methods: {
    checkTasks() {
      for (let i in this.orders) {
        if (this.orders[i].employee === "Worker #1") {
          this.workerOne.push({ task: this.orders[i].id });
        } else if (this.orders[i].employee === "Worker #2") {
          this.workerTwo.push({ task: this.orders[i].id });
        } else {
          this.workerThree.push({ task: this.orders[i].id })
        }
      }
    }
  },
  created() {
    this.$store.commit("GET_ORDERLIST");
    this.checkTasks();
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    }
  }
};
</script>
<style>
</style>
