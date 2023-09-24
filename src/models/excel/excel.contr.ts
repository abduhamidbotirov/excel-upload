import { Request, Response } from 'express';
import excelModel from './excel.model.js';
import handleError from '../../utils/catchError.js';
import { UploadedFile } from 'express-fileupload';
import xlsx from "xlsx";
class ControlModel {
    async CreateFile(req: Request, res: Response) {
        try {
            const uploadedFile = req.files?.file as UploadedFile;

            const contentType = req.headers['content-type'];
            if (!contentType || !contentType.includes('multipart/form-data')) {
                return res.status(400).json({ error: 'Fayl tipi noto\'g\'ri' });
            }     // Check if an uploaded file exists
            if (!uploadedFile) {
                return res.status(400).json({ error: 'Fayl yuklanmagan' });
            }

            // Get the file data as a Buffer
            const fileDataBuffer: Buffer = uploadedFile.data;

            const workbook = xlsx.read(fileDataBuffer, { type: 'buffer' });
            // Assuming 'Sheet1' is the sheet name
            const sheet = workbook.Sheets['Sheet1'];

            // Initialize an array to hold the converted data
            const dataArray: any = [];
            function formatData(data: any) {
                const formattedData = [];
                let rowNumber = 2; // Boshlang'ich qato
                while (data[`A${rowNumber}`]) {
                    const name = data[`A${rowNumber}`].v;
                    const date = data[`B${rowNumber}`].w;
                    const type = data[`C${rowNumber}`].v;
                    formattedData.push({ name, date, type });
                    rowNumber++;
                }
                return formattedData;
            }
            const formattedData = formatData(sheet);
            formattedData.map(async item => {
                let creatModel = new excelModel({ name: item.name, type: item.type, date: item.date });
                await creatModel.save();
            })
        } catch (error: any) {
            return handleError(res, error)
        }
    }
}
export default ControlModel;