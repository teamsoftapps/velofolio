"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import ReportHeader from '../components/reportComp/ReportHeader'
import ReportGraph from '../components/reportComp/ReportGraph'
import ReportPiChart from '../components/reportComp/ReportPiChart'
import TeamUtilization from '../components/reportComp/TeamUtilization'
import TopPerfomingProject from '../components/reportComp/TopPerfomingProject'
import ReportDropdown from '../components/ReportDropDown'
import { DateValue, parseDate } from "@internationalized/date";

const reports = () => {
  const [selectedView, setSelectedView] = useState<'leads' | 'jobs' | 'payments'>('leads');
  const [selectedTab, setSelectedTab] = useState<'All' | 'Leads' | 'Shoots' | 'Revenue'>('All');

  const [timeRange, setTimeRange] = useState('7 Days');
  const [calendarValue, setCalendarValue] = useState<DateValue>(parseDate("2026-03-26"));

  const handleExport = () => {
    const originalTitle = document.title;
    document.title = `Velofolio_Business_Report_${new Date().toISOString().split('T')[0]}`;
    window.print();
    document.title = originalTitle;
  };

  const getMonthName = (date: DateValue) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return jsDate.toLocaleString("en-US", { month: "long" });
  };

  // --- Auto-generated summary ---
  const getSummary = () => {
    const m = timeRange === '30 Days' ? 4.2 : timeRange === 'Mtd' ? 3.5 : timeRange === 'Ytd' ? 48 : 1;
    if (selectedView === 'leads') {
      const total = Math.floor(22 * m);
      const converted = Math.floor(10 * m);
      const active = Math.floor(10 * m);
      const lost = Math.floor(2 * m);
      const convRate = ((converted / total) * 100).toFixed(0);
      const activeRate = ((active / total) * 100).toFixed(0);
      return {
        line1: `During the ${timeRange} period, your pipeline captured ${total} total leads with a ${convRate}% conversion rate and ${activeRate}% currently active.`,
        line2: `${converted} leads were successfully converted, ${active} remain in progress, and ${lost} were lost — indicating a healthy funnel with manageable drop-off.`,
      };
    } else if (selectedView === 'jobs') {
      const total = Math.floor(20 * m);
      const completed = Math.floor(9 * m);
      const pending = Math.floor(9 * m);
      const cancelled = Math.floor(2 * m);
      const compRate = ((completed / total) * 100).toFixed(0);
      return {
        line1: `Over the ${timeRange} period, ${total} jobs were tracked with a ${compRate}% completion rate and ${pending} currently in progress.`,
        line2: `${completed} jobs were completed successfully and ${cancelled} were cancelled — workflow efficiency remains strong across active engagements.`,
      };
    } else {
      const revenue = Math.floor(12450 * m);
      const paid = Math.floor(8200 * m);
      const pending = Math.floor(3500 * m);
      const overdue = Math.floor(750 * m);
      const paidRate = ((paid / revenue) * 100).toFixed(0);
      return {
        line1: `Total revenue generated over the ${timeRange} period stands at $${revenue.toLocaleString()}, with ${paidRate}% ($${paid.toLocaleString()}) already collected.`,
        line2: `$${pending.toLocaleString()} remains pending collection and $${overdue.toLocaleString()} is overdue — immediate follow-up on overdue accounts is recommended.`,
      };
    }
  };
  const summary = getSummary();

  return (
    <div className='w-full min-h-screen bg-[#FAFAFA] pb-24'>
      <style jsx global>{`
        @media screen {
          .print-only-container {
            position: absolute;
            left: -9999px;
            top: 0;
            width: 1200px;
            overflow: hidden;
            height: 0;
          }
        }
        @media print {
          @page {
            size: A4 landscape;
            margin: 10mm;
          }
          body {
            background-color: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .screen-only-content {
            display: none !important;
          }
          .print-only-container {
            display: block !important;
            position: static !important;
            width: 100% !important;
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            overflow: visible !important;
          }
          .report-document {
             width: 277mm !important;
             background: white !important;
             margin: 0 !important;
             padding: 0 !important;
          }
          .report-section {
            width: 100% !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            margin-bottom: 20px;
          }
          .kpi-grid {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 15px !important;
            margin-bottom: 25px;
          }
          .kpi-card {
            border: 1px solid #e5e7eb !important;
            padding: 15px !important;
            border-radius: 8px !important;
            background: white !important;
          }
          .print-chart-container {
             width: 100% !important;
             height: auto !important;
             border: none !important;
             margin-top: 10px;
          }
          /* Custom Chart Styles for Print */
          canvas {
            max-width: 100% !important;
            height: auto !important;
          }
        }
      `}</style>

      {/* 1. SCREEN ONLY CONTENT (The interactive dashboard) */}
      <div className="screen-only-content">
        <Navbar />
        <div className='container mx-auto w-[100%] h-full px-4 sm:px-10'>
          <ReportHeader
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            value={calendarValue}
            setValue={setCalendarValue}
            onExport={handleExport}
          />

          <div className='charts px-2 lg:px-3 flex gap-3 md:gap-10 w-full flex-col lg:flex-row items-start justify-between overflow-hidden'>
            <div className='w-full sm:w-2/3 md:w-full lg:w-2/3 border border-gray-200 bg-white shadow-sm overflow-hidden rounded-xl'>
              <ReportGraph
                selectedView={selectedView}
                setSelectedView={setSelectedView}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                timeRange={timeRange}
              />
            </div>
            <ReportPiChart
              selectedView={selectedView}
              timeRange={timeRange}
            />
          </div>
        </div>
      </div>

      {/* 2. PRINT ONLY CONTENT — Full 3-section management report */}
      <div className="print-only-container px-4">
        <div className="report-document">
          {(() => {
            const m = timeRange === '30 Days' ? 4.2 : timeRange === 'Mtd' ? 3.5 : timeRange === 'Ytd' ? 48 : 1;

            const sectionData: Record<string, any> = {
              leads: {
                title: 'Lead Performance',
                color: '#3B82F6',
                kpis: [
                  { label: 'Total Leads', value: Math.floor(22 * m), color: '#3B82F6', bg: '#EFF6FF' },
                  { label: 'Active Leads', value: Math.floor(10 * m), color: '#F59E0B', bg: '#FFFBEB' },
                  { label: 'Converted Leads', value: Math.floor(10 * m), color: '#10B981', bg: '#ECFDF5' },
                  { label: 'Lost Leads', value: Math.floor(2 * m), color: '#EF4444', bg: '#FEF2F2' },
                ],
                summary: {
                  line1: `During the ${timeRange} period, your pipeline captured ${Math.floor(22 * m)} total leads with a ${((10 / 22) * 100).toFixed(0)}% conversion rate and ${((10 / 22) * 100).toFixed(0)}% currently active.`,
                  line2: `${Math.floor(10 * m)} leads were successfully converted, ${Math.floor(10 * m)} remain in progress, and ${Math.floor(2 * m)} were lost — indicating a healthy funnel with manageable drop-off.`,
                },
              },
              jobs: {
                title: 'Job Fulfillment',
                color: '#6366F1',
                kpis: [
                  { label: 'Total Jobs', value: Math.floor(20 * m), color: '#6366F1', bg: '#EEF2FF' },
                  { label: 'Pending Jobs', value: Math.floor(9 * m), color: '#F59E0B', bg: '#FFFBEB' },
                  { label: 'Completed Jobs', value: Math.floor(9 * m), color: '#10B981', bg: '#ECFDF5' },
                  { label: 'Cancelled Jobs', value: Math.floor(2 * m), color: '#EF4444', bg: '#FEF2F2' },
                ],
                summary: {
                  line1: `Over the ${timeRange} period, ${Math.floor(20 * m)} jobs were tracked with a ${((9 / 20) * 100).toFixed(0)}% completion rate and ${Math.floor(9 * m)} currently in progress.`,
                  line2: `${Math.floor(9 * m)} jobs were completed successfully and ${Math.floor(2 * m)} were cancelled — workflow efficiency remains strong across active engagements.`,
                },
              },
              payments: {
                title: 'Revenue & Payments',
                color: '#10B981',
                kpis: [
                  { label: 'Total Revenue', value: Math.floor(12450 * m), color: '#3B82F6', bg: '#EFF6FF', prefix: '$' },
                  { label: 'Paid', value: Math.floor(8200 * m), color: '#10B981', bg: '#ECFDF5', prefix: '$' },
                  { label: 'Pending', value: Math.floor(3500 * m), color: '#F59E0B', bg: '#FFFBEB', prefix: '$' },
                  { label: 'Overdue', value: Math.floor(750 * m), color: '#EF4444', bg: '#FEF2F2', prefix: '$' },
                ],
                summary: {
                  line1: `Total revenue generated over the ${timeRange} period stands at $${Math.floor(12450 * m).toLocaleString()}, with ${((8200 / 12450) * 100).toFixed(0)}% ($${Math.floor(8200 * m).toLocaleString()}) already collected.`,
                  line2: `$${Math.floor(3500 * m).toLocaleString()} remains pending and $${Math.floor(750 * m).toLocaleString()} is overdue — immediate follow-up on overdue accounts is recommended.`,
                },
              },
            };

            const renderKpiCards = (kpis: any[]) => (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
                {kpis.map((kpi) => (
                  <div key={kpi.label} style={{ backgroundColor: kpi.bg, borderRadius: '10px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                    <div style={{ height: '5px', backgroundColor: kpi.color }} />
                    <div style={{ padding: '16px 16px' }}>
                      <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '6px', fontWeight: 500 }}>{kpi.label}</p>
                      <p style={{ fontSize: '26px', fontWeight: 700, color: '#111827', lineHeight: 1 }}>
                        {kpi.prefix}{typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            );

            const renderTable = (kpis: any[]) => {
              const total = kpis[0].value;
              return (
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 3fr', backgroundColor: '#f8fafc', borderBottom: '2px solid #e5e7eb', padding: '10px 18px' }}>
                    {['Metric', 'Count', '% Share', 'Distribution'].map(h => (
                      <p key={h} style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</p>
                    ))}
                  </div>
                  {kpis.map((kpi, i) => {
                    const pct = total > 0 ? ((kpi.value / total) * 100).toFixed(1) : '0.0';
                    const barWidth = total > 0 ? (kpi.value / total) * 100 : 0;
                    return (
                      <div key={kpi.label} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 3fr', padding: '12px 18px', alignItems: 'center', borderBottom: i < kpis.length - 1 ? '1px solid #f3f4f6' : 'none', backgroundColor: i % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: kpi.color, flexShrink: 0 }} />
                          <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>{kpi.label}</span>
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>
                          {kpi.prefix}{typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
                        </span>
                        <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>{pct}%</span>
                        <div style={{ flex: 1, height: '8px', backgroundColor: '#f3f4f6', borderRadius: '999px', overflow: 'hidden' }}>
                          <div style={{ width: `${barWidth}%`, height: '100%', backgroundColor: kpi.color, borderRadius: '999px' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            };

            return (
              <>
                {/* ===== COVER PAGE ===== */}
                <div style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
                  {/* Header */}
                  <div style={{ borderBottom: '4px solid #01B0E9', paddingBottom: '16px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <h1 style={{ fontSize: '40px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>Reports Overview</h1>
                      <p style={{ fontSize: '16px', color: '#6b7280', fontWeight: 500 }}>Full Business Performance Report — All Sections</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#01B0E9' }}>VELOFOLIO ANALYTICS</p>
                      <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>Period: {timeRange}</p>
                      <p style={{ fontSize: '12px', color: '#9ca3af' }}>Date: {calendarValue.day} {getMonthName(calendarValue)} {calendarValue.year}</p>
                      <p style={{ fontSize: '12px', color: '#9ca3af' }}>Generated: {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Report overview snapshot */}
                  <div style={{ marginBottom: '28px', padding: '20px', backgroundColor: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '10px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#01B0E9', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Report Contents</p>
                    <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7 }}>
                      This report provides a complete business performance overview across three key areas: <strong>Lead Acquisition</strong>, <strong>Job Fulfillment</strong>, and <strong>Revenue & Payments</strong>.
                      All figures reflect the <strong>{timeRange}</strong> period.
                    </p>
                  </div>

                  {/* 3-section snapshot table */}
                  <div style={{ border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', backgroundColor: '#f8fafc', borderBottom: '2px solid #e5e7eb', padding: '10px 18px' }}>
                      {['Section', 'Total', 'In Progress', 'Completed', 'Lost / Other'].map(h => (
                        <p key={h} style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</p>
                      ))}
                    </div>
                    {[
                      { label: 'Leads', color: '#3B82F6', total: Math.floor(22 * m), progress: Math.floor(10 * m), done: Math.floor(10 * m), other: Math.floor(2 * m), otherLabel: 'Lost' },
                      { label: 'Jobs', color: '#6366F1', total: Math.floor(20 * m), progress: Math.floor(9 * m), done: Math.floor(9 * m), other: Math.floor(2 * m), otherLabel: 'Cancelled' },
                      { label: 'Revenue', color: '#10B981', total: `$${Math.floor(12450 * m).toLocaleString()}`, progress: `$${Math.floor(3500 * m).toLocaleString()}`, done: `$${Math.floor(8200 * m).toLocaleString()}`, other: `$${Math.floor(750 * m).toLocaleString()}`, otherLabel: 'Overdue' },
                    ].map((row, i) => (
                      <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', padding: '14px 18px', alignItems: 'center', borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none', backgroundColor: i % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: row.color }} />
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{row.label}</span>
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>{row.total}</span>
                        <span style={{ fontSize: '13px', color: '#F59E0B', fontWeight: 600 }}>{row.progress}</span>
                        <span style={{ fontSize: '13px', color: '#10B981', fontWeight: 600 }}>{row.done}</span>
                        <span style={{ fontSize: '13px', color: '#EF4444', fontWeight: 600 }}>{row.other} <span style={{ color: '#9ca3af', fontSize: '11px' }}>({row.otherLabel})</span></span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ===== SECTIONS: Leads, Jobs, Payments ===== */}
                {(['leads', 'jobs', 'payments'] as const).map((view, idx) => {
                  const sec = sectionData[view];
                  return (
                    <div key={view} style={idx < 2 ? { pageBreakAfter: 'always', breakAfter: 'page' } : {}}>
                      {/* Section Header */}
                      <div style={{ borderBottom: `3px solid ${sec.color}`, paddingBottom: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                          <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Section {idx + 1} of 3</p>
                          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827' }}>{sec.title}</h2>
                        </div>
                        <p style={{ fontSize: '12px', color: '#9ca3af' }}>Period: {timeRange}</p>
                      </div>

                      {/* Section Summary */}
                      <div style={{ marginBottom: '20px', padding: '14px 18px', backgroundColor: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: sec.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Executive Summary</p>
                        <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>{sec.summary.line1}</p>
                        <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, marginTop: '6px' }}>{sec.summary.line2}</p>
                      </div>

                      {/* KPI Cards */}
                      {renderKpiCards(sec.kpis)}

                      {/* Breakdown Table */}
                      {renderTable(sec.kpis)}

                      {/* Trend Chart */}
                      <div style={{ marginBottom: '16px' }}>
                        <ReportGraph
                          selectedView={view}
                          setSelectedView={() => { }}
                          selectedTab="All"
                          setSelectedTab={() => { }}
                          timeRange={timeRange}
                          isPrint={true}
                        />
                      </div>

                      {/* Breakdown Chart */}
                      <div style={{ marginTop: '8px' }}>
                        <h3 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 700, color: '#1f2937', marginBottom: '12px' }}>{sec.title} Breakdown</h3>
                        <ReportPiChart
                          selectedView={view}
                          timeRange={timeRange}
                          isPrint={true}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* Footer */}
                <div className="print-footer">
                  <div className="flex justify-between px-4">
                    <p style={{ fontWeight: 600 }}>Velofolio Full Business Report</p>
                    <p>Confidential &copy; {new Date().getFullYear()} Velofolio</p>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  )
}

export default reports