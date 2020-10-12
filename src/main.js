import Vue from "vue";
import App from "./App.vue";
import Dexie from "dexie";

Vue.config.productionTip = false;

var db = new Dexie("ToDoList");
db.version(1).stores({
  items: "++id,data"
});

var dbItems = [];
(async function() {
  var data = await db.items.toArray();
  for (var i in data) {
    dbItems[dbItems.length] = data[i].htmlEncodedText;
  }
})().then(() => {
  new Vue({
    render(h) {
      return h(App, { props: { items: dbItems, db: db } });
    }
  }).$mount("#app");

  document.getElementById("todoListBody").style.height = `${document
    .documentElement.clientHeight -
    (document.getElementById("myHeader").clientHeight + 15)}px`;

  // Get the input field
  var input = document.getElementById("itemInput");

  // Execute a function when the user releases a key on the keyboard
  input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("itemAdd").click();
    }
  });
});