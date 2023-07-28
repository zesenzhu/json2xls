import fs from 'fs'
import json2xls from 'json2xls'
import { resolveApp } from './utils.mjs'
import inquirer from 'inquirer'
import fuzzypath from 'inquirer-fuzzy-path'

const jsonName = { zh: '中文', en: '英文' }

// function getFiles(path) {
//   const items = fs.readdirSync(path)
//   const result = [] // 二维
//   const zhIndex = items.indexOf('zh.json') // 中文
//   if (zhIndex < 0) {
//     throw '必须有中文'
//   }
//   const zhItem = items.splice(zhIndex, 1)[0]
//   items.unshift(zhItem) // 中文在首行
//   items.forEach((item) => {
//     const itemPath = `${path}/${item}`
//     const json = JSON.parse(fs.readFileSync(itemPath, 'utf8'))
//     const itemName = item?.split('.')[0]
//     /**
//      * 格式
//      * [{a:1,b:2},{a:3,b:4}]
//      */
//     Object.values(json).forEach((c, i) => {
//       if (!result[i]) {
//         result[i] = {
//           [jsonName[itemName]]: c
//         }
//       } else {
//         result[i][jsonName[itemName]] = c
//       }
//     })
//   })
//   let xls = json2xls(result)

//   fs.writeFileSync('result.xlsx', xls, 'binary')
// }

// let list = getFiles('./lang')
type CombineJson2xlsOptions = {
  input: string
  output: string
}
const combineJson2xls = (options: CombineJson2xlsOptions) => {
  const { input, output } = options

  console.log('options', options)
}

export default combineJson2xls
