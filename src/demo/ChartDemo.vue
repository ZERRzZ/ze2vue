<script>
import { GridLayout, GridItem } from 'vue-grid-layout'

import {
  initStyleItems,
  initDataItems,
  calFormModel,
  initData
} from '@/components/MyChart/initOption'
import { randomColor } from '@/utils/color'
import MyForm from '@/components/MyForm'
import MyBar from '@/components/MyChart/MyBar.vue'
import MyBarH from '@/components/MyChart/MyBarH.vue'
import MyLine from '@/components/MyChart/MyLine.vue'
import MyLineA from '@/components/MyChart/MyLineA.vue'
import MyPie from '@/components/MyChart/MyPie.vue'
import MyPieO from '@/components/MyChart/MyPieO.vue'
import MyBoxplot from '@/components/MyChart/MyBoxplot.vue'
import MyRadar from '@/components/MyChart/MyRadar.vue'
import MyScatter from '@/components/MyChart/MyScatter.vue'
import MyTableC from '@/components/MyChart/MyTableC.vue'
import MyScatterE from '@/components/MyChart/MyScatterE.vue'
import MyTree from '@/components/MyChart/MyTree.vue'
import MyTreemap from '@/components/MyChart/MyTreemap.vue'
import MySunburst from '@/components/MyChart/MySunburst.vue'
import MyCandlestick from '@/components/MyChart/MyCandlestick.vue'

export default {
  name: 'ChartDemo',
  components: {
    GridLayout,
    GridItem,
    MyForm,
    MyBar,
    MyBarH,
    MyLine,
    MyLineA,
    MyPie,
    MyPieO,
    MyBoxplot,
    MyRadar,
    MyScatter,
    MyScatterE,
    MyTableC,
    MyTree,
    MyTreemap,
    MySunburst,
    MyCandlestick
  },
  data() {
    return {
      chartType: [
        { type: 'bar', components: 'MyBar' },
        { type: 'barH', components: 'MyBarH' },
        { type: 'line', components: 'MyLine' },
        { type: 'lineA', components: 'MyLineA' },
        { type: 'pie', components: 'MyPie' },
        { type: 'pieO', components: 'MyPieO' },
        { type: 'boxplot', components: 'MyBoxplot' },
        { type: 'tableC', components: 'MyTableC' },
        { type: 'scatter', components: 'MyScatter' },
        { type: 'scatterE', components: 'MyScatterE' },
        { type: 'radar', components: 'MyRadar' },
        { type: 'tree', components: 'MyTree' },
        { type: 'treemap', components: 'MyTreemap' },
        { type: 'sunburst', components: 'MySunburst' },
        { type: 'candlestick', components: 'MyCandlestick' }
      ],
      cdata: [],
      tab: '1',
      chartStyle: [],
      active: -1,
      showRight: false
    }
  },
  computed: {
    index() {
      return this.cdata.map(c => c.i).indexOf(this.active)
    },
    styleItems() {
      return initStyleItems(this.cdata[this.index]?.data.type)
    },
    styleModel() {
      return this.cdata[this.index]?.data.cstyle || {}
    },
    dataItems() {
      return initDataItems()
    },
    dataModel() {
      return this.cdata[this.index]?.data.dataModel || {}
    }
  },
  methods: {
    handleDragStart(e, val) {
      e.dataTransfer.setData('text/plain', val)
    },
    handleDragOver(e) {
      e.preventDefault()
    },
    handleDrop(e) {
      e.preventDefault()
      const text = e.dataTransfer.getData('text/plain')
      const l = this.cdata.length
      this.$set(this.cdata, this.cdata.length, {
        x: (l * 6) % 12,
        y: l + 12,
        w: 6,
        h: 10,
        i: String(Math.random()).slice(2, 7),
        data: {
          type: text,
          cdata: {},
          dataModel: calFormModel(initDataItems()),
          cstyle: calFormModel(initStyleItems(text))
        }
      })
      this.active = this.cdata[this.cdata.length - 1].i
      this.handleSearch()
    },
    handleResized(i) {
      this.active = i
      const c = this.$refs.chart[this.index]
      c.resize && c.resize()
    },
    handleClickItem(i) {
      if (i === this.active) {
        this.active = -1
        this.showRight && this.resizeRight()
      } else {
        this.active = i
      }
    },
    handleEdit(e) {
      e.cancelBubble = true
      this.resizeRight()
    },
    resizeRight() {
      const right = this.$refs.right
      if (this.showRight) {
        right.style.width = '0'
        right.style.transform = 'translateX(300px)'
        right.style.padding = '0'
        setTimeout(() => {
          this.$refs.chart.forEach(c => c.resize && c.resize())
          right.style.display = 'none'
        }, 300)
      } else {
        right.style.display = 'flex'
        setTimeout(() => {
          right.style.width = '300px'
          right.style.padding = '1em'
          right.style.transform = 'translateX(0)'
          setTimeout(
            () => this.$refs.chart.forEach(c => c.resize && c.resize()),
            300
          )
        })
      }
      this.showRight = !this.showRight
    },
    handleDel(i) {
      this.active = i
      clearInterval(this.cdata[this.index].data.timer)
      this.cdata.splice(this.index, 1)
    },
    handleRandomColor() {
      this.styleModel.color = randomColor(1, 'rgb')
    },
    handleSearch() {
      const data = this.cdata[this.index].data
      if (data.timer) {
        clearInterval(data.timer)
      }
      data.timer = setInterval(() => {
        const arr = initData(data.type, data.dataModel.num)
        this.$set(data, 'cdata', {
          title: `图表${String(Math.random()).slice(2, 7)}`,
          data: arr
        })
      }, 2000)
    }
  }
}
</script>

<template>
  <div class="chart-demo">
    <div class="left">
      <span class="title">图表选择</span>
      <div class="charts">
        <div
          v-for="c in chartType"
          :key="c.type"
          :style="{
            backgroundImage: `url(${require(`@/assets/images/charts/${c.type}.png`)})`
          }"
          draggable
          @dragstart="handleDragStart($event, c.type)"
        ></div>
      </div>
    </div>
    <div class="center" @dragover="handleDragOver" @drop="handleDrop($event)">
      <GridLayout
        :layout.sync="cdata"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :vertical-compact="true"
        :use-css-transforms="true"
      >
        <GridItem
          v-for="{ x, y, w, h, i, data } in cdata"
          :key="i"
          :x="x"
          :y="y"
          :w="w"
          :h="h"
          :i="i"
          @resized="handleResized(i)"
        >
          <div class="citem" @click="handleClickItem(i)">
            <component
              ref="chart"
              :is="chartType.find(c => c.type === data.type).components"
              v-bind="data"
            />
            <transition name="topdown">
              <div class="tool" v-if="active === i">
                <el-button
                  icon="el-icon-s-tools"
                  circle
                  size="mini"
                  type="primary"
                  @click="handleEdit($event, i)"
                />
                <el-popconfirm
                  title="确认删除吗?"
                  style="margin-left: 10px"
                  @confirm="handleDel(i)"
                >
                  <template #reference>
                    <el-button
                      icon="el-icon-delete-solid"
                      circle
                      size="mini"
                      type="danger"
                      @click="$event.cancelBubble = true"
                    />
                  </template>
                </el-popconfirm>
              </div>
            </transition>
          </div>
        </GridItem>
      </GridLayout>
    </div>
    <div class="right" ref="right">
      <span class="title">图表配置</span>
      <el-tabs v-model="tab" class="tab">
        <el-tab-pane label="样式配置" name="1">
          <MyForm
            ref="myform"
            :formProp="{ labelWidth: '80px', model: styleModel }"
            :items="styleItems"
          >
            <template #color-custom>
              <div class="color-custom">
                <el-color-picker size="mini" v-model="styleModel.color" />
                <el-button
                  icon="el-icon-refresh"
                  size="mini"
                  @click="handleRandomColor"
                />
              </div>
            </template>
          </MyForm>
        </el-tab-pane>
        <el-tab-pane label="数据配置" name="2">
          <MyForm
            :formProp="{ labelWidth: '80px', model: dataModel }"
            :items="dataItems"
            @finish="handleSearch"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart-demo {
  width: 100%;
  height: calc(100vh - 54px - 2em);
  overflow: hidden;
  display: flex;
  gap: 1em;

  .title {
    font-weight: 800;

    &::before {
      content: '';
      width: 3px;
      height: 0.8em;
      margin-right: 0.6em;
      background: var(--theme-color);
      display: inline-block;
    }
  }

  .left {
    flex: 0 200px;
    padding: 1em;
    background: var(--main-background);
    border: 1px solid var(--main-border);
    overflow: auto;
    display: flex;
    flex-flow: column;
    gap: 1em;

    .charts {
      flex: 1;
      display: flex;
      flex-flow: column;
      gap: 1em;

      > div {
        width: 100%;
        flex: 100px;
        line-height: 100px;
        text-align: center;
        border: 1px solid var(--main-border);
        background-size: 80% 80%;
        background-position: center;
        background-repeat: no-repeat;
        transition: all 0.3s;
        cursor: pointer;

        &:hover {
          background-size: 100% 100%;
        }
      }
    }
  }

  .center {
    flex: 1;
    background: var(--main-background);
    overflow: auto;

    .vue-grid-layout {
      min-height: 100%;
      background: var(--sub-background);

      .vue-grid-item:not(.vue-grid-placeholder) {
        padding: 1em;
        touch-action: none;
        background: var(--main-background);
      }
    }

    .citem {
      width: 100%;
      height: 100%;
    }

    .tool {
      padding: 0.4em;
      background: var(--sub-background);
      position: absolute;
      right: 0.4em;
      top: 0.4em;
    }
  }

  .right {
    width: 0;
    padding: 0;
    background: var(--main-background);
    border: 1px solid var(--main-border);
    transition: all 0.3s;
    overflow: hidden;
    display: none;
    flex-flow: column;
    gap: 1em;

    .tab {
      flex: 1;
      overflow: auto;
    }

    .color-custom {
      display: flex;
      gap: 1em;
      align-items: center;
    }
  }
}

.topdown-move,
.topdown-leave-active,
.topdown-enter-active {
  transition: all 0.3s ease-out;
}

.topdown-enter,
.topdown-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
