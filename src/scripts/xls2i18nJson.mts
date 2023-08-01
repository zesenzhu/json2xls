import fs from 'fs'
import inquirer from 'inquirer'
import fuzzypath from 'inquirer-fuzzy-path'
import path from 'path'
import consola from 'consola'
import pico from 'picocolors'
import xlsx from 'node-xlsx'
import { parseXlsx } from '../utils/xls.mjs'
import defaultLocaleList from '../utils/defaultLocaleList.mjs'

inquirer.registerPrompt('fuzzypath', fuzzypath)

// let list = getFiles('./lang')
type CombineJson2xlsOptions = {
  input: string
  output: string
}
const xls2i18nJson = async (options: CombineJson2xlsOptions) => {
  let { input, output } = options
  if (!input || !output) {
    const answer = await inquirer.prompt(
      [
        !input && {
          type: 'fuzzypath',
          name: 'input',
          excludePath: (nodePath: string) =>
            nodePath.startsWith('node_modules'),
          itemType: 'file',
          rootPath: './',
          message: '请选择待转换的文件',
          suggestOnly: false,
          depthLimit: undefined
        },
        !output && {
          type: 'fuzzypath',
          name: 'output',
          excludePath: (nodePath: string) =>
            nodePath.startsWith('node_modules'),
          itemType: 'directory',
          rootPath: './',
          message: '请选择转换后生成文件的存储目录路径',
          suggestOnly: false,
          depthLimit: undefined
        }
      ].filter(Boolean)
    )
    input = input || answer.input
    output = output || answer.output
  }
  const outputDirPath = path.resolve(process.cwd(), output)
  // 当不存在这个目录，自动创建
  if (!fs.existsSync(outputDirPath)) {
    consola.start('当前输出目录不存在，自动生成中...')
    fs.mkdirSync(outputDirPath)
    consola.success(`生成目录成功！`)
  }
  const inputDirPath = path.resolve(process.cwd(), input)

  consola.info(
    pico.green(`
  待转换文件的目录路径: ${inputDirPath}
  语言包的存放目录路径: ${outputDirPath}
  `)
  )
  const xlsxData = xlsx.parse(fs.readFileSync(inputDirPath))?.[0]?.data
  // [中文,英文]
  const header = xlsxData[0] // 第一行是提示不需要的
  const main = xlsxData.slice(1)
  const jsonData: Record<string, Record<string, string>> = {} // 输出

  header.forEach((h, i) => {
    const localeData = defaultLocaleList.find((d) => d.cnName === h)
    if (localeData) {
      jsonData[localeData.fileName] = {}

      main.forEach((item, index) => {
        jsonData[localeData.fileName][`${index}`] = item[i] || ''
      })
    }
  })
  // 输出
  Object.keys(jsonData).forEach((k) => {
    fs.writeFileSync(
      path.resolve(outputDirPath, k + '.json'),
      JSON.stringify(jsonData[k], null, 4)
    )
  })
}

export default xls2i18nJson
