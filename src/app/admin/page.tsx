import Chart1 from "./_components/chart1";
import Chart2 from "./_components/chart2";

function Dashboard() {
  return (
    <div className="p-5 flex items-center gap-4 justify-start">
      <Chart2 />
      <Chart1 />
    </div>
  );
}
export default Dashboard;
