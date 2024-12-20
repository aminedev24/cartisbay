import React from 'react';
import useCheckScreenSize from './screenSize';

const tableData = [
  ["MSC", "MSC BASEL V", "HI445A", "Nov 6", "-", "-", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC NAGOYA V", "HI444A", "Nov 7", "-", "-", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC LILOU III", "HG445A", "-", "-", "Nov 7", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MAERSK", "IRENES RALLY", "446S", "Nov 12", "-", "-", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC DURBAN IV", "HI446A", "Nov 16", "-", "-", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC LILOU III", "HG446A", "-", "-", "Nov 16", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "HYUNDAI NEPTUNE", "0036W", "Nov 19", "-", "-", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "AS CALIFORNIA", "HI447A", "Nov 19", "-", "-", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC LILOU III", "HG447A", "-", "-", "Nov 23", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC OLIA", "HI448A", "Dec 4", "-", "-", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC LILOU III", "HG449A", "-", "-", "-", "Dec 8", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC ARIA III", "HG450A", "-", "-", "Dec 11", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC LILOU III", "HG450A", "-", "-", "Dec 15", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC BASEL V", "HI452A", "Dec 20", "-", "-", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC MANHATTAN V", "HI450A", "Dec 20", "-", "-", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC ULSAN III", "HG451A", "-", "-", "Dec 21", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC LILOU III", "HG451A", "-", "-", "-", "-", "Dec 21", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC PRECISION V", "HW449R", "-", "-", "-", "-", "Dec 21", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC DURBAN IV", "HI452A", "Dec 23", "-", "-", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC LILOU III", "HG452A", "-", "-", "Dec 25", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC SHAHAR IV", "HI452A", "Dec 27", "-", "-", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC DURBAN IV", "HI501A", "Dec 31", "-", "-", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"],
  ["MSC", "MSC LILOU III", "HG503A", "-", "-", "Jan 15", "-", "-", "-", "-", "O", "-", "-", "-", "-", "-"]
];

const AfricaShippingTable = () => {
  const { isSmallScreen, isPortrait } = useCheckScreenSize();

  return (
    <div 
    id="list"
    style = {{
      height: isSmallScreen ? '100%': '60%',
    }}
    >
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Ship Name</th>
          <th>Voyage</th>
          <th>Yokohama</th>
          <th>Nagoya</th>
          <th>Kobe</th>
          <th>Osaka</th>
          <th>Hakata</th>
          <th>Hitachinaka</th>
          <th>Mombasa</th>
          <th>Dar Es Salaam</th>
          <th>Port Louis</th>
          <th>Matadi</th>
          <th>Walvis Bay</th>
          <th>Nacala</th>
          <th>Maputo</th>
          <th>Durban</th>
          <th>Berbera</th>
          <th>Beira</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default AfricaShippingTable ;
