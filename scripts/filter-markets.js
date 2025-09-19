const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvFilePath = path.join(__dirname, '..', 'documents', '소상공인시장진흥공단_전통시장_20241104.csv');
const jsonFilePath = path.join(__dirname, '..', 'src', 'data', 'filtered_markets.json');

const csvFile = fs.readFileSync(csvFilePath, 'utf8');

Papa.parse(csvFile, {
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    const filteredData = results.data.filter(row => 
      row.시도명 === '전라남도' || row.시도명 === '전라북도' || row.시도명 === '광주광역시'
    );

    fs.writeFileSync(jsonFilePath, JSON.stringify(filteredData, null, 2), 'utf8');
    console.log('Filtered data has been saved to filtered_markets.json');
  }
});