
import React, { useState } from 'react';

const ClientCustomization = () => {
  const [settings, setSettings] = useState<Record<string, any>>({
    showLogoInvoice: true,
    showLogoEmail: false,
    showWatermark: true,
    showFooter: false,
    portalTheme: 'Light',
    highlightColor: '#F0666F',
    timelineStyle: 'Step boxes with check...',
  });

  const toggleSetting = (key:any) => {
    setSettings((prev:any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
const toggles = [
            { label: 'Show logo on invoices', key: 'showLogoInvoice' },
            { label: 'Show logo on quotes', key: 'showLogoQuote' },
            { label: 'Show brand colors in portal', key: 'brandcolorinportal' },
            { label: 'Show studio contact info', key: 'showFooter' },
          ]
  return (
    <div className="w-full lg:max-w-2xl space-y-3 h-full">
      {/* Client-Facing Customization */}
      <div className="w-full bg-white rounded-3xl border border-[#D4D4D8] p-5">
        <h1 className="text-xl font-medium">Client-Facing Customization</h1>

        <div className="py-3 space-y-3">
          {toggles.map((item) => (
            <div
              key={item.key}
              className="bg-[#F4F4F5] p-3 border border-[#D4D4D8] rounded-md flex items-center justify-between"
            >
              <p>{item.label}</p>

              {/* Toggle */}
              <div
                onClick={() => toggleSetting(item.key)}
                className={`w-10 h-5 rounded-3xl relative cursor-pointer transition-colors
                  ${settings[item.key] ? 'bg-[#01B0E9]' : 'bg-gray-300'}`}
              >
                <span
                  className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all
                    ${settings[item.key] ? 'left-5' : 'left-1'}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Portal Appearance */}
      <div className="w-full bg-white rounded-3xl border border-[#D4D4D8] p-5">
        <h1 className="text-xl font-medium">Client Portal Appearance</h1>

        <div className="py-3 space-y-4">
          <div className="w-full flex items-center justify-between">
            <h3 className="text-lg">Portal Theme</h3>
            <select
              value={settings.portalTheme}
              onChange={(e) => {
                setSettings({ ...settings, portalTheme: e.target.value });
              }}
              className="w-44 px-2 py-1.5 bg-[#F4F4F5] border border-[#D4D4D8] rounded-sm"
              disabled
            >
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </div>

          <div className="w-full lg:flex-nowrap flex-wrap  flex items-center justify-between">
            <h3 className="text-lg">
              Recommended Package Highlight Color
            </h3>
            <input
              type="text"
              value={settings.highlightColor}
              onChange={(e) =>
                setSettings({ ...settings, highlightColor: e.target.value })
              }
              className="w-44 px-2 py-1.5 bg-[#F4F4F5] border border-[#D4D4D8] rounded-sm"
            />
          </div>

          <div className="w-full flex items-center justify-between">
            <h3 className="text-lg">Progress Timeline Style</h3>
            <input
              type="text"
              value={settings.timelineStyle}
              onChange={(e) =>
                setSettings({ ...settings, timelineStyle: e.target.value })
              }
              className="w-44 px-2 py-1.5 bg-[#F4F4F5] border border-[#D4D4D8] rounded-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCustomization;
