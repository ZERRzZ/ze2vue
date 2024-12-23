import { randomColor } from '@/utils/color'

export const initStyleItems = type => {
  if (
    type === 'bar' ||
    type === 'barH' ||
    type === 'boxplot' ||
    type === 'scatter' ||
    type === 'scatterE' ||
    type === 'radar'
  ) {
    return [
      { type: 'text', name: 'title', label: '标题' },
      {
        type: 'custom',
        name: 'color',
        init: randomColor(1, 'rgb'),
        label: '主题颜色'
      },
      { type: 'color', name: 'tcolor', init: '#000', label: '文本颜色' },
      { type: 'switch', name: 'tooltipShow', label: '是否显示提示框' },
      { type: 'switch', name: 'legendShow', label: '是否显示图例' }
    ]
  } else if (type === 'line' || type === 'lineA') {
    return [
      { type: 'text', name: 'title', label: '标题' },
      {
        type: 'custom',
        name: 'color',
        init: randomColor(1, 'rgb'),
        label: '主题颜色'
      },
      { type: 'color', name: 'tcolor', init: '#000', label: '文本颜色' },
      { type: 'switch', name: 'tooltipShow', label: '是否显示提示框' },
      { type: 'switch', name: 'legendShow', label: '是否显示图例' }
    ]
  } else if (
    type === 'pie' ||
    type === 'pieO' ||
    type === 'candlestick' ||
    type === 'tree' ||
    type === 'treemap' ||
    type === 'sunburst'
  ) {
    return [
      { type: 'text', name: 'title', label: '标题' },
      { type: 'color', name: 'tcolor', init: '#000', label: '文本颜色' },
      { type: 'switch', name: 'tooltipShow', label: '是否显示提示框' },
      { type: 'switch', name: 'legendShow', label: '是否显示图例' }
    ]
  } else if (type === 'tableC') {
    return [{ type: 'text', name: 'title', label: '标题' }]
  }
}

export const initDataItems = () => {
  return [
    { type: 'text', name: 'type', label: '指标类型' },
    { type: 'number', name: 'num', init: 6, label: '数据条数' },
    { type: 'search', name: '查询数据' }
  ]
}

export const calFormModel = items => {
  const obj = {}
  function getValueByType(type) {
    switch (type) {
      case 'input':
        return ''
      case 'switch':
        return true
      case 'number':
        return 0
    }
  }
  items.forEach(
    i =>
      i.name &&
      (obj[i.name] = i.init === undefined ? getValueByType(i.type) : i.init)
  )
  return obj
}

export const initData = (type, num) => {
  let arr = []
  switch (type) {
    case 'boxplot':
      for (let i = 0; i < num; i++) {
        arr.push({
          name: `指标${i + 1}`,
          value: [1, 2, 3, 4, 5, 6]
            .map(() => Math.random() * 100)
            .sort((a, b) => a - b)
            .map(v => parseInt(v))
        })
      }
      break
    case 'candlestick':
      for (let i = 0; i < num; i++) {
        arr.push({
          name: `指标${i + 1}`,
          value: [1, 2, 3, 4]
            .map(() => Math.random() * 100)
            .map(v => parseInt(v))
        })
      }
      break
    case 'tableC':
      for (let i = 0; i < num; i++) {
        const obj = {}
        ;[1, 2, 3, 4, 5].forEach(v => {
          obj[`指标${v}`] = (Math.random() * 100).toFixed(2)
        })
        arr.push(obj)
      }
      break
    case 'tree':
    case 'treemap':
      arr = renderTreeData(num, 1)
      break
    case 'sunburst':
      arr = renderSunData(num, 1)
      break
    default:
      for (let i = 0; i < num; i++) {
        arr.push({
          name: `样本${i + 1}`,
          value: (Math.random() * 100).toFixed(2)
        })
      }
  }
  return arr
}

function renderTreeData(num, count) {
  const temp = []
  for (let i = 0; i < num; i++) {
    temp.push({
      name: `${count}-${Math.ceil(Math.random() * 10)}`,
      value: Math.ceil(Math.random() * 100),
      children:
        num === 0
          ? undefined
          : renderTreeData(Math.floor(num / (count + 1)), count + 1)
    })
  }
  return temp
}

function renderSunData(num, count) {
  const temp = []
  for (let i = 0; i < num; i++) {
    temp.push({
      name: `${count}-${Math.ceil(Math.random() * 10)}`,
      value: num === 0 ? Math.ceil(Math.random() * 100) : undefined,
      children:
        num === 0
          ? undefined
          : renderTreeData(Math.floor(num / (count + 1)), count + 1)
    })
  }
  return temp
}
