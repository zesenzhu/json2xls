#!/usr/bin/env node
import pkginfo from 'pkginfo'
import { Command } from 'commander'
import combineJson2xls from './scripts/combineJson2xls.mjs'
import i18nJson2xls from './scripts/i18nJson2xls.mjs'
import { resolveApp } from './scripts/utils.mjs'
const program = new Command()

program.version(
  pkginfo.version,
  '-v, --version',
  '@zesenzhu/json2xls-cli 当前版本'
)

program
  .command('i18nJson2xls')
  .description('多语言json文件生成xls文件') // 命令描述
  .option('-i, --input <dirPath>', '待转换文件的目录路径')
  .option('-o, --output <dirPath>', '转换后生成文件的存储目录路径')
  .option('-l, --localeList [localeList...]', '需要提取的国际化文件')
  .option('-n, --name <fileName>', '生成文件名')
  .action((options) => {
    i18nJson2xls(options)
  })

program
  .command('xls2i18nJson')
  .description('xls文件生成多语言json文件') // 命令描述
  .option('-i, --input <dirPath>', '待转换文件的目录路径')
  .option('-o, --output <dirPath>', '转换后生成文件的存储目录路径')
  .action((options) => {
    i18nJson2xls(options)
  })
// 解析用户执行命令传入的参数
program.parse(process.argv)
