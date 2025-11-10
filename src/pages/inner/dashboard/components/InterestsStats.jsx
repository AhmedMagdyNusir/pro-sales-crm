import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function InterestsStats({ data }) {
  const displayedData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Revenue',
        data: data.map((item) => item.revenue),
        backgroundColor: '#7050FF',
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="flex h-full flex-col gap-4 rounded-xl bg-gray-100 p-5 sm:rounded-3xl sm:p-8">
      <h2>Interests Revenue Breakdown</h2>
      <p>The chart below shows the revenue generated from each interest.</p>
      <div className="min-h-[350px] flex-1">
        <Bar
          data={displayedData}
          options={{
            // responsive: true,
            // aspectRatio: 1.75,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                displayColors: false, // Hide color box in tooltip body
                cornerRadius: 15,
                padding: 10,
              },
            },
            scales: {
              y: {
                ticks: {
                  display: window.innerWidth > 1200 ? true : false, // this will remove the y-axis labels on mobile screens
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
