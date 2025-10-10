import { useAuth } from '../context/AuthContext';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import TrueVoicePopup from '../components/TrueVoicePopup';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'rgba(255, 255, 255, 0.8)',
      }
    },
  },
  scales: {
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.6)',
      },
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.6)',
      },
    },
  },
};

const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  datasets: [
    {
      label: 'Active Users',
      data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 72],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      tension: 0.4,
      fill: true,
    },
  ],
};

const projectData = {
  labels: ['Frontend', 'Backend', 'Design', 'QA', 'Deployment'],
  datasets: [
    {
      label: 'Tasks Completed',
      data: [12, 19, 8, 15, 7],
      backgroundColor: [
        'rgba(99, 102, 241, 0.7)',
        'rgba(59, 130, 246, 0.7)',
        'rgba(14, 165, 233, 0.7)',
        'rgba(6, 182, 212, 0.7)',
        'rgba(8, 145, 178, 0.7)'
      ],
      borderColor: [
        'rgba(99, 102, 241, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(14, 165, 233, 1)',
        'rgba(6, 182, 212, 1)',
        'rgba(8, 145, 178, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

const activityData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Commits',
      data: [3, 5, 4, 7, 6, 2, 1],
      backgroundColor: 'rgba(99, 102, 241, 0.7)',
    },
    {
      label: 'Pull Requests',
      data: [2, 3, 1, 4, 3, 1, 0],
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
    },
  ],
};

export default function Dashboard() {
  const { user } = useAuth();
  
  const chartCards = [
    {
      title: 'Monthly Active Users',
      chart: <Line data={monthlyData} options={chartOptions} />,
    },
    {
      title: 'Project Distribution',
      chart: <Doughnut data={projectData} options={chartOptions} />,
    },
    {
      title: 'Weekly Activity',
      chart: <Bar data={activityData} options={{
        ...chartOptions,
        scales: {
          ...chartOptions.scales,
          x: {
            ...chartOptions.scales.x,
            stacked: true,
          },
          y: {
            ...chartOptions.scales.y,
            stacked: true,
          },
        },
      }} />,
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-300">Welcome back <span className="font-semibold text-white">{user?.email || "user@kace.dev"}</span>! Here's what's happening today.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { name: 'Total Users', value: '2,345', change: '+12.1%' },
          { name: 'Active Projects', value: '18', change: '+3.2%' },
          { name: 'Tasks Completed', value: '1,234', change: '+8.7%' },
          { name: 'Productivity', value: '87%', change: '+2.4%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
            <p className="text-sm font-medium text-gray-300">{stat.name}</p>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <span className="ml-2 text-sm font-medium text-green-400">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Main Chart - Takes 2 columns on larger screens */}
        <div className="md:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="font-semibold text-lg mb-4">Monthly Overview</h3>
          <div className="h-80">
            <Line data={monthlyData} options={{
              ...chartOptions,
              maintainAspectRatio: false,
              plugins: {
                ...chartOptions.plugins,
                legend: { display: false }
              }
            }} />
          </div>
        </div>

        {/* Sidebar - Takes 1 column */}
        <div className="space-y-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="font-semibold text-lg mb-4">Project Distribution</h3>
            <div className="h-64">
              <Doughnut data={projectData} options={{
                ...chartOptions,
                maintainAspectRatio: false,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    ...chartOptions.plugins.legend,
                    position: 'bottom'
                  }
                }
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* TrueVoice Popup */}
        <div className="md:col-span-1">
          <TrueVoicePopup />
        </div>

        {/* Activity Feed */}
        <div className="md:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { user: 'Kervin Padilla', action: 'completed task', project: 'Dashboard Redesign', time: '10 min ago' },
              { user: 'Dwayne Dizon', action: 'commented on', project: 'API Integration', time: '25 min ago' },
              { user: 'Josh Gorospe', action: 'assigned you to', project: 'Mobile App Updates', time: '1 hour ago' },
              { user: 'Kiana De Jesus', action: 'requested review on', project: 'Documentation', time: '2 hours ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                  {item.user.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{item.user}</span> {item.action} <span className="text-indigo-300">{item.project}</span>
                  </p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="font-semibold text-lg mb-4">Weekly Activity</h3>
          <div className="h-64">
            <Bar data={activityData} options={{
              ...chartOptions,
              maintainAspectRatio: false,
              plugins: {
                ...chartOptions.plugins,
                legend: {
                  ...chartOptions.plugins.legend,
                  position: 'bottom'
                }
              },
              scales: {
                ...chartOptions.scales,
                x: {
                  ...chartOptions.scales.x,
                  stacked: true,
                },
                y: {
                  ...chartOptions.scales.y,
                  stacked: true,
                },
              },
            }} />
          </div>
        </div>
      </div>
    </main>
  )
}