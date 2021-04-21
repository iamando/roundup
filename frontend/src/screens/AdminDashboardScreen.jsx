import React, { Fragment } from "react";
import { Chart } from "react-charts";
// import { Doughnut, defaults } from "react-chartjs-2";

// defaults.global.animation = false;

const AdminDashboardScreen = () => {
  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: [
          [0, 1],
          [1, 2],
          [2, 4],
          [3, 2],
          [4, 7],
        ],
      },
      // {
      //   label: "Series 2",
      //   data: [
      //     [0, 3],
      //     [1, 1],
      //     [2, 5],
      //     [3, 6],
      //     [4, 4],
      //   ],
      // },
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  return (
    <Fragment>
      <div className="cart-table-area section-padding-100">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="pb-5">Dashboard</div>
              <div
                style={{
                  width: "100%",
                  height: "600px",
                }}
              >
                <Chart data={data} axes={axes} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminDashboardScreen;
