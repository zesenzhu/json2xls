import fs from 'fs'
import json2xls from 'json2xls'
import inquirer from 'inquirer'
import fuzzypath from 'inquirer-fuzzy-path'
import path from 'path'
import consola from 'consola'
import pico from 'picocolors'
import defaultLocaleList, {
  defaultLocaleMap
} from '../utils/defaultLocaleList.mjs'

inquirer.registerPrompt('fuzzypath', fuzzypath)

// let list = getFiles('./lang')
type CombineJson2xlsOptions = {
  input: string
  output: string
  localeList: string[]
  name: string
}
const i18nJson2xls = async (options: CombineJson2xlsOptions) => {
  let { input, output, localeList, name = 'result' } = options
  if (!input || !output || !localeList?.length) {
    const answer = await inquirer.prompt(
      [
        !input && {
          type: 'fuzzypath',
          name: 'input',
          excludePath: (nodePath: string) =>
            nodePath.startsWith('node_modules'),
          itemType: 'directory',
          rootPath: './',
          message: '请选择待转换文件的目录路径',
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
        },
        !localeList && {
          type: 'checkbox',
          message: '请选择需要提取的国际化文件',
          name: 'localeList',
          choices: defaultLocaleList.map((i) => {
            return {
              name: i.fileName
            }
          }),
          validate(v: string[]) {
            if (v.length < 1) {
              return '至少选择一个语言包列表'
            }
            return true
          }
        }
      ].filter(Boolean)
    )
    input = input || answer.input
    output = output || answer.output
    localeList = localeList || answer.localeList
  }
  const outputDirPath = path.resolve(process.cwd(), output)
  // 当不存在这个目录，自动创建
  if (!fs.existsSync(outputDirPath)) {
    consola.start('当前输出目录不存在，自动生成中...')
    fs.mkdirSync(outputDirPath)
    consola.success(`生成目录成功！`)
  }
  const inputDirPath = path.resolve(process.cwd(), input)
  if (!fs.existsSync(inputDirPath)) {
    consola.error(`待转换文件的目录路径不存在: ${inputDirPath}，请重新输入`)
    return
  }
  consola.info(
    pico.green(`
  待转换文件的目录路径: ${inputDirPath}
  语言包的存放目录路径: ${outputDirPath}
  需要提取的国际化文件: ${localeList.join(' ')}
  `)
  )

  const result: Record<string, string>[] = [] // 二维
  localeList?.forEach((locale) => {
    let json: Record<string, string> = { [locale]: '' }
    try {
      json = JSON.parse(
        fs.readFileSync(path.resolve(inputDirPath, `${locale}.json`), 'utf8')
      )
    } catch (e) {
      consola.warn(e)
    }

    /**
     * 格式
     * [{'中文':1,'英文':2},{'中文':3,'英文':4}]
     */
    Object.values(json).forEach((c, i) => {
      if (!result[i]) {
        // 列头
        result[i] = {
          [defaultLocaleMap[locale]?.cnName]: c
        }
      } else {
        result[i][defaultLocaleMap[locale]?.cnName] = c
      }
    })
  })
  let xls = json2xls(result)

  fs.writeFileSync(path.resolve(outputDirPath, `${name}.xlsx`), xls, 'binary')
}

export default i18nJson2xls
