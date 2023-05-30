import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Table, Spin, Result } from "antd";
import moment from "moment";
import axios from "axios";
import "../stock-page/index.css";

const QuotesPage = () => {
  const [quotesData, setQuotesData] = useState([]);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeoutIds, setTimeoutIds] = useState([]);

  const navigateData = useLocation();
  const { state } = navigateData;

  const columns = [
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) => moment(a.time).unix() - moment(b.time).unix(),
    },
    {
      title: "Valid Till",
      dataIndex: "valid_till",
      key: "valid",
    },
  ];

  const getQuotesData = async () => {
    axios
      .get(`https://prototype.sbulltech.com/api/v2/quotes/${state.Symbol}`)
      .then((response) => {
        setQuotesData(response?.data.payload[state.Symbol]);
      })
      .catch((error) => setErrors(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getQuotesData();
  }, []);

  const refreshPage = () => {
    getQuotesData(); // call the API again
  };
  useEffect(() => {
    timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));

    const newTimeoutIds = quotesData.map((quote) => {
      const currentTime = new Date(); // Get the current time
      const validTillTime = new Date(quote.valid_till); // Convert the "valid till" time to a Date object
      const timeDiff = validTillTime.getTime() - currentTime.getTime(); // Calculate the time difference in milliseconds

      if (timeDiff > 0) {
        // Schedule a refetch when the "valid till" time expires
        return setTimeout(refreshPage, timeDiff);
      }

      return null;
    });

    setTimeoutIds(newTimeoutIds.filter((timeoutId) => timeoutId !== null));
  }, [quotesData]);

  return (
    <div className="stockPageContainer">
      <h1>
        Quotes Data: <span>{state.Symbol}</span>
      </h1>
      {errors ? (
        <Result status="500" subTitle="Sorry, something went wrong." />
      ) : loading ? (
        <Spin />
      ) : (
        <Table dataSource={quotesData} columns={columns} />
      )}
    </div>
  );
};

export default QuotesPage;
