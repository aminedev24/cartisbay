import React, { useState } from "react";
import '../css/shipping.css';

const Shipping = () => {
  const [showTable, setShowTable] = useState(false);

  const handleAfricaClick = () => {
    setShowTable(!showTable); // Toggle the table visibility
  };

  return (
    <div className="shipping-container">
      <div className="header">
        <img
          alt="Company Logo"
          src={`${process.env.PUBLIC_URL}/images/logo3new.png`} 
          width="130"
        />
        <h1>Shipping Schedule</h1>
        {/*
           <a className="search-button" href="#">
           » Shipping Search Page
         </a>
         */
        }
       
      </div>
      <div className="content">
        <button onClick={handleAfricaClick}>ASIA, AFRICA(RO-RO)</button>
        <a href="#">AFRICA(CONTAINER)</a>
      </div>
      {showTable && (
      <div id="list">
      <table class="main_h">
      <thead>
          <tr id="head_nh">
              <th>Company</th>
              <th>Ship Name</th>
              <th>Voyage</th>
              <th>Yoko-<br />hama</th>
              <th>Kawa-<br />saki</th>
              <th>Nagoya</th>
              <th>Kobe</th>
              <th>Osaka</th>
              <th>Hakata</th>
              <th>Kanda</th>
              <th>Kisa-<br />razu</th>
              <th>Nakano-<br />seki</th>
              <th>Hitachi-<br />naka</th>
              <th>Jebel Ali</th>
              <th>Karachi</th>
              <th>Port Louis</th>
              <th>Durban</th>
              <th>Dar</th>
              <th>Mombasa</th>
              <th>Maput</th>
              <th>Hambantota</th>
          </tr>
      </thead>
      <tbody>
      <tr class="row" bgcolor="#ffffff" nowrap="">
              <td>SEVEN SEALS CO.,LTD(INTEROCEAN)</td>
              <td>IVORY ARROW</td>
              <td>159</td>
              <td>Nov<br />3</td>
              <td>-</td>
              <td>Nov<br />2</td>
              <td>Nov<br />6</td>
              <td>Nov<br />5</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Dec<br />8</td>
              <td>Dec<br />9</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#f3f3f3" nowrap="">
              <td>ECL</td>
              <td>POSITIVE PIONEER</td>
              <td>192</td>
              <td>Nov<br />3</td>
              <td>-</td>
              <td>-</td>
              <td>Nov<br />5</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Nov<br />22</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#ffffff" nowrap="">
              <td>SEVEN SEALS CO.,LTD</td>
              <td>IVORY ARROW</td>
              <td>159</td>
              <td>Nov<br />3</td>
              <td>-</td>
              <td>Nov<br />2</td>
              <td>Nov<br />6</td>
              <td>Nov<br />5</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Dec<br />8</td>
              <td>Dec<br />9</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#f3f3f3" nowrap="">
              <td>HOEGH</td>
              <td>HOEGH ASIA</td>
              <td>175</td>
              <td>Nov<br />4</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Nov<br />1</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Nov<br />3</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Dec<br />8</td>
              <td>Dec<br />1</td>
              <td>Nov<br />29</td>
              <td>Dec<br />6</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#ffffff" nowrap="">
              <td>NYK</td>
              <td>SARA LEADER</td>
              <td>047</td>
              <td>Nov<br />12</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Dec<br />4</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#f3f3f3" nowrap="">
              <td>MOL</td>
              <td>VICTORIOUS ACE</td>
              <td>0075A</td>
              <td>Nov<br />13</td>
              <td>-</td>
              <td>Nov<br />12</td>
              <td>Nov<br />16</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Nov<br />14</td>
              <td>Nov<br />17</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>O</td>
              <td>-</td>
              <td>O</td>
              <td>O</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#ffffff" nowrap="">
              <td>NYK</td>
              <td>VELA LEADER</td>
              <td>004</td>
              <td>Nov<br />13</td>
              <td>-</td>
              <td>Nov<br />18</td>
              <td>Nov<br />15</td>
              <td>Nov<br />16</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Dec<br />21</td>
              <td>Dec<br />14</td>
              <td>Dec<br />12</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#f3f3f3" nowrap="">
              <td>MOL(SUN PHOENIX）</td>
              <td>VICTORIOUS ACE</td>
              <td>0075A</td>
              <td>Nov<br />13</td>
              <td>-</td>
              <td>Nov<br />12</td>
              <td>Nov<br />16</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Nov<br />14</td>
              <td>Nov<br />17</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#ffffff" nowrap="">
              <td>THE KEIHIN CO., LTD.</td>
              <td>DON JUAN</td>
              <td>031</td>
              <td>Nov<br />20</td>
              <td>-</td>
              <td>Nov<br />19</td>
              <td>Nov<br />17</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Dec<br />12</td>
              <td>Dec<br />15</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#f3f3f3" nowrap="">
              <td>MOL(SUN PHOENIX）</td>
              <td>BRILLIANT ACE</td>
              <td>0112A</td>
              <td>Nov<br />21</td>
              <td>-</td>
              <td>Nov<br />23</td>
              <td>Nov<br />27</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Nov<br />22</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Dec<br />16</td>
              <td>Dec<br />23</td>
              <td>Dec<br />26</td>
              <td>Dec<br />18</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#ffffff" nowrap="">
              <td>HOEGH</td>
              <td>HOEGH SYDNEY</td>
              <td>117</td>
              <td>Nov<br />22</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Nov<br />24</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Nov<br />20</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Dec<br />29</td>
              <td>Dec<br />21</td>
              <td>Dec<br />19</td>
              <td>Dec<br />27</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#f3f3f3" nowrap="">
              <td>THE KEIHIN CO., LTD.</td>
              <td>MORNING NINNI</td>
              <td>174</td>
              <td>Nov<br />25</td>
              <td>-</td>
              <td>Nov<br />26</td>
              <td>Nov<br />27</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Dec<br />25</td>
              <td>Dec<br />29</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#ffffff" nowrap="">
              <td>THE KEIHIN CO., LTD.</td>
              <td>TOREADOR</td>
              <td>034</td>
              <td>Dec<br />5</td>
              <td>-</td>
              <td>Dec<br />6</td>
              <td>Dec<br />7</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Jan<br />11</td>
              <td>Jan<br />3</td>
              <td>Jan<br />5</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#f3f3f3" nowrap="">
              <td>MOL</td>
              <td>PRIMROSE ACE</td>
              <td>0157A</td>
              <td>Dec<br />11</td>
              <td>-</td>
              <td>Dec<br />10</td>
              <td>Dec<br />14</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Dec<br />12</td>
              <td>Dec<br />15</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Dec<br />30</td>
              <td>Jan<br />7</td>
              <td>Jan<br />15</td>
              <td>Jan<br />17</td>
              <td>Jan<br />9</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#ffffff" nowrap="">
              <td>MOL(SUN PHOENIX）</td>
              <td>PRIMROSE ACE</td>
              <td>0157A</td>
              <td>Dec<br />11</td>
              <td>-</td>
              <td>Dec<br />10</td>
              <td>Dec<br />14</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Dec<br />12</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Jan<br />7</td>
              <td>Jan<br />15</td>
              <td>Jan<br />17</td>
              <td>Jan<br />9</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#f3f3f3" nowrap="">
              <td>HOEGH</td>
              <td>HOEGH BRASILIA</td>
              <td>123</td>
              <td>Dec<br />16</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Dec<br />18</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Dec<br />13</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Jan<br />23</td>
              <td>Jan<br />16</td>
              <td>Jan<br />14</td>
              <td>Jan<br />21</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#ffffff" nowrap="">
              <td>NYK</td>
              <td>POSEIDON LEADER</td>
              <td>130</td>
              <td>-</td>
              <td>-</td>
              <td>Dec<br />16</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Jan<br />8</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#f3f3f3" nowrap="">
              <td>NYK</td>
              <td>MONOCEROS LEADER</td>
              <td>050</td>
              <td>Dec<br />17</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Jan<br />8</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#ffffff" nowrap="">
              <td>NYK</td>
              <td>AQUARIUS LEADER</td>
              <td>062</td>
              <td>Dec<br />20</td>
              <td>-</td>
              <td>Dec<br />19</td>
              <td>Dec<br />23</td>
              <td>Dec<br />24</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Jan<br />18</td>
              <td>Jan<br />25</td>
              <td>Jan<br />27</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#f3f3f3" nowrap="">
              <td>NYK</td>
              <td>VIRGO LEADER</td>
              <td>063</td>
              <td>Dec<br />23</td>
              <td>-</td>
              <td>Dec<br />25</td>
              <td>Dec<br />26</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Jan<br />15</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#ffffff" nowrap="">
              <td>THE KEIHIN CO., LTD.</td>
              <td>TARIFA</td>
              <td>146</td>
              <td>Dec<br />25</td>
              <td>-</td>
              <td>Dec<br />26</td>
              <td>Dec<br />27</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Jan<br />21</td>
              <td>Jan<br />24</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#f3f3f3" nowrap="">
              <td>SEVEN SEALS CO.,LTD</td>
              <td>VIKING DRIVE</td>
              <td>27</td>
              <td>Dec 27<br /><span class="cut_date">Cut:Dec 17</span></td>
              <td>-</td>
              <td>Dec 26<br /><span class="cut_date">Cut:Dec 13</span></td>
              <td>Dec<br />24</td>
              <td>Dec 25<br /><span class="cut_date">Cut:Dec 16</span></td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Jan<br />12</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#ffffff" nowrap="">
              <td>SEVEN SEALS CO.,LTD(INTEROCEAN)</td>
              <td>IN-SIERRA NEVADA HIGHWAY</td>
              <td>137</td>
              <td>Jan<br />5</td>
              <td>-</td>
              <td>Jan<br />6</td>
              <td>Jan<br />8</td>
              <td>Jan<br />7</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Feb<br />8</td>
              <td>Feb<br />9</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#f3f3f3" nowrap="">
              <td>SEVEN SEALS CO.,LTD</td>
              <td>SL-SIERRA NEVADA HIGHWAY</td>
              <td>137</td>
              <td>Jan<br />5</td>
              <td>-</td>
              <td>Jan<br />6</td>
              <td>Jan<br />8</td>
              <td>Jan<br />7</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Feb<br />8</td>
              <td>Feb<br />9</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#ffffff" nowrap="">
              <td>MOL</td>
              <td>PARADISE ACE</td>
              <td>0156A</td>
              <td>Jan<br />13</td>
              <td>-</td>
              <td>Jan<br />12</td>
              <td>Jan<br />16</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Jan<br />14</td>
              <td>Jan<br />17</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Feb<br />1</td>
              <td>Feb<br />7</td>
              <td>Feb<br />14</td>
              <td>Feb<br />16</td>
              <td>Feb<br />8</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#f3f3f3" nowrap="">
              <td>NYK</td>
              <td>GOLIATH LEADER</td>
              <td>119</td>
              <td>Jan<br />15</td>
              <td>-</td>
              <td>Jan<br />20</td>
              <td>Jan<br />18</td>
              <td>Jan<br />17</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Feb<br />22</td>
              <td>Feb<br />15</td>
              <td>Feb<br />13</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#ffffff" nowrap="">
              <td>THE KEIHIN CO., LTD.</td>
              <td>ARABIAN SEA</td>
              <td></td>
              <td>Jan<br />16</td>
              <td>-</td>
              <td>Jan<br />17</td>
              <td>Jan<br />18</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Feb<br />11</td>
              <td>Feb<br />13</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr class="row" bgcolor="#f3f3f3" nowrap="">
              <td>HOEGH</td>
              <td>HOEGH JAN</td>
              <td></td>
              <td>Jan<br />18</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Jan<br />20</td>
              <td>-</td>
              <td>-</td>
              <td>Jan<br />17</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Feb<br />24</td>
              <td>Feb<br />17</td>
              <td>Feb<br />15</td>
              <td>Feb<br />22</td>
              <td>-</td>
            </tr>
      </tbody>
      </table>
    </div>
    
     
      )}
    </div>
  );
};

export default Shipping;