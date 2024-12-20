import React from 'react';

const tableData = [
  ["NYK", "SARA LEADER", "047", "Nov 12", "-", "-", "-", "-", "-", "-", "-","-","-", "Dec 4", "-", "-", "-", "-", "-", "-","-"],
  ["MOL", "VICTORIOUS ACE", "0075A", "Nov 13","-", "Nov 12", "Nov 16", "-", "-","-", "Nov 14", "Nov 17", "-", "-", "-", "O", "-", "O", "O", "-", "-"],
  ["NYK", "VELA LEADER", "004", "Nov 13","-", "Nov 18", "Nov 15", "Nov 16", "-", "-", "-", "-", "-", "-", "-","-", "Dec 21", "Dec 14", "Dec 12", "-", "-"],
  ["MOL(SUN PHOENIX)", "VICTORIOUS ACE", "0075A", "Nov 13","-", "Nov 12", "Nov 16", "-", "-", "-","Nov 14", "Nov 17", "-", "-", "-","-", "O", "O", "O", "-", "-"],
  ["THE KEIHIN CO., LTD.", "DON JUAN", "031", "Nov 20","-", "Nov 19", "Nov 17", "-", "-", "-", "-", "-", "-", "-","-","-","-", "Dec 12", "Dec 15", "-", "-"],
  ["MOL(SUN PHOENIX)", "BRILLIANT ACE", "0112A", "Nov 21","-", "Nov 23", "Nov 27", "-", "-","-", "Nov 22", "-", "-", "-", "-","-", "Dec 16", "Dec 23", "Dec 26", "Dec 18", "-"],
  ["HOEGH", "HOEGH SYDNEY", "117", "Nov 22", "-", "-", "-", "Nov 24", "-", "-","-","-", "Nov 20", "-", "-","-", "Dec 29", "Dec 21", "Dec 19", "Dec 27", "-"],
  ["THE KEIHIN CO., LTD.", "MORNING NINNI", "174", "Nov 25","-", "Nov 26", "Nov 27", "-", "-", "-", "-", "-", "-", "-","-","-","-", "Dec 25", "Dec 29", "-", "-"],
  ["THE KEIHIN CO., LTD.", "TOREADOR", "034", "Dec 5","-", "Dec 6", "Dec 7", "-", "-", "-", "-", "-", "-", "-", "-","-","Jan 11", "Jan 3", "Jan 5", "-", "-"],
  ["MOL", "PRIMROSE ACE", "0157A", "Dec 11","-", "Dec 10", "Dec 14", "-", "-", "-","Dec 12", "Dec 15", "-", "-", "-", "Dec 30", "Jan 7", "Jan 15", "Jan 17", "Jan 9", "-"],
  ["MOL(SUN PHOENIX)", "PRIMROSE ACE", "0157A", "Dec 11","-", "Dec 10", "Dec 14", "-", "-","-", "Dec 12", "-", "-", "-", "-","-", "Jan 7", "Jan 15", "Jan 17", "Jan 9", "-"],
  ["HOEGH", "HOEGH BRASILIA", "123", "Dec 16", "-", "-", "-", "Dec 18", "-", "-","-","-", "Dec 13", "-", "-","-", "Jan 23", "Jan 16", "Jan 14", "Jan 21", "-"],
  ["NYK", "POSEIDON LEADER", "130", "-","-", "Dec 16", "-", "-", "-", "-", "-", "-", "-","Jan 8", "-", "-", "-", "-", "-","-", "-"],
  ["NYK", "MONOCEROS LEADER", "050", "Dec 17", "-", "-", "-", "-", "-", "-", "-", "-","-","Jan 8", "-", "-", "-", "-", "-","-", "-"],
  ["NYK", "AQUARIUS LEADER", "062", "Dec 20","-", "Dec 19", "Dec 23", "Dec 24", "-", "-", "-", "-", "-", "-", "-","-", "Jan 18", "Jan 25", "Jan 27", "-", "-"],
  ["NYK", "TRITON LEADER", "105","-", "Dec 24", "-", "-", "-", "-", "-", "-", "-","-","-","Jan 15", "-", "-", "-", "-", "-", "-"],
  ["NYK", "VIRGO LEADER", "063", "-","-", "Dec 25", "Dec 26", "-", "-", "-", "-", "-", "-","Jan 15", "-", "-", "-", "-", "-", "-","-"],
  ["THE KEIHIN CO., LTD.", "TARIFA", "146", "Dec 25","-", "Dec 26", "Dec 27", "-", "-", "-", "-", "-", "-", "-","-","-","-", "Jan 21", "Jan 24", "-", "-"],
  ["SEVEN SEALS CO.,LTD", "VIKING DRIVE", "27", "Dec 27", "Cut:Dec 17", "-", "Dec 26", "Cut:Dec 13", "Dec 24", "Dec 25", "Cut:Dec 16", "-", "-", "-", "-", "Jan 12", "-", "-", "-", "-", "-"],
  ["SEVEN SEALS CO.,LTD(INTEROCEAN)", "SIERRA NEVADA HIGHWAY", "137", "Jan 5","-", "Jan 6", "Jan 8", "Jan 7", "-", "-", "-", "-", "-", "-", "-","-","-", "Feb 8", "Feb 9", "-", "-"],
  ["SEVEN SEALS CO.,LTD", "SIERRA NEVADA HIGHWAY", "137", "Jan 5","-", "Jan 6", "Jan 8", "Jan 7", "-", "-", "-", "-", "-", "-", "-","-","-", "Feb 8", "Feb 9", "-", "-"],
  ["MOL", "PARADISE ACE", "0156A", "Jan 13","-", "Jan 12", "Jan 16", "-", "-","-", "Jan 14", "Jan 17", "-", "-", "-", "Feb 1", "Feb 7", "Feb 14", "Feb 16", "Feb 8", "-"],
  ["NYK", "GOLIATH LEADER", "119", "Jan 15","-", "Jan 20", "Jan 18", "Jan 17", "-", "-", "-", "-", "-", "-", "-","-", "Feb 22", "Feb 15", "Feb 13", "-", "-"],
  ["THE KEIHIN CO., LTD.", "ARABIAN SEA","", "Jan 16","-", "Jan 17", "Jan 18", "-", "-", "-", "-", "-", "-", "-", "-","-","-", "Feb 11", "Feb 13", "-", "-"],
  ["HOEGH", "HOEGH JAN","", "Jan 18", "-", "-", "-", "Jan 20", "-", "-", "Jan 17", "-", "-", "-", "-", "Feb 24", "Feb 17", "Feb 15", "Feb 22", "-"]
];

const AfricaRoroShippingTable = () => {
  return (
    <div id="list">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Ship Name</th>
            <th>Voyage</th>
            <th>Yokohama</th>
            <th>Kawasaki</th>
            <th>Nagoya</th>
            <th>Kobe</th>
            <th>Osaka</th>
            <th>Hakata</th>
            <th>Kanda</th>
            <th>Kisarazu</th>
            <th>Nakanoseki</th>
            <th>Hitachinaka</th>
            <th>Jebel Ali</th>
            <th>Karachi</th>
            <th>Port Louis</th>
            <th>Durban</th>
            <th>Dar</th>
            <th>Mombasa</th>
            <th>Maputo</th>
            <th>Hambantota</th>
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

export default AfricaRoroShippingTable;
