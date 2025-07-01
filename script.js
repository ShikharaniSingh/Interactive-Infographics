const ctx = document.getElementById("usageChart").getContext("2d");

const labels = ['2010', '2015', '2020', '2025'];

const allDatasets = [
  {
    label: 'Asia',
    data: [922, 1600, 2300, 2900],
    backgroundColor: '#801AE5',
    borderColor: '#801AE5'
  },
  {
    label: 'Europe',
    data: [475, 550, 630, 680],
    backgroundColor: '#FF6384',
    borderColor: '#FF6384'
  },
  {
    label: 'Africa',
    data: [110, 250, 520, 700],
    backgroundColor: '#36A2EB',
    borderColor: '#36A2EB'
  },
  {
    label: 'Americas',
    data: [600, 720, 820, 900],
    backgroundColor: '#FFCE56',
    borderColor: '#FFCE56'
  }
];

let currentType = 'bar';
let currentData = [...allDatasets];

let chart = new Chart(ctx, {
  type: currentType,
  data: {
    labels: labels,
    datasets: currentData
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.raw} million`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Users (in millions)'
        }
      }
    }
  }
});

document.getElementById("regionSelect").addEventListener("change", e => {
  const value = e.target.value;
  chart.data.datasets = value === 'all'
    ? [...allDatasets]
    : [allDatasets.find(ds => ds.label === value)];
  chart.update();
});

document.getElementById("toggleChartType").addEventListener("click", () => {
  currentType = currentType === 'bar' ? 'line' : 'bar';
  chart.destroy();
  chart = new Chart(ctx, {
    type: currentType,
    data: {
      labels: labels,
      datasets: currentData
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.raw} million`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Users (in millions)'
          }
        }
      }
    }
  });
});

document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.getElementById("downloadChart").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "internet-usage-chart.png";
  link.href = document.getElementById("usageChart").toDataURL("image/png");
  link.click();
});
