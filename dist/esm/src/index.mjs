#!/usr/bin/env node
import pkginfo from 'pkginfo';
import { Command } from 'commander';
import combineJson2xls from '../scripts/combineJson2xls.mjs';
const program = new Command();
program.version(pkginfo.version, '-v, --version', '@zesenzhu/json2xls-cli 当前版本');
program
    .command('xls')
    .description('json文件转xls') // 命令描述
    .option('-d, --dir <dirname>', 'json文件转xls') // 带参选项（选项全称 取值时转成驼峰写法），支持设置默认值
    .action(async (options) => {
    combineJson2xls(options);
});
// 解析用户执行命令传入的参数
program.parse(process.argv);
