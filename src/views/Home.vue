<template>
  <div>
    <sidebar-menu :menu="menu" :collapsed="!!componentInstance"></sidebar-menu>
    <main>
      <component v-if="!!componentInstance" :is="componentInstance"></component>
      <div v-else class="text-center fa-3x">
        <h1 class="fa-lg">Choose a component to inspect</h1>
      </div>
    </main>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";

export default {
  name: "Home",
  components: {
    SidebarMenu
  },
  data() {
    return {
      componentFilename: this.$route.params.id,
      componentInstance: null
    };
  },
  watch: {
    "$route.params.id"(id) {
      this.componentFilename = id;
      this.updateComponentInstance();
    }
  },
  created() {
    this.updateComponentInstance();
  },
  computed: {
    filenames() {
      const requireModule = require.context(
        "@/components/_design",
        true,
        /\.design\.vue$/
      );
      return requireModule.keys().map(filename => {
        return filename.replace(/(^\.\/|\.design\.vue$)/g, "");
      });
    },
    fileGroups() {
      let filenames = this.filenames;
      return this.makeTree(filenames.map(path => ({ path })));
    },
    menu() {
      return [
        {
          header: true,
          title: "Components",
          hiddenOnCollapse: true
        },
        ...this.fileGroups
      ];
    }
  },
  methods: {
    updateComponentInstance() {
      this.componentInstance = this.getComponentInstance(
        this.componentFilename
      );
    },
    getComponentInstance(filename) {
      if (!filename) {
        return;
      }
      return () => import(`@/components/_design/${filename}.design`);
    },
    makeTree(arr = []) {
      let tree = {};
      arr.map(addnode);
      return childToArray(tree);

      function addnode(obj) {
        let splitpath = obj.path.replace(/^\/|\/$/g, "").split("/");
        let ptr = tree;
        for (let i = 0; i < splitpath.length; i++) {
          let node = {
            title: splitpath[i]
          };
          if (i == splitpath.length - 1) {
            node.href = `/${obj.path}`;
          }
          ptr[splitpath[i]] = ptr[splitpath[i]] || node;
          if (i !== splitpath.length - 1) {
            ptr[splitpath[i]].child = ptr[splitpath[i]].child || {};
            ptr = ptr[splitpath[i]].child;
          }
        }
      }

      function childToArray(obj) {
        let newObj = [];
        for (var i in obj) {
          if (!obj[i].child) {
            newObj.push(obj[i]);
          } else {
            let child = Object.values(obj[i].child);
            newObj.push({ ...obj[i], child: childToArray(child) });
          }
        }
        return newObj;
      }
    }
  }
};
</script>

<style scoped>
main {
  padding-left: 3rem !important;
}
</style>
<style>
.v-sidebar-menu .vsm--link{
      min-height: 3rem;
}
</style>