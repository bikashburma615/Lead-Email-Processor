import xlsx from 'xlsx';

export function readFile(file) {
  return new Promise((resolve, reject) => {

    if (typeof file === 'undefined') {
      throw new Error('Missing required parameters');
    }
    const buffer = file.buffer;
    let workbook = xlsx.read(buffer, {
      type: 'buffer'
    });

    const sheetNameList = workbook.SheetNames;

    let workgroups = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheetNameList[0]]
    );

    if (!workgroups.length) {
      reject(new ValidationError('Workgroups sheet should not be empty'));
    }

    console.log("workgroups ", workgroups)

    return resolve(workgroups)
  });
}
