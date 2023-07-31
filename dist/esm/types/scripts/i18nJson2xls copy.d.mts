type CombineJson2xlsOptions = {
    input: string;
    output: string;
    localeList: string[];
    name: string;
};
declare const i18nJson2xls: (options: CombineJson2xlsOptions) => Promise<void>;
export default i18nJson2xls;
