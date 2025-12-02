import { useEffect, useState } from "react";
import client from "../api/axiosClient";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await client.get("/api/analytics");
      setData(res.data);
    })();
  }, []);

  if (!data) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={{ padding: 30, color: "white" }}>
      <h2>📊 Weekly Analytics</h2>

      {/* Steps Chart */}
      <div className="chart-box">
        <h3>Steps</h3>
        <Line
          data={{
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
              {
                label: "Steps",
                data: data.steps,
                borderColor: "#4caf50"
              }
            ]
          }}
        />
      </div>

      {/* Calories Chart */}
      <div className="chart-box">
        <h3>Calories</h3>
        <Line
          data={{
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
              {
                label: "Calories",
                data: data.calories,
                borderColor: "#ff9800"
              }
            ]
          }}
        />
      </div>

      {/* Weight Chart */}
      <div className="chart-box">
        <h3>Weight Progress</h3>
        <Line
          data={{
            labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7"],
            datasets: [
              {
                label: "Weight (kg)",
                data: data.weight,
                borderColor: "#03a9f4"
              }
            ]
          }}
        />
      </div>
    </div>
  );
}
