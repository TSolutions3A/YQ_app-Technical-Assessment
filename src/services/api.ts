export const fetchDashboardData = async () => {
  const response = await fetch('/sample_data.json');
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
};