<style>
html,
body {
  min-height: 100%;
  padding: 0;
  margin: 0;
}
#titleDiv {
  width: 100%;
  border-bottom: 5px solid gray;
}
#title {
  margin: 5px;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
}

#leftBorder,
#rightBorder {
  background: gray;
  position: fixed;
}
#leftBorder,
#rightBorder {
  top: 0;
  bottom: 0;
  width: 5px;
}
#leftBorder {
  left: 0px;
}
#rightBorder {
  right: 0px;
}

#topBorder,
#bottomBorder {
  left: 0;
  right: 0;
  height: 5px;
}
#topBorder {
  top: 10px;
  background: gray;
}
#bottomBorder {
  background: gray;
  position: absolute;
  bottom: 0px;
}
.toolTip {
  padding-left: 10px;
}
</style>

<template>
  <div id="app">
    <div id="leftBorder"></div>
    <div id="rightBorder"></div>
    <div id="topBorder"></div>

    <div id="myHeader">
      <div id="titleDiv" class="noselect">
        <h1 id="title" style="text-align: center">Todo List</h1>
      </div>
      <div id="addItemDiv" class="noselect">
        <input
          style="
            width: calc(100% - 36.101083032490976vw);
            margin-left: 10px;
            display: inline;
          "
          placeholder="Enter a item for the todo list"
          id="itemInput"
        />
        &nbsp;
        <div
          style="display: inline; border: 2px solid green; padding: 1px"
          class="noselect"
          id="itemAdd"
          v-on:click="addItem()"
        >
          Add Item
        </div>
      </div>
      <div id="toolTip1" class="toolTip" style="display: none">
        You can't add more than one item of the same name!
      </div>
      <div id="toolTip2" class="toolTip" style="display: none">
        You can't add a blank item!
      </div>
    </div>
    <div
      style="width: auto; postion: absolute; bottom: 10px; overflow-y: scroll"
      id="todoListBody"
    >
      <TodoList :items="items" :db="db" :key="componentKey" />
    </div>

    <div id="bottomBorder"></div>
  </div>
</template>

<script>
import TodoList from "./components/TodoList";

export default {
  name: "App",
  components: {
    TodoList,
  },
  data() {
    return {
      componentKey: true,
    };
  },
  props: ["items", "db"],
  methods: {
    addItem() {
      // Get the input field
      var input = document.getElementById("itemInput");

      if (input.value.length == 0) {
        //Show tooltip
        document.getElementById("toolTip2").style.display = "";
        setTimeout(() => {
          document.getElementById("toolTip2").style.display = "none";
        }, 3500);

        //Prevent adding item
        return;
      }

      var hasMatch = false;
      for (var item in this.items) {
        //Debug code
        console.log(`Existing Item is: ${this.items[item]} Input value is: ${this.htmlEncode(input.value).replace(/&#32;/g,"&nbsp;")}`);

        //Compare if exsiting items are the same as the one to be added
        if (this.items[item] === this.htmlEncode(input.value).replace(/&#32;/g, "&nbsp;")) {
          hasMatch = true;
          break;
        }
      }

      //If there was a match then show the tool tip otherwise add the item
      if (hasMatch) {
        document.getElementById("toolTip1").style.display = "";
        setTimeout(() => {
          document.getElementById("toolTip1").style.display = "none";
        }, 3500);
      } else {
        //Define a var for the encoded text
        let htmlEncodedText = this.htmlEncode(input.value).replace(/&#32;/g,"&nbsp;");

        this.$set(this.items, this.items.length, htmlEncodedText);

        //Add item to the db
        this.db.items.add({
          htmlEncodedText,
        });

        //Rerender the componets to update the "Vue"
        this.forceRerender();
      }
    },
    htmlEncode(str) {
      var buf = [];

      for (var i = str.length - 1; i >= 0; i--) {
        buf.unshift(["&#", str[i].charCodeAt(), ";"].join(""));
      }

      return buf.join("");
    },
    forceRerender() {
      this.componentKey = !this.componentKey;
    },
  },
};
</script>