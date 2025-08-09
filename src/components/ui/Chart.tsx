import React, { useEffect, useMemo, useState } from 'react';

export type ChartVariant = 'area' | 'pie' | 'radar' | 'radialBar' | 'bar';

interface BaseChartProps {
  variant: ChartVariant;
  data: any[];
  colors?: string[];
  height?: number;
}

interface AreaChartProps extends BaseChartProps {
  variant: 'area';
  xKey?: string; // default: 'month'
  series?: Array<{ key: string; name: string }>;
}

interface PieChartProps extends BaseChartProps {
  variant: 'pie';
  valueKey?: string; // default: 'value'
  nameKey?: string; // default: 'name'
}

interface RadarChartProps extends BaseChartProps {
  variant: 'radar';
  angleKey?: string; // default: 'subject'
  valueKey?: string; // default: 'A'
}

interface RadialBarChartProps extends BaseChartProps {
  variant: 'radialBar';
  valueKey?: string; // default: 'value'
  nameKey?: string; // default: 'name'
}

interface BarChartProps extends BaseChartProps {
  variant: 'bar';
  xKey?: string; // default: 'month'
  barKey?: string; // default: 'valeur'
  name?: string;   // legend name
}

export type ChartProps =
  | AreaChartProps
  | PieChartProps
  | RadarChartProps
  | RadialBarChartProps
  | BarChartProps;

export function Chart(props: ChartProps) {
  const { variant, data, colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'], height = 256 } = props;
  const [recharts, setRecharts] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    import('recharts').then((mod) => {
      if (mounted) setRecharts(mod);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const content = useMemo(() => {
    if (!recharts) return null;

    const {
      ResponsiveContainer,
      AreaChart,
      Area,
      CartesianGrid,
      XAxis,
      YAxis,
      Tooltip,
      Legend,
      PieChart,
      Pie,
      Cell,
      RadarChart,
      PolarGrid,
      PolarAngleAxis,
      PolarRadiusAxis,
      Radar,
      RadialBarChart,
      RadialBar,
      BarChart,
      Bar,
    } = recharts;

    if (variant === 'area') {
      const { xKey = 'month', series = [
        { key: 'income', name: 'Revenus' },
        { key: 'expenses', name: 'Dépenses' },
        { key: 'balance', name: 'Balance' },
      ] } = props as AreaChartProps;

      return (
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey={xKey} stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
              <Legend />
              {series.map((s, i) => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.name}
                  stroke={colors[i % colors.length]}
                  fill={colors[i % colors.length]}
                  fillOpacity={0.3}
                  isAnimationActive
                  animationBegin={200}
                  animationDuration={800}
                  animationEasing="ease-out"
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (variant === 'pie') {
      const { valueKey = 'value', nameKey = 'name' } = props as PieChartProps;
      return (
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey={valueKey}
                nameKey={nameKey}
                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                isAnimationActive
                animationBegin={200}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {data.map((_: any, i: number) => (
                  <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (variant === 'radar') {
      const { angleKey = 'subject', valueKey = 'A' } = props as RadarChartProps;
      return (
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#444" />
              <PolarAngleAxis dataKey={angleKey} stroke="#aaa" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#aaa" />
              <Radar
                name=""
                dataKey={valueKey}
                stroke={colors[0]}
                fill={colors[0]}
                fillOpacity={0.6}
                isAnimationActive
                animationBegin={200}
                animationDuration={800}
                animationEasing="ease-out"
              />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (variant === 'radialBar') {
      const { valueKey = 'value', nameKey = 'name' } = props as RadialBarChartProps;
      return (
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" barSize={15} data={data}>
              <RadialBar
                dataKey={valueKey}
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                isAnimationActive
                animationBegin={200}
                animationDuration={800}
                animationEasing="ease-out"
              />
              <Tooltip formatter={(v: any) => [`${v}%`, 'Progression']} contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
              <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (variant === 'bar') {
      const { xKey = 'month', barKey = 'valeur', name } = props as BarChartProps;
      return (
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey={xKey} stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
              {name ? <Legend /> : null}
              <Bar dataKey={barKey} name={name} fill={colors[4 % colors.length]} isAnimationActive animationBegin={200} animationDuration={800} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    return null;
  }, [recharts, variant, data, colors, height, props]);

  if (!recharts) {
    return (
      <div className="relative overflow-hidden rounded-lg bg-black/20" style={{ height }}>
        <div className="absolute inset-0 animate-shimmer" />
      </div>
    );
  }

  return content;
}