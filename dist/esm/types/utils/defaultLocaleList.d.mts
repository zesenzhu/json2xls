export type DefaultLocaleType = {
    fileName: string;
    cnName: string;
    name: string;
};
export type DefaultLocaleListType = DefaultLocaleType[];
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
declare const defaultLocaleList: DefaultLocaleListType;
declare const defaultLocaleMap: Record<string, DefaultLocaleType>;
export { defaultLocaleMap };
export default defaultLocaleList;
