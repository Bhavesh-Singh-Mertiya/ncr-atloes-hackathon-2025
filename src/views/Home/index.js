import React, { useEffect, useState } from "react";
import ApiLoader from "../../Components/Loader/ApiLoader";
import { imagePath } from "../../constants/imageUrl";
import Header from "../../layouts/Header/Header";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getDashboardChartApiCall,
  getDashboardCountsApiCall,
} from "../../services/dashboard/dashboard.service";
import { Line } from "react-chartjs-2";

import "./home.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      stacked: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      display: true,
      ticks: {
        // forces step size to be 50 units
        stepSize: 20,
      },
      min: 0,
    },
  },
  // plugins: {
  //   legend: {
  //     position: "top",
  //   },
  //   title: {
  //     display: true,
  //     text: "Chart.js Line Chart",
  //   },
  // },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    // {
    //   borderWidth: 4.5, // and not lineWidth
    //   borderColor: "#A64697",
    //   fillColor: "#A64697",
    //   strokeColor: "#A64697",
    //   pointColor: "#A64697",
    //   pointStrokeColor: "#9DB86D",
    //   data: [0, 25, 30, 45, 57, 100, 80],
    //   //  borderColor: "rgb(255, 99, 132)",
    //   backgroundColor: "#A64697",
    //   pointRadius: 0,
    //   lineTension: 0.09,
    // },
  ],
};

function Home() {
  const [loading, setLoading] = useState(true);

  const [newUserData, setNewUserData] = useState({
    labels: [],
    datasets: [
      // {
      //   borderWidth: 4.5, // and not lineWidth
      //   borderColor: "#A64697",
      //   fillColor: "#A64697",
      //   strokeColor: "#A64697",
      //   pointColor: "#A64697",
      //   pointStrokeColor: "#9DB86D",
      //   data: [],
      //   //  borderColor: "rgb(255, 99, 132)",
      //   backgroundColor: "#A64697",
      //   pointRadius: 0,
      //   lineTension: 0.09,
      // },
    ],
  });

  const [totalUserData, setTotalUserData] = useState({
    labels: [],
    datasets: [
      // {
      //   borderWidth: 4.5, // and not lineWidth
      //   borderColor: "#A64697",
      //   fillColor: "#A64697",
      //   strokeColor: "#A64697",
      //   pointColor: "#A64697",
      //   pointStrokeColor: "#9DB86D",
      //   data: [],
      //   //  borderColor: "rgb(255, 99, 132)",
      //   backgroundColor: "#A64697",
      //   pointRadius: 0,
      //   lineTension: 0.09,
      // },
    ],
  });

  const [totalBookingData, setTotalBookingData] = useState({
    labels: [],
    datasets: [
      // {
      //   borderWidth: 4.5, // and not lineWidth
      //   borderColor: "#A64697",
      //   fillColor: "#A64697",
      //   strokeColor: "#A64697",
      //   pointColor: "#A64697",
      //   pointStrokeColor: "#9DB86D",
      //   data: [],
      //   //  borderColor: "rgb(255, 99, 132)",
      //   backgroundColor: "#A64697",
      //   pointRadius: 0,
      //   lineTension: 0.09,
      // },
    ],
  });

  const [countData, setCountData] = useState({
    new_users: 0,
    total_users: 0,
    total_spots: 0,
    new_spots: 0,
    total_bookings: 0,
    total_payment: 0,
  });

  const fetchDashbaordCount = async () => {
    return getDashboardCountsApiCall().then((response) => {
      setCountData((prevState) => {
        return { ...prevState, ...response.data.data };
      });
      return Promise.resolve(response);

      // console.log(response, "dashboardCount");
    });
  };

  //fetch new user chart data
  const fetchNewUserChart = async (filter) => {
    return getDashboardChartApiCall(filter)
      .then((response) => {
        setNewUserData({
          labels: response.data.data.labels,
          datasets: [
            {
              borderWidth: 4.5, // and not lineWidth
              borderColor: "#A64697",
              fillColor: "#A64697",
              strokeColor: "#A64697",
              pointColor: "#A64697",
              pointStrokeColor: "#9DB86D",
              data: response.data.data.labelCounts,
              //  borderColor: "rgb(255, 99, 132)",
              backgroundColor: "#A64697",
              // pointRadius: 0,
              lineTension: 0.09,
            },
          ],
        });
        console.log(response.data.data);
      })
      .catch((error) => {});
  };
  //fetch total user chart data
  const fetchTotalUserChart = async (filter) => {
    return getDashboardChartApiCall(filter)
      .then((response) => {
        setTotalUserData({
          labels: response.data.data.labels,
          datasets: [
            {
              borderWidth: 4.5, // and not lineWidth
              borderColor: "#A64697",
              fillColor: "#A64697",
              strokeColor: "#A64697",
              pointColor: "#A64697",
              pointStrokeColor: "#9DB86D",
              data: response.data.data.labelCounts,
              //  borderColor: "rgb(255, 99, 132)",
              backgroundColor: "#A64697",
              //  pointRadius: 0,
              lineTension: 0.09,
            },
          ],
        });
      })
      .catch((error) => {});
  };
  //fetch booking chart data
  const fetchBookingChart = async (filter) => {
    return getDashboardChartApiCall(filter)
      .then((response) => {
        setTotalBookingData({
          labels: response.data.data.labels,
          datasets: [
            {
              borderWidth: 4.5, // and not lineWidth
              borderColor: "#A64697",
              fillColor: "#A64697",
              strokeColor: "#A64697",
              pointColor: "#A64697",
              pointStrokeColor: "#9DB86D",
              data: response.data.data.labelCounts,
              //  borderColor: "rgb(255, 99, 132)",
              backgroundColor: "#A64697",
              // pointRadius: 0,
              lineTension: 0.09,
            },
          ],
        });
      })
      .catch((error) => {});
  };

  useEffect(() => {
    setLoading(false);
    // async function fetchData() {
    //   Promise.all([
    //     fetchDashbaordCount(),
    //     fetchNewUserChart({
    //       monthCount: 3,
    //       type: "new_user",
    //     }),
    //     fetchTotalUserChart({
    //       monthCount: 3,
    //       type: "user",
    //     }),
    //     fetchBookingChart({
    //       monthCount: 3,
    //       type: "booking",
    //     }),
    //   ])
    //     .then((response) => {
    //       console.log(response);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    // fetchData();

    return () => {
      console.log("This will be logged on unmount");
    };
  }, []);

  return (
    <>
      {loading && <ApiLoader />}
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper px-2">
        {/* Content Header (Page header) */}
        <div className="content-header px-0">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 fw-semibold text-default">Dashboard</h1>
              </div>
              {/* /.col */}
              {/* <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Dashboard v1</li>
                                </ol>
                            </div> */}
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content px-0">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row ">
              <div className="col-xl-4 col-lg-6 col-md-6">
                {/* small box */}
                <div className="card border purple-bg shadow-none">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                      <p className="text-white m-0 fs-17 fw-semibold">
                        New Users
                      </p>
                      <h2 className="text-white mb-0 fw-semibold">
                        {countData.new_users}
                      </h2>
                    </div>
                    <div className="col-auto">
                      <div className="icon text-white p-0 m-0">
                        {imagePath.usersIcon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ./col */}
              <div className="col-xl-4 col-lg-6 col-md-6">
                {/* small box */}
                <div className="card border lightgreen-bg shadow-none">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                      <p className="text-white m-0 fs-17 fw-semibold">
                        Total Users
                      </p>
                      <h2 className="text-white mb-0 fw-semibold">
                        {countData.total_users}
                      </h2>
                    </div>
                    <div className="col-auto">
                      <div className="icon text-white p-0 m-0">
                        {imagePath.usersIcon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ./col */}
              <div className="col-xl-4 col-lg-6 col-md-6">
                {/* small box */}
                <div className="card border teal-bg shadow-none">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                      <p className="text-white m-0 fs-17 fw-semibold">
                        Total Bookings
                      </p>
                      <h2 className="text-white mb-0 fw-semibold">
                        {" "}
                        {countData.total_bookings}
                      </h2>
                    </div>
                    <div className="col-auto">
                      <div className="icon text-white p-0 m-0">
                        {imagePath.bookingIcon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ./col */}
              <div className="col-xl-4 col-lg-6 col-md-6">
                {/* small box */}
                <div className="card border red-bg shadow-none">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                      <p className="text-white m-0 fs-17 fw-semibold">
                        Total Payment
                      </p>
                      <h2 className="text-white mb-0 fw-semibold">
                        {" "}
                        {countData.total_payment}
                      </h2>
                    </div>
                    <div className="col-auto">
                      <div className="icon text-white p-0 m-0">
                        {imagePath.paymentIcon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ./col */}
              <div className="col-xl-4 col-lg-6 col-md-6">
                {/* small box */}
                <div className="card border cyan-bg shadow-none">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                      <p className="text-white m-0 fs-17 fw-semibold">
                        New Spots
                      </p>
                      <h2 className="text-white mb-0 fw-semibold">
                        {countData.new_spots}
                      </h2>
                    </div>
                    <div className="col-auto">
                      <div className="icon text-white p-0 m-0">
                        {imagePath.spotsIcon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ./col */}
              <div className="col-xl-4 col-lg-6 col-md-6">
                {/* small box */}
                <div className="card border yellow-bg shadow-none">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                      <p className="text-white m-0 fs-17 fw-semibold">
                        Total Spots
                      </p>
                      <h2 className="text-white mb-0 fw-semibold">
                        {countData.total_spots}
                      </h2>
                    </div>
                    <div className="col-auto">
                      <div className="icon text-white p-0 m-0">
                        {imagePath.spotsIcon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ./col */}
            </div>
            {/* /.row */}
            <div className="row">
              <div className="col-md-6">
                <div className="whitecard bg-white rounded">
                  <h4 className="fs-18 fw-bold text-dark d-flex justify-content-between align-items-center ps-2">
                    New User
                    <select
                      className="form-select w-auto fs-15"
                      onChange={(event) => {
                        fetchNewUserChart({
                          monthCount: event.target.value,
                          type: "new_user",
                        });
                        // console.log(event.target.value);
                      }}
                    >
                      <option value="3">Last 3 Months</option>
                      <option value="6">Last 6 Months</option>
                      <option value="12">Last 12 Months</option>
                    </select>
                  </h4>
                  <div style={{ height: "300px" }}>
                    <Line options={options} data={newUserData} />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="whitecard bg-white rounded">
                  <h4 className="fs-18 fw-bold text-dark d-flex justify-content-between align-items-center ps-2">
                    Total Users
                    <select
                      className="form-select w-auto fs-15"
                      onChange={(event) => {
                        fetchTotalUserChart({
                          monthCount: event.target.value,
                          type: "user",
                        });
                        // console.log(event.target.value);
                      }}
                    >
                      <option value="3">Last 3 Months</option>
                      <option value="6">Last 6 Months</option>
                      <option value="12">Last 12 Months</option>
                    </select>
                  </h4>
                  <div style={{ height: "300px" }}>
                    <Line options={options} data={totalUserData} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="whitecard bg-white rounded">
                  <h4 className="fs-18 fw-bold text-dark d-flex justify-content-between align-items-center ps-2">
                    Total Booking
                    <select
                      className="form-select w-auto fs-15"
                      onChange={(event) => {
                        fetchBookingChart({
                          monthCount: event.target.value,
                          type: "booking",
                        });
                        // console.log(event.target.value);
                      }}
                    >
                      <option value="3">Last 3 Months</option>
                      <option value="6">Last 6 Months</option>
                      <option value="12">Last 12 Months</option>
                    </select>
                  </h4>
                  <div style={{ height: "300px" }}>
                    <Line options={options} data={totalBookingData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
}

export default Home;
