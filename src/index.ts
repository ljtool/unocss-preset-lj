import { toEscapedSelector as e } from 'unocss'
import type { Preset, Rule } from 'unocss'
import baseCssList from './baseCssRule'

/**
 * @public
 */
export interface IOption {
  unit?: string
  /** weapp：weixin microApp */
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
  const { unit = 'px' } = options
  const res: Rule[] = [
    // text overflow hide with ...
    [
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
    ],
    // font-size
    [/^fs-([\d]+)$/, ([_, num]) => ({ 'font-size': `${num}${unit}` })],
    // width height
    [
      /^wh-([\d]+)$/,
      ([_, num]) => ({ width: `${num}${unit}`, height: `${num}${unit}` }),
    ],
    // text color short,eg: c-3 {color: #333333;}
    [
      /^c-([\d|abcdef]{1,3})$/,
      ([_, num], { rawSelector }) => {
        let count = 1
        count = 6 / num.length
        return `${e(rawSelector)}{color:#${num.repeat(count)}}`
      },
    ],
    // text color
    [
      /^c-[\d|abcdef]{6,8})$/,
      ([_, v], { rawSelector }) => {
        return `${e(rawSelector)}{color:#${v}}`
      },
    ],
    // background color,eg: bg-3 {background-color: #333333;}
    [
      /^bg-([\d|abcdef]{1,3})$/,
      ([_, num], { rawSelector }) => {
        let count = 1
        count = 6 / num.length
        return `${e(rawSelector)}{background-color:#${num.repeat(count)}}`
      },
    ],
    // background color
    [
      /^bg-([\d|abcdef]{6,8})$/,
      ([_, v], { rawSelector }) => {
        return `${e(rawSelector)}{background-color:#${v}}`
      },
    ],
    // clear float add at father container
    [
      /^f-c/,
      ([_]) => {
        return `.f-c::after{content: "";display: block;clear: both;}`
      },
    ],
    // border-radius
    [/^br-([\d]+)$/, ([_, num]) => ({ 'border-radius': `${num}${unit}` })],
    // flex
    [/^flex-{0,1}([\d]+)$/, ([_, num]) => ({ flex: `${num}` })],
    // position,as pos-
    [
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
    ],
    // rotate
    [
      /^rot-([\d]+)$/,
      ([_, num], { rawSelector }) => {
        const selector = e(rawSelector)
        return `${selector}{transform:rotate(${num}deg)}`
      },
    ],
  ]
  //  for microApp
  if (options.type === 'weapp') {
    // margin padding
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
          return `${selector} {${keyObj[key]}-left:${num}${unit};${keyObj[key]}-right:${num}${unit};}`
        }
        if (type === 'y') {
          return `${selector} {${keyObj[key]}-top:${num}${unit};${keyObj[key]}-bottom:${num}${unit};}`
        }
        return `${selector}{${keyObj[key]}-${keyObj[type]}:${num}${unit};}`
      },
    ])
  }
  return res
}
export default presetLj
