<script>
import CheckboxAll from './CheckboxAll.vue'

export default {
  name: 'MyForm',
  components: { CheckboxAll },
  props: {
    formProp: {
      type: Object,
      default: () => ({ model: {} })
    },
    items: { type: Array }
  },
  data() {
    return {}
  },
  computed: {
    formRef() {
      return this.$refs.form
    },
    form() {
      return this.formProp
    }
  },
  methods: {
    handleSubmit() {
      this.formRef.validate(bool => {
        bool && this.$emit('finish')
      })
    },
    handleReset() {
      this.formRef.resetFields()
      this.$emit('reset')
    }
  }
}
</script>

<template>
  <el-form ref="form" v-bind="form" :class="{ layout: !form?.inline }">
    <el-form-item
      v-for="{ type, name, label, item, option, event = {}, options } in items"
      :key="name"
      :prop="name"
      :label="label"
      v-bind="item"
    >
      <el-input
        v-if="type === 'text' || type === 'password' || type === 'textarea'"
        clearable
        show-word-limit
        :placeholder="option?.placeholder || '请输入'"
        :type="type"
        :rows="5"
        :show-password="type === 'password'"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      >
        <template v-slot:prepend>
          <slot :name="`${name}-input-prepend`" />
        </template>
        <template v-slot:append>
          <slot :name="`${name}-input-append`" />
        </template>
      </el-input>
      <el-input-number
        v-if="type === 'number'"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      />
      <el-radio-group
        v-else-if="type === 'radio' || type === 'radioB'"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      >
        <component
          v-for="{ value, label, ...o } in options"
          :is="type === 'radio' ? 'el-radio' : 'el-radio-button'"
          :key="value"
          :label="value"
          v-bind="o"
        >
          {{ label }}
        </component>
      </el-radio-group>
      <component
        v-else-if="type === 'select' || type === 'selectV'"
        :is="type === 'select' ? 'el-select' : 'el-select-v2'"
        clearable
        filterable
        placeholder="请选择"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      >
        <template #header>
          <slot :name="`${name}=select-header`"></slot>
        </template>
        <template v-for="{ label, value, ...o } in options">
          <el-option-group v-if="o.options" :key="label" :label="label">
            <el-option
              v-for="{ value, label, ...oo } in o.options"
              :key="value"
              :label="label"
              :value="value"
              v-bind="oo"
            >
              <slot :name="`${name}-select`" :item="{ value, label, ...oo }" />
            </el-option>
          </el-option-group>
          <el-option
            v-else
            :key="value"
            :label="label"
            :value="value"
            v-bind="o"
          >
            <slot :name="`${name}-select`" :item="{ label, value, ...o }" />
          </el-option>
        </template>
        <template #footer>
          <slot :name="`${name}=select-footer`"></slot>
        </template>
      </component>
      <el-checkbox-group
        v-else-if="type === 'checkbox'"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
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
      <CheckboxAll
        v-if="type === 'checkboxA'"
        v-model="form.model[name]"
        :option="option"
        :event="event"
        :options="options || []"
      />
      <el-switch
        v-else-if="type === 'switch'"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      />
      <el-time-picker
        v-else-if="type === 'time'"
        placeholder="请选择时间"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      />
      <el-date-picker
        v-else-if="type === 'date'"
        placeholder="请选择日期"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      />
      <el-cascader
        v-else-if="type === 'cascader'"
        clearable
        filterable
        style="width: 100%"
        placeholder="请选择"
        :options="options"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      >
        <template #default="{ node, data }">
          <slot :name="`${name}-cascader`" :item="{ node, data }">
            <span>{{ data.label }}</span>
            <!-- <span v-if="!node.isLeaf">({{ data.children.length }})</span> -->
          </slot>
        </template>
      </el-cascader>
      <el-color-picker
        v-else-if="type === 'color'"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      />
      <el-upload
        v-else-if="type === 'upload'"
        :action="option?.action || ''"
        :file-list="form.model[name]"
        v-bind="option"
        v-on="event"
      >
        <slot :name="`${name}-upload`">
          <div class="upload-content">
            <el-button type="primary">点击上传</el-button>
            <i
              v-if="form.model[name]"
              class="el-icon-success"
              style="color: lightgreen"
            />
          </div>
        </slot>
      </el-upload>
      <el-button
        v-else-if="type === 'button'"
        type="primary"
        v-bind="option"
        v-on="event"
      >
        {{ name }}
      </el-button>
      <el-button
        v-else-if="type === 'submit'"
        type="primary"
        icon="el-icon-search"
        @click="handleSubmit"
        v-bind="option"
        v-on="event"
      >
        {{ name }}
      </el-button>
      <el-button
        v-else-if="type === 'reset'"
        icon="el-icon-refresh"
        @click="handleReset"
        v-bind="option"
        v-on="event"
      >
        {{ name }}
      </el-button>
      <slot v-else-if="type === 'custom'" :name="`${name}-custom`"></slot>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-flow: row wrap;
}

.layout > .el-form-item {
  width: 100%;
}
</style>
