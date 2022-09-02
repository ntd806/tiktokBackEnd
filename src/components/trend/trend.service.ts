import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';

@Injectable()
export class TrendService {
    public async readFile(fileName: string) {
        try {
            const url = './public/csv/' + fileName;
            const csvFile = readFileSync(url);
            const csvData = csvFile.toString();
            // const parsedCsv = await parse(csvData, {
            //     header: true,
            //     skipEmptyLine: true,
            //     transformHeader: (header) =>
            //         header.toLowerCase().replace().trim(),
            //     complete: (result) => result.data
            // });
            // console.log
            return {
                code: 50000,
                data:  csvData,
                message: 'ok'
            };
        } catch (error) {
            console.log(error);
        }
    }
}
