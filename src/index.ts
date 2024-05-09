import { toEscapedSelector as e } from 'unocss'
import type { Preset, Rule } from 'unocss'
import baseCssList from './baseCssRule'

/**
 * @public
 */
export interface IOption {
  unit?: string
  type?: 'weapp'
}

function presetLj(options: IOption = {}): Preset {
  if (options) {
  }
  return {
    name: 'unocss-preset-lj',
    rules: [...getFnRuleList(options), ...(baseCssList as Rule[])],
  }
}
const getFnRuleList = (options: IOption = {}) => {
  const { unit = '${unit}' } = options
  const res: Rule[] = []
  // 文字溢出隐藏
  res.push([
    /^text-line-([\d]+)$/,
    ([_, num]) => ({
      'word-break': 'break-all',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      /*! autoprefixer: off */
      '-webkit-line-clamp': `${num}`,
    }),
  ])

  // 字号设置
  res.push([/^fs-([\d]+)$/, ([_, num]) => ({ 'font-size': `${num}${unit}` })])
  // 同时设置宽高
  res.push([
    /^wh-([\d]+)$/,
    ([_, num]) => ({ width: `${num}${unit}`, height: `${num}${unit}` }),
  ])
  // 文字颜色
  res.push([
    /^c-([\d|abcdef]{1,3})$/,
    ([_, num], { rawSelector }) => {
      let count = 1
      count = 6 / num.length
      return `${e(rawSelector)}{color:#${num.repeat(count)}}`
    },
  ])
  // 背景颜色
  res.push([
    /^bg-([\d|\w]{1,2})$/,
    ([_, num], { rawSelector }) => {
      let count = 1
      count = 6 / num.length
      return `${e(rawSelector)}{background-color:#${num.repeat(count)}}`
    },
  ])
  res.push([
    /^c-b/,
    ([_]) => {
      return `.c-b::after{content: "";display: block;clear: both;}`
    },
  ])
  // border-radius
  res.push([
    /^br-([\d]+)$/,
    ([_, num]) => ({ 'border-radius': `${num}${unit}` }),
  ])
  // flex
  res.push([/^flex-{0,1}([\d]+)$/, ([_, num]) => ({ flex: `${num}` })])
  // position,pos-
  res.push([
    /^p-([sfard]{1})$/,
    ([_, type], { rawSelector }) => {
      const selector = e(rawSelector)
      const keyObj = {
        s: 'sticky',
        f: 'fixed',
        a: 'absolute',
        r: 'relative',
        d: 'static',
      }
      return `${selector}{position:${keyObj[type]};}`
    },
  ])
  // rotate角度
  res.push([
    /^rot-([\d]+)$/,
    ([_, num], { rawSelector }) => {
      const selector = e(rawSelector)
      return `${selector}{transform:rotate(${num}deg)}`
    },
  ])
  // margin padding 重写 for 小程序
  if (options.type === 'weapp') {
    res.push([
      /^(p|m)-{0,1}([xylrtb]{0,1})-{0,1}([\d]+)$/,
      ([_, key, type, num], { rawSelector }) => {
        const selector = e(rawSelector)
        const keyObj = {
          m: 'margin',
          p: 'padding',
          l: 'left',
          r: 'right',
          t: 'top',
          b: 'bottom',
        }
        if (!type || type === 'f') {
          return `${selector} {${keyObj[key]}:${num}${unit};}`
        }
        if (type === 'x') {
          return `${selector} {${keyObj[key]}:0 ${num}${unit};}`
        }
        if (type === 'y') {
          return `${selector} {${keyObj[key]}:${num}${unit} 0;}`
        }
        return `${selector}{${keyObj[key]}-${keyObj[type]}:${num}${unit};}`
      },
    ])
  }

  return res
}
export default presetLj
