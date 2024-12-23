<script>
import MyTable from '../components/MyTable'

export default {
  name: 'TableDemo',
  components: { MyTable },
  data() {
    return {
      table: {
        data: [
          {
            column1: 'column1',
            column2: 'column2',
            column3: 'column3',
            column4: 'column4',
            column5: 'column5'
          },
          {
            column1: 'column11',
            column2: 'column22',
            column3: 'column33',
            column4: 'column44',
            column5: 'column55'
          }
        ]
      },
      columns: [
        { label: '表头1', prop: 'column1' },
        { label: '表头2', prop: 'column2' },
        { label: '表头3', prop: 'column3' },
        { label: '表头4', prop: 'column4', type: 'custom' },
        { label: '表头5', prop: 'column5', type: 'tag' },
        {
          label: '操作',
          type: 'action',
          items: [
            {
              name: '查看',
              icon: 'el-icon-view',
              onClick: () => console.log('查看')
            },
            {
              name: '删除',
              icon: 'el-icon-delete',
              onClick: () => console.log('删除')
            }
          ]
        }
      ]
    }
  }
}
</script>

<template>
  <MyTable :table="table" :columns="columns">
    <template #column4="{ row }">
      <span style="color: red">{{ row.column4 }}</span>
    </template>
  </MyTable>
</template>

<style lang="scss" scoped></style>
