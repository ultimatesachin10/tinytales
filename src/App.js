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
