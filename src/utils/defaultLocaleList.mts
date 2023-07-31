export type DefaultLocaleType = {
  fileName: string
  cnName: string
  name: string
}
export type DefaultLocaleListType = DefaultLocaleType[]
/**
 * 支持的语言和键值
 * zh：简体中文
 * zh-TW：繁体中文
 * en：英语
 * ja：日语
 * ko：韩语
 * fr：法语
 * es：西班牙语
 * it：意大利语
 * de：德语
 * tr：土耳其语
 * ru：俄语
 * pt：葡萄牙语
 * vi：越南语
 * id：印尼语
 * th：泰语
 * ms：马来西亚语
 * ar：阿拉伯语
 * hi：印地语
 */
const defaultLocaleList: DefaultLocaleListType = [
  {
    fileName: 'zh',
    cnName: '简体中文',
    name: '简体中文'
  },
  {
    fileName: 'en',
    cnName: '英语',
    name: 'English'
  },
  {
    fileName: 'zh-TW',
    cnName: '繁体中文',
    name: '繁体中文'
  },
  {
    fileName: 'id',
    cnName: '印度尼西亚语',
    name: 'Bahasa Indonesia'
  },
  {
    fileName: 'vi',
    cnName: '越南语',
    name: 'Tiếng Việt'
  },
  {
    fileName: 'ms',
    cnName: '马来语',
    name: 'بهاس ملايو‎'
  },
  {
    fileName: 'es',
    cnName: '西班牙语',
    name: 'Español'
  },
  {
    fileName: 'fr',
    cnName: '法语-法国',
    name: 'Français'
  },

  {
    fileName: 'it',
    cnName: '意大利语',
    name: 'Italiano'
  },

  {
    fileName: 'de',
    cnName: '德语',
    name: 'Deutsch'
  },

  {
    fileName: 'ja',
    cnName: '日语',
    name: '日本語'
  },
  {
    fileName: 'ko',
    cnName: '韩语',
    name: '한국어'
  },
  {
    fileName: 'pt',
    cnName: '葡萄牙语',
    name: 'Português'
  },

  {
    fileName: 'th',
    cnName: '泰语',
    name: 'ไทย'
  }
]

const defaultLocaleMap: Record<string, DefaultLocaleType> = {}
defaultLocaleList?.forEach((c) => (defaultLocaleMap[c.fileName] = c))
export { defaultLocaleMap }
export default defaultLocaleList
