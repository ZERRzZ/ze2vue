<script>
export default {
  name: 'MyTable',
  props: {
    table: { type: Object },
    columns: { type: Array }
  },
  data() {
    return {}
  }
}
</script>

<template>
  <el-table
    :stripe="table.stripe === undefined ? true : table.stripe"
    v-bind="{ ...table, event: undefined }"
    v-on="table.event"
  >
    <el-table-column
      v-for="(c, i) in columns"
      show-overflow-tooltip
      :key="i"
      v-bind="{ ...c, items: undefined, opition: undefined }"
    >
      <template v-if="c.type === 'action'" v-slot="{ row }">
        <template v-for="({ name, icon, onClick }, i) in c.items">
          <el-popconfirm
            v-if="name === '删除'"
            style="margin-left: 10px"
            title="确定删除吗？"
            :key="name"
            @confirm="onClick(row)"
          >
            <template v-slot:reference>
              <el-button type="text" size="small" :icon="icon">
                {{ name }}
              </el-button>
            </template>
          </el-popconfirm>
          <el-button
            v-else
            type="text"
            size="small"
            :icon="icon"
            :key="i"
            @click="onClick(row)"
          >
            {{ name }}
          </el-button>
        </template>
      </template>
      <template v-else-if="c.type === 'tag'" v-slot="{ row, column }">
        <el-tag size="mini" v-bind="c.option || {}">
          {{ row[column.property] }}
        </el-tag>
      </template>
      <template v-else-if="c.type === 'custom'" v-slot="{ row, column }">
        <slot :name="c.prop" :row="row" :column="column" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped></style>
