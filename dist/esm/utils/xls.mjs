import fs from 'fs';
import xlsx from 'node-xlsx';
// //  提取文件
export function extractFiles(path) {
    // excel的本质是多份xml组成的压缩文件，这里我们只需要xl/sharedStrings.xml和xl/worksheets/sheet1.xml
    const files = {
        strings: {},
        sheet: {},
        'xl/sharedStrings.xml': 'strings',
        'xl/worksheets/sheet1.xml': 'sheet'
    };
    // const stream = path instanceof Stream ? path : fs.createReadStream(path)
    const data = fs.readFileSync(path);
    const xlsxData = xlsx.parse(data);
    console.log(xlsxData[0]?.data?.[0], 'xlsxData');
    return new Promise((resolve, reject) => {
        const filePromises = []; // 由于一份excel文档，会被解析成好多分xml文档，但是我们只需要两份xml文档，分别是（xl/sharedStrings.xml和xl/worksheets/sheet1.xml），所以用数组接受
        // stream
        //   .pipe(unzip.Parse())
        //   .on('error', reject)
        //   .on('close', () => {
        //     Promise.all(filePromises).then(() => {
        //       console.log('close', files.strings.contents)
        //       console.log(files.sheet.contents)
        //       return resolve(files)
        //     })
        //   })
        //   .on('entry', (entry) => {
        //     console.log('entry', entry)
        //     // 每解析某个xml文件都会进来这里，但是我们只需要xl/sharedStrings.xml和xl/worksheets/sheet1.xml，并将内容保存在strings和sheet中
        //     const file = files[entry.path]
        //     if (file) {
        //       let contents = ''
        //       let chunks: (Buffer | Uint8Array)[] = []
        //       let totalLength = 0
        //       filePromises.push(
        //         new Promise<void>((resolve) => {
        //           entry
        //             .on('data', (chunk: Buffer | Uint8Array) => {
        //               chunks.push(chunk)
        //               totalLength += chunk.length
        //             })
        //             .on('end', () => {
        //               contents = Buffer.concat(chunks, totalLength).toString()
        //               files[file].contents = contents
        //               if (/�/g.test(contents)) {
        //                 throw TypeError('本次转化出现乱码�')
        //               } else {
        //                 resolve()
        //               }
        //             })
        //         })
        //       )
        //     } else {
        //       entry.autodrain()
        //     }
        //   })
    });
}
export async function parseXlsx(path) {
    // 1. 解析本地excel文件，获取excel的sheet信息和content信息
    const files = await extractFiles(path);
    // 2. 根据strings和sheet解析成二维数组
    // const data = await extractData(files)
    // // 3. 处理二维数组的内容，
    // const fixData = handleData(data)
    // return fixData
}
