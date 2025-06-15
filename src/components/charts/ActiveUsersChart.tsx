import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: { timeBucket: string; value: number }[];
}

const ActiveUsersChart: React.FC<Props> = ({ data }) => {
  const formatted = data.map((d) => ({
    ...d,
    timeBucket: new Date(d.timeBucket).toLocaleDateString(),
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Active Users</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formatted}>
          <XAxis dataKey="timeBucket" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActiveUsersChart;
