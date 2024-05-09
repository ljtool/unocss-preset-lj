// const fs = require('fs')
import fs from 'fs'
fs.readFile('./src/baseCss.css', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const lines = data.match(/\.(\S+)\s*{([^}]*)}/g)
  // console.log(lines)
  const res = []
  lines.forEach((line) => {
    line = line.replace(/\n/g, '')
    const match = line.match(/\.(\S+)\s*{([^}]*)}/)
    if (match) {
      const className = match[1]
      const attrList = match[2].split(';').filter(Boolean) || []
      const attrObj = attrList.reduce((p, c) => {
        const [k, v] = c.split(':')
        p[k.trim()] = v.trim()
        return p
      }, {})
      res.push([className, attrObj])
    }
  })
  // 输出到baseCssList.Ts
  fs.writeFileSync(
    './src/baseCssRule.ts',
    `export default ${JSON.stringify(res)}`
  )
  console.log('baseCssRule create success')
})
