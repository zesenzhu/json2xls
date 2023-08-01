type CombineJson2xlsOptions = {
    input: string;
    output: string;
};
declare const xls2i18nJson: (options: CombineJson2xlsOptions) => Promise<void>;
export default xls2i18nJson;
