<template>
  <div class="view-container">
    <div class="component-navigation">
      <h2>Pulpit</h2>
      <h4 class="btn-container">{{getOrderDate}}</h4>
    </div>
    <div class="dashboard">
      <div class="board">
        <div class="board-title">
          <div>Ostatnie zamówienie: N-SR-{{this.orders[this.orders.length-1].id}}</div>
        </div>
        <div class="board-sub-title">Wartość:</div>
        <div
          class="board-sub-body"
        >{{formatCurrency(this.orders[this.orders.length-1].orderedProductsValue)}}</div>
        <div class="board-body"></div>
      </div>
      <div class="board">
        <div class="board-title">
          <div>Magazyn</div>
        </div>
        <div class="board-sub-title">Ilość produktów:</div>
        <div class="board-sub-body">{{this.products ? this.products.length : ''}}</div>
        <div class="board-body"></div>
      </div>
      <div class="board">
        <div class="board-title">
          <div>Do zrobienia</div>
        </div>
        <div class="board-sub-title">
          <div class="todoInputButton">
            <input type="text" placeholder="wpisz co masz w planach" v-model="taskContent"/>
            <button class="accept-btn" @click="addTask">dodaj</button>
          </div>
        </div>
        <div class="board-sub-body">
          <ul v-for="(task, index) in tasks" :key="index">
            <li>{{task.task}}</li>
            <button class="delete-btn" @click="deleteTask(task.id, index)">usuń</button>
          </ul>
        </div>
        <div class="board-body"></div>
      </div>
    </div>
  </div>
</template>
<script>
const API_HOST = process.env.VUE_APP_API_HOST;
import formatCurrency from "../utils/formatCurrency.js";
import moment from "moment";
moment.locale("pl");

export default {
  name: "dashboard",
  data() {
    return {
      taskContent: ""
    };
  },
  methods: {
    formatCurrency,
    addTask() {
      let txt = localStorage.getItem("authResponse");
      let obj = JSON.parse(txt);
      this.userToken = window.btoa(obj.body.token);

      this.$http
        .post(
          `${API_HOST}/api/tasks`,
          {
            task: this.taskContent
          }
        )
        .then(data => {
          console.log(data);
          this.orders.push({
            task: this.taskContent
          });
        })
        .catch(() => {
          console.log("ERROR");
        });
      this.taskContent = "";
      this.$store.commit("GET_TASKSLIST");
    },
    deleteTask(id, index) {
      this.$store.commit("REMOVE_TASK", {id, index})
    }
  },
  created() {
    this.$store.commit("GET_ORDERLIST");
    this.$store.commit("GET_PRODUCTLIST");
    this.$store.commit("GET_TASKSLIST");
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },
    tasks() {
      return this.$store.state.tasks;
    },
    products() {
      return this.$store.state.products;
    },
    getOrderDate() {
      return moment().format("ll");
    }
  }
};
</script>
<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 25% 25% 50%;
  grid-gap: 10px;
}
.btn-container {
  color: black;
}
.board {
  display: grid;
  grid-template-rows: 15% 35% 50%;
  background-color: #ffffff;
  height: 40vh;
  align-items: center;
  justify-items: center;
  color: black;
}
.board:last-of-type {
  grid-template-rows: 15% 25% 60%;
}
.board:last-of-type .board-sub-title {
  width: 100%;
  padding: 20px;
}
.board:last-of-type 
.board-sub-body {
  width: 100%;
  padding: 20px;
  overflow: auto;
}
.board-title {
  background: linear-gradient(
    45deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(216, 75, 75, 1) 0%,
    rgba(238, 139, 63, 1) 100%
  );
  width: 100%;
  height: 100%;
  padding: 5px;
  font-size: 15px;
  color: white;
  display: grid;
  justify-items: center;
  align-items: center;
  border-bottom: 1px solid #d2d2d2;
}
.board-sub-title {
  font-size: 1rem;
}
.board-sub-body {
  font-size: 50px;
  align-self: stretch;
}
.todoInputButton {
  display: grid;
  grid-template-columns: 70% 30%;
  grid-gap: 10px;
}
input {
  margin: 0;
  padding: 0;
  height: none;
}
ul {
  width: 100%;
  display: grid;
  list-style: none;
  margin: 0;
  padding: 0;
  grid-template-columns: 70% 30%;
}
ul li {
  border-bottom: 1px solid #d2d2d2;
  padding: 5px;
  transition: 0.3s all;
}
.delete-btn {
  border: none;
  background-color: transparent;
  border-bottom: 1px solid #ed8740;
}
</style>
