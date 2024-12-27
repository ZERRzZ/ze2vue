<script>
import ChartDemo from './demo/ChartDemo.vue'
import FormDemo from './demo/FormDemo.vue'
import TableDemo from './demo/TableDemo.vue'

export default {
  name: 'App',
  components: { FormDemo, TableDemo, ChartDemo },
  data() {
    return {
      tab: 'MyCharts'
    }
  }
}
</script>

<template>
  <div id="app">
    <el-tabs v-model="tab">
      <el-tab-pane label="MyForm" name="MyForm">
        <FormDemo />
      </el-tab-pane>
      <el-tab-pane label="MyTable" name="MyTable">
        <TableDemo />
      </el-tab-pane>
      <el-tab-pane label="MyCharts" name="MyCharts">
        <ChartDemo />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
#app {
  width: 100%;
  height: 100%;

  > .el-tabs {
    width: 100%;
    height: 100%;
    padding: 1em;
  }
}
</style>
