import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import noData from '../../../../assets/noData.svg';

Chart.register(ArcElement, Tooltip, Legend);

const colors = ['#E94144', '#F3722C', '#F8961E', '#F9C74F', '#90BE6D', '#43AA8B', '#577590'];

export default function SourcesStats({ data }) {
  data = data.filter((item) => item.count); // Remove items with 0 count

  const dataset = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Customers',
        data: data.map((item) => item.count),
        backgroundColor: colors,
        borderRadius: 1,
        radius: '92%',
      },
    ],
  };

  return (
    <div className="flex h-full flex-col gap-4 rounded-xl bg-gray-100 p-5 sm:rounded-3xl sm:p-8">
      <h2>Customer Source Breakdown</h2>
      {data.length === 0 ? (
        <div className="flex-center flex-1 flex-col gap-4 py-6">
          <img src={noData} alt="No Data" className="w-1/4" />
          <p>No data available for this period.</p>
        </div>
      ) : (
        <Doughnut
          data={dataset}
          options={{
            plugins: {
              legend: {
                align: 'start',
                labels: {
                  usePointStyle: true,
                  font: {
                    size: 12.5,
                  },
                },
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                displayColors: false, // Hide color box in tooltip body
                cornerRadius: 10,
                padding: 10,
              },
            },
          }}
        />
      )}
    </div>
  );
}
