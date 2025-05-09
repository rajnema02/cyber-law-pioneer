export class CsvDataService {
  static exportToCsv(filename: string, rows: object[]) {
    if (!rows || !rows.length) {
      return;
    }
    let maxlength = 0;
    let tobeKeys = [];
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      if ((Object.keys(row)).length > maxlength) {
        maxlength = (Object.keys(row)).length;
        tobeKeys = Object.keys(row);
        // console.log(tobeKeys);
      }
    }
    const separator = ',';
    const keys = tobeKeys;
    const csvData =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    // if (navigator.msSaveBlob) { // IE 10+
    //   navigator.msSaveBlob(blob, filename);
    // } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    // }
  }
}
