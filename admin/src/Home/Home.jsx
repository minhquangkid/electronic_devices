import React, { useEffect, useState } from "react";
import HistoryAPI from "../API/HistoryAPI";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

Home.propTypes = {};

function Home(props) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      const response = await HistoryAPI.getAll();
      console.log(response);
      setHistory(response);
    }
    fetchHistory();
  }, []);

  return (
    <div style={{ marginLeft: "250px", marginTop: "100px" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">History</h4>
                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID User</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Total</th>
                        <th>Delivery</th>
                        <th>Status</th>
                        <th>Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history &&
                        history.map((value) => (
                          <tr key={value._id}>
                            <td>{value.userId}</td>
                            <td>{value.fullName}</td>
                            <td>{value.phoneNumber}</td>
                            <td>{value.address}</td>
                            <td>{value.totalPrice}</td>
                            <td>
                              {value.delivery
                                ? "Đã Vận Chuyển"
                                : "Chưa Vận Chuyển"}
                            </td>
                            <td>
                              {value.status
                                ? "Đã Thanh Toán"
                                : "Chưa Thanh Toán"}
                            </td>
                            <td>
                              <a
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-success"
                              >
                                View
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
