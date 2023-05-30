import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Spin, Result } from "antd";
import { IsAuthContext } from "../context/useIsAuthContext";
import "./index.css";
const columns = [
  {
    title: "Symbol",
    dataIndex: "Symbol",
    key: "sym",
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "name",
  },
  {
    title: "Sector",
    dataIndex: "Sector",
    key: "sector",
  },
  {
    title: "Valid Till",
    dataIndex: "Validtill",
    key: "valid",
  },
];

const StocksContainer = () => {
  const [stockData, setStockData] = useState([]);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(stockData);
  const navigate = useNavigate();
  const { setIsAuth } = useContext(IsAuthContext);
  const getStockData = async () => {
    axios
      .get("https://prototype.sbulltech.com/api/v2/instruments")
      .then((response) => {
        const res = response.data?.split("\n");
        const objKeys = res[0].split(",");
        const jsonData = res.slice(1).map((data) => {
          const values = data.split(",");
          const obj = {};
          objKeys.forEach((header, index) => {
            obj[header] = values[index];
          });
          return obj;
        });
        setStockData(jsonData);
        setFilteredData(jsonData);
      })
      .catch((err) => setErrors(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getStockData();
  }, []);

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      setStockData(stockData);
    }

    const filteredDatas = stockData.filter((stock) => {
      const symbol = stock.Symbol || "";
      const name = stock.Name || "";
      return (
        (symbol && symbol.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (name && name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredData(filteredDatas);
  };
  const handleRowClick = (record) => {
    setIsAuth(true);
    navigate("/quotes-page", { state: record });
  };

  return (
    <div className="stockPageContainer">
      <h1>Stock Data</h1>
      {errors ? (
        <Result status="500" subTitle="Sorry, something went wrong." />
      ) : loading ? (
        <div>
          <Spin />
        </div>
      ) : (
        <div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search by symbol or name....."
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>

          <Table
            dataSource={filteredData}
            columns={columns}
            onRow={(record) => {
              return {
                onClick: () => {
                  handleRowClick(record);
                },
              };
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StocksContainer;
