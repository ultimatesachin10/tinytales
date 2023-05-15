<h1>Source Code</h1>
<div>  
import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { saveAs } from 'file-saver';
const App = () => {
  const [histogramData, setHistogramData] = useState([]);
  const fetchData = async () => {
    const response = await axios.get('https://www.terriblytinytales.com/test.txt');
    const text = response.data;
    const wordCounts = text
      .split(/\s+/)
      .reduce((counts, word) => {
        counts[word] = (counts[word] || 0) + 1;
        return counts;
      }, {}); 
    const sortedWordCounts = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
    const histogramData = sortedWordCounts.map(([word, count]) => ({
      word,
      count,
    }));
    setHistogramData(histogramData);
  };
  const handleExport = () => {
    const csv = 'Word,Count\n' + histogramData.map(({ word, count }) => `${word},${count}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'histogram.csv');
  };
  return (
    <div>
      <button onClick={fetchData}>Submit</button>
      {histogramData.length > 0 && (
        <>
          <BarChart width={800} height={400} data={histogramData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="word" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
          <button onClick={handleExport}>Export</button>
        </>
      )}
    </div>
  );
};
export default App;
</div>
<br></br>
<p>
  I use Axios to fetch the text file and parse it using JavaScript functions like split(), reduce(), and sort(). I am then use Recharts to create a histogram chart and FileSaver.js to download a CSV file of the histogram data. When the "Submit" button is clicked, the fetchData() function is called, which fetches the data, parses it, and sets the histogram data in state. When the histogram data is available,
</p>

![image](https://github.com/ultimatesachin10/tinytales/assets/79250950/73176fdd-d78f-474b-8d93-c4625e082768)
<br></br>
![image](https://github.com/ultimatesachin10/tinytales/assets/79250950/5cb1d8f1-ac87-4d3f-8526-aeb46efb40cd)
<br></br>
![image](https://github.com/ultimatesachin10/tinytales/assets/79250950/6a0f248c-7e4f-48c3-acdb-55982c929843)
