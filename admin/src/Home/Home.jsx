import React, { useEffect, useState } from "react";
import HistoryAPI from "../API/HistoryAPI";
import UserAPI from "../API/UserAPI";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

Home.propTypes = {};
let total = 0;

function Home(props) {
  const [history, setHistory] = useState([]);
  const [Clients, setClients] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let getCurrentUser = JSON.parse(localStorage.getItem("userData"));
    console.log(getCurrentUser);
    if (getCurrentUser.role === "Admin") {
      setIsAdmin(true);
    }
    async function fetchHistory() {
      const response = await HistoryAPI.getAll();

      response.map((e) => {
        total = total + e.totalPrice;
      });
      console.log(response);
      setHistory(response);
    }
    async function fetchClients() {
      const response = await UserAPI.getAllClients();
      console.log(response);
      setClients(response.length);
    }

    fetchHistory();
    fetchClients();
  }, []);

  return isAdmin ? (
    <div style={{ marginLeft: "250px", marginTop: "100px" }}>
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="card-group">
          <div className="card border-right">
            <div className="card-body">
              <div className="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <div className="d-inline-flex align-items-center">
                    <h2 className="text-dark mb-1 font-weight-medium">
                      {Clients}
                    </h2>
                  </div>
                  <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                    Clients
                  </h6>
                </div>
                <div className="ml-auto mt-md-3 mt-lg-0">
                  <span className="opacity-7 text-muted">
                    <i data-feather="user-plus"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-right">
            <div className="card-body">
              <div className="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <h2 className="text-dark mb-1 w-100 text-truncate font-weight-medium">
                    <sup className="set-doller">$</sup>
                    {total}
                  </h2>
                  <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                    Earnings of Month
                  </h6>
                </div>
                <div className="ml-auto mt-md-3 mt-lg-0">
                  <span className="opacity-7 text-muted">
                    <i data-feather="dollar-sign"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-right">
            <div className="card-body">
              <div className="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <div className="d-inline-flex align-items-center">
                    <h2 className="text-dark mb-1 font-weight-medium">
                      {history.length}
                    </h2>
                  </div>
                  <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                    New Order
                  </h6>
                </div>
                <div className="ml-auto mt-md-3 mt-lg-0">
                  <span className="opacity-7 text-muted">
                    <i data-feather="file-plus"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  ) : (
    <React.Fragment>
      <div style={{ marginLeft: "250px", marginTop: "100px" }}>
        <div className="page-breadcrumb">
          <div className="row">
            <h1>Only admin is allowed for accessing</h1>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
