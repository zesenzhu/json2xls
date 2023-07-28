#!/usr/bin/env node
import pkginfo from 'pkginfo'
import { Command } from 'commander'
import combineJson2xls from './scripts/combineJson2xls.mjs'
import { resolveApp } from './scripts/utils.mjs'
const program = new Command()

program.version(
  pkginfo.version,
  '-v, --version',
  '@zesenzhu/json2xls-cli 当前版本'
)

program
  .command('xls')
  .description('json文件转xls') // 命令描述
  .option('-d, --dir <dirname>', 'json文件所在的目录', resolveApp('lang')) // 带参选项（选项全称 取值时转成驼峰写法），支持设置默认值
  .action((options) => {
    combineJson2xls(options)
  })
program
  .command('i18nJson2xls')
  .description('多语言json文件生成xls文件') // 命令描述
  .option('-i, --input <dirPath>', '待转换文件的目录路径')
  .option('-o, --output <dirPath>', '转换后生成文件的存储目录路径')
  // .option('-d, --dir <dirname>', 'json文件所在的目录', resolveApp('lang')) // 带参选项（选项全称 取值时转成驼峰写法），支持设置默认值
  .action((options) => {
    combineJson2xls(options)
  })
// 解析用户执行命令传入的参数
program.parse(process.argv)
