<script>
import ChartDemo from './demo/ChartDemo.vue'
import FormDemo from './demo/FormDemo.vue'
import TableDemo from './demo/TableDemo.vue'

export default {
  name: 'App',
  components: { FormDemo, TableDemo, ChartDemo }
}
</script>

<template>
  <div id="app">
    <el-tabs>
      <el-tab-pane label="MyForm">
        <FormDemo />
      </el-tab-pane>
      <el-tab-pane label="MyTable">
        <TableDemo />
      </el-tab-pane>
      <el-tab-pane label="MyCharts">
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
