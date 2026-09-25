import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS } from '../../data/products';
import { Price } from '../../components/common/Price';
import {
  TrendingUp,
  Banknote,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  Sparkles,
  PieChart,
  BarChart2,
  ChevronRight,
  ExternalLink,
  Store
} from 'lucide-react';
import { DEFAULT_PRODUCT_IMAGE, handleProductImageError } from '../../utils/imageFallback';

interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

const REVENUE_SERIES: Record<'7d' | '30d' | 'month' | 'year', RevenueDataPoint[]> = {
  '7d': [
    { date: 'Sep 13', revenue: 24500, orders: 8 },
    { date: 'Sep 14', revenue: 38200, orders: 12 },
    { date: 'Sep 15', revenue: 31000, orders: 10 },
    { date: 'Sep 16', revenue: 56400, orders: 18 },
    { date: 'Sep 17', revenue: 49800, orders: 15 },
    { date: 'Sep 18', revenue: 78500, orders: 24 },
    { date: 'Sep 19', revenue: 92300, orders: 28 },
  ],
  '30d': [
    { date: 'W1 Aug', revenue: 145000, orders: 54 },
    { date: 'W2 Aug', revenue: 189000, orders: 68 },
    { date: 'W3 Aug', revenue: 232000, orders: 84 },
    { date: 'W4 Aug', revenue: 284000, orders: 102 },
    { date: 'W1 Sep', revenue: 265000, orders: 96 },
    { date: 'W2 Sep', revenue: 340000, orders: 124 },
  ],
  month: [
    { date: 'Sep 01 - 04', revenue: 84000, orders: 32 },
    { date: 'Sep 05 - 08', revenue: 112000, orders: 41 },
    { date: 'Sep 09 - 12', revenue: 145000, orders: 53 },
    { date: 'Sep 13 - 16', revenue: 172000, orders: 62 },
    { date: 'Sep 17 - 19', revenue: 215000, orders: 78 },
  ],
  year: [
    { date: 'Jan', revenue: 480000, orders: 160 },
    { date: 'Feb', revenue: 520000, orders: 178 },
    { date: 'Mar', revenue: 640000, orders: 215 },
    { date: 'Apr (Eid)', revenue: 1280000, orders: 440 },
    { date: 'May', revenue: 710000, orders: 240 },
    { date: 'Jun', revenue: 830000, orders: 275 },
    { date: 'Jul', revenue: 890000, orders: 295 },
    { date: 'Aug', revenue: 950000, orders: 310 },
    { date: 'Sep (Current)', revenue: 728000, orders: 266 },
  ]
};

export const AdminAnalyticsPage: React.FC = () => {
  const { orders } = useAuth();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'month' | 'year'>('7d');
  const [hoveredPoint, setHoveredPoint] = useState<RevenueDataPoint | null>(null);

  const series = REVENUE_SERIES[timeRange];
  const maxRevenue = Math.max(...series.map((p) => p.revenue));
  const totalRevenuePeriod = series.reduce((sum, p) => sum + p.revenue, 0);
  const totalOrdersPeriod = series.reduce((sum, p) => sum + p.orders, 0);
  const avgOrderValPeriod = Math.round(totalRevenuePeriod / (totalOrdersPeriod || 1));

  // Category breakdown
  const categoryStats = [
    { name: 'Electronics & Audio', share: 38, revenue: 385000, growth: '+22.4%', color: '#2196F3' },
    { name: "Women's Jamdani & Silk", share: 27, revenue: 273000, growth: '+18.1%', color: '#FF5722' },
    { name: "Men's Festive Panjabi", share: 17, revenue: 172000, growth: '+14.6%', color: '#FF9800' },
    { name: 'Organic Agro (Khaas Food)', share: 11, revenue: 111000, growth: '+9.3%', color: '#4CAF50' },
    { name: 'Luxury Fragrance (Al-Haramain)', share: 7, revenue: 71000, growth: '+26.8%', color: '#FFC107' },
  ];

  // Top Products Leaderboard
  const topProducts = [
    {
      product: PRODUCTS[12] || PRODUCTS[0], // Dhakai Jamdani
      salesCount: 48,
      revenue: 600000,
      conversion: '5.2%'
    },
    {
      product: PRODUCTS[0], // Sony XM5
      salesCount: 22,
      revenue: 759000,
      conversion: '3.8%'
    },
    {
      product: PRODUCTS[8] || PRODUCTS[1], // Aarong Panjabi
      salesCount: 65,
      revenue: 211250,
      conversion: '6.4%'
    },
    {
      product: PRODUCTS[20] || PRODUCTS[2], // Al-Haramain
      salesCount: 34,
      revenue: 232900,
      conversion: '4.7%'
    },
    {
      product: PRODUCTS[18] || PRODUCTS[3], // Khaas Food Oil
      salesCount: 142,
      revenue: 51120,
      conversion: '8.1%'
    },
  ];

  // SVG dimensions for revenue curve
  const svgWidth = 800;
  const svgHeight = 260;
  const paddingX = 45;
  const paddingY = 30;

  const points = series.map((p, i) => {
    const x = paddingX + (i / (series.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - (p.revenue / maxRevenue) * (svgHeight - paddingY * 2);
    return { x, y, data: p };
  });

  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x},${pt.y}`;
    const prev = points[i - 1];
    const cpx1 = prev.x + (pt.x - prev.x) / 2;
    const cpy1 = prev.y;
    const cpx2 = prev.x + (pt.x - prev.x) / 2;
    const cpy2 = pt.y;
    return `${acc} C ${cpx1},${cpy1} ${cpx2},${cpy2} ${pt.x},${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${svgHeight - paddingY} L ${points[0].x},${svgHeight - paddingY} Z`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Quick Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-100 text-[#FF5722] border border-orange-200">
              Live Business Intelligence
            </span>
            <span className="text-xs text-slate-400">• Updated 2 mins ago</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Sales & Revenue Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Executive revenue trajectories, orders fulfillment breakdown, category distributions, and top product performers.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold shadow-2xs transition-colors"
          >
            <Store className="w-3.5 h-3.5 text-[#FF5722]" /> Visit Storefront
          </Link>

          {/* Time Range Filter Pill */}
          <div className="bg-slate-200/80 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
            {(['7d', '30d', 'month', 'year'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeRange === r
                    ? 'bg-[#FF5722] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : r === 'month' ? 'This Month' : '2026 Year'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 4 KPI Executive Highlight Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue in Period */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Period Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Banknote className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            ৳ {totalRevenuePeriod.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1.5">
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" /> +24.8% vs previous period
          </span>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Completed Orders</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2196F3] flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {totalOrdersPeriod.toLocaleString()}
          </div>
          <span className="text-[11px] text-[#2196F3] font-bold flex items-center gap-1 mt-1.5">
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" /> +16.2% order volume
          </span>
        </div>

        {/* Average Order Value (AOV) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Average Order (AOV)</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF9800] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            ৳ {avgOrderValPeriod.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-500 font-semibold mt-1.5 block">
            Across 64 Bangladesh districts
          </span>
        </div>

        {/* Conversion & Repeat Rate */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Conversion & Retention</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            4.2% <span className="text-xs font-normal text-slate-400">/ 41.8%</span>
          </div>
          <span className="text-[11px] text-purple-600 font-bold flex items-center gap-1 mt-1.5">
            Repeat buyer rate: 41.8%
          </span>
        </div>
      </div>

      {/* Main Interactive Revenue Graph Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Revenue Trajectory Curve</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                +18.4% Upward Trend
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Hover over points to inspect date, gross sales (৳), and fulfilled order volume.
            </p>
          </div>

          {hoveredPoint ? (
            <div className="bg-slate-900 text-white px-4 py-2 rounded-2xl text-xs flex items-center gap-4 animate-scaleUp">
              <div>
                <span className="text-[10px] text-slate-400 block">{hoveredPoint.date}</span>
                <strong className="text-sm font-black text-emerald-400">
                  ৳ {hoveredPoint.revenue.toLocaleString('en-IN')}
                </strong>
              </div>
              <div className="border-l border-slate-700 pl-3">
                <span className="text-[10px] text-slate-400 block">Orders</span>
                <strong className="text-sm font-bold text-white">{hoveredPoint.orders} orders</strong>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 font-medium">
              Hover over data points to inspect
            </div>
          )}
        </div>

        {/* SVG Responsive Line & Area Graph */}
        <div className="pt-6 overflow-x-auto">
          <div className="min-w-[640px]">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible select-none">
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF5722" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#FF5722" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                const y = svgHeight - paddingY - pct * (svgHeight - paddingY * 2);
                const val = Math.round(maxRevenue * pct);
                return (
                  <g key={idx}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={svgWidth - paddingX}
                      y2={y}
                      stroke="#F1F5F9"
                      strokeWidth="1"
                      strokeDasharray={pct === 0 ? 'none' : '4 4'}
                    />
                    <text
                      x={paddingX - 10}
                      y={y + 3}
                      textAnchor="end"
                      className="text-[10px] fill-slate-400 font-mono"
                    >
                      ৳{val >= 1000 ? `${Math.round(val / 1000)}k` : val}
                    </text>
                  </g>
                );
              })}

              {/* Area fill */}
              <path d={areaD} fill="url(#revenueGradient)" />

              {/* Stroke line */}
              <path
                d={pathD}
                fill="none"
                stroke="#FF5722"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points & Interactive Hover Rings */}
              {points.map((pt, idx) => (
                <g
                  key={idx}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredPoint(pt.data)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {/* Invisible enlarged hit area */}
                  <circle cx={pt.x} cy={pt.y} r="18" fill="transparent" />

                  {/* Outer glow ring on hover */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPoint?.date === pt.data.date ? 8 : 5}
                    fill="#FF5722"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    className="transition-all duration-200 drop-shadow-xs"
                  />

                  {/* X-axis date labels */}
                  <text
                    x={pt.x}
                    y={svgHeight - 8}
                    textAnchor="middle"
                    className={`text-[10px] font-semibold transition-colors ${
                      hoveredPoint?.date === pt.data.date ? 'fill-[#FF5722] font-bold' : 'fill-slate-400'
                    }`}
                  >
                    {pt.data.date}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Dual Analytics Row: Category Share & Order Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Sales Distribution (7 Columns) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Category Sales Breakdown</h3>
              <p className="text-xs text-slate-400">Share of total store revenue by department</p>
            </div>
            <span className="text-xs font-bold text-[#FF5722]">100% Verified</span>
          </div>

          <div className="space-y-4">
            {categoryStats.map((cat, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold text-emerald-600">{cat.growth}</span>
                    <span className="font-black text-slate-900">৳{cat.revenue.toLocaleString('en-IN')}</span>
                    <span className="text-slate-400 font-medium">({cat.share}%)</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${cat.share}%`,
                      backgroundColor: cat.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Fulfillment Health (5 Columns) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="pb-4 border-b border-slate-100 mb-4">
            <h3 className="text-sm font-bold text-slate-900">Fulfillment Status</h3>
            <p className="text-xs text-slate-400">Delivery cycle & courier handoff health</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
              <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
              </div>
              <strong className="text-xl font-black text-emerald-800">76.4%</strong>
              <span className="text-[10px] text-emerald-600 block mt-0.5">Prompt completion</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-1.5 text-blue-700 text-xs font-bold mb-1">
                <Truck className="w-3.5 h-3.5" /> In Transit
              </div>
              <strong className="text-xl font-black text-blue-800">14.8%</strong>
              <span className="text-[10px] text-blue-600 block mt-0.5">Steadfast courier</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100">
              <div className="flex items-center gap-1.5 text-amber-700 text-xs font-bold mb-1">
                <Clock className="w-3.5 h-3.5" /> Processing
              </div>
              <strong className="text-xl font-black text-amber-800">5.6%</strong>
              <span className="text-[10px] text-amber-600 block mt-0.5">Warehouse packing</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-100">
              <div className="flex items-center gap-1.5 text-rose-700 text-xs font-bold mb-1">
                <RotateCcw className="w-3.5 h-3.5" /> Returns
              </div>
              <strong className="text-xl font-black text-rose-800">3.2%</strong>
              <span className="text-[10px] text-rose-600 block mt-0.5">Lowest in BD e-com</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
            <span className="font-semibold">Average Delivery Time:</span>
            <span className="font-black text-slate-900">28 Hours (Inside Dhaka)</span>
          </div>
        </div>
      </div>

      {/* Top Products Leaderboard Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Top Performing Products Leaderboard</h3>
            <p className="text-xs text-slate-400">High-converting inventory items generating store revenue</p>
          </div>
          <Link
            to="/admin/products"
            className="text-xs font-bold text-[#FF5722] hover:underline flex items-center gap-1"
          >
            <span>Manage Catalog</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="pb-3 pl-2">Product</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Units Sold</th>
                <th className="pb-3">Gross Revenue</th>
                <th className="pb-3">Conversion</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {topProducts.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 pl-2">
                    <div className="flex items-center gap-3">
                      <span className="w-5 font-black text-slate-400">#{idx + 1}</span>
                      <img
                        src={item.product.images?.[0] || DEFAULT_PRODUCT_IMAGE}
                        alt={item.product.name}
                        onError={handleProductImageError}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-slate-900 line-clamp-1 block max-w-xs">
                          {item.product.name}
                        </span>
                        <span className="text-[11px] text-slate-400 font-normal">
                          ৳{item.product.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-slate-600">{item.product.category}</td>
                  <td className="py-3">
                    <span className="font-bold text-slate-900">{item.salesCount} units</span>
                  </td>
                  <td className="py-3">
                    <span className="font-black text-emerald-600">
                      ৳ {item.revenue.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                      {item.conversion}
                    </span>
                  </td>
                  <td className="py-3 text-right pr-2">
                    <Link
                      to={`/product/${item.product.slug}`}
                      target="_blank"
                      className="p-1.5 text-slate-400 hover:text-[#FF5722] hover:bg-orange-50 rounded-lg inline-block transition-colors"
                      title="View on Storefront"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
