<style>
.xButton {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 0px solid #ee0000;
  background: #ee0000;
  text-align: center;
  color: black;
  display: inline-block;
  text-align: center;
}
</style>

<template>
  <ul>
    <li v-for="item in items" :key="item">
      <div style="display: inline;" v-html="item"></div>
      <div
        class="xButton noselect"
        onclick="this.parentNode.outerHTML = ''"
        v-on:click="removeItem(item)"
        style="margin-left: 0.5%; text-align: center;"
      >
        <div style="position: relative;top: -0.15em;">x</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TodoList",
  props: {
    items: {
      type: Array,
      required: true
    },
    db: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeItem(item) {
      var myTable = this.db.items;
      var self = this;

      (async function() {
        var myItems = await myTable.toArray();
        var tempItems = self.items.indexOf(item);
        myTable.delete(myItems[tempItems].id);

        self.items.splice(self.items.indexOf(item), 1);
      })();
    }
  }
};
</script>