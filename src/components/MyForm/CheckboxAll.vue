<script>
export default {
  name: 'CheckboxAll',
  props: {
    value: { type: Array },
    option: { type: Object },
    events: { type: Object },
    options: { type: Array }
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      localVal: []
    }
  },
  watch: {
    value: {
      handler(cur) {
        this.localVal = [...cur]
      },
      deep: true
    }
  },
  computed: {
    ableOptions() {
      return this.options?.filter(o => !o.disabled)
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.isIndeterminate = false
      this.$emit('input', val ? this.ableOptions.map(o => o.value) : [])
    },
    handleCheckChange(val) {
      this.checkAll = val.length === this.ableOptions.length
      this.isIndeterminate =
        val.length > 0 && val.length < this.ableOptions.length
      this.$emit('input', val)
    }
  }
}
</script>

<template>
  <div class="checkbox-all">
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      v-bind="option"
      @change="handleCheckAllChange"
    >
      全选
    </el-checkbox>
    <el-checkbox-group
      v-model="localVal"
      @change="handleCheckChange"
      v-bind="option"
      v-on="events"
    >
      <el-checkbox
        v-for="{ value, label, ...o } in options"
        :key="value"
        :label="value"
        v-bind="o"
      >
        {{ label }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<style lang="scss" scoped>
.checkbox-all {
  display: flex;
  // align-items: center;
}

.el-checkbox:first-of-type {
  margin-right: 1em;
}
</style>
