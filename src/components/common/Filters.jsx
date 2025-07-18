import React, { useState } from "react";

const Filters = ({ filters, selected, onChange }) => {
  const [openGroups, setOpenGroups] = useState(() => Object.keys(filters).reduce((acc, group) => ({ ...acc, [group]: true }), {}));

  const handleToggle = (group, option) => {
    const groupSelected = selected[group] || [];
    const isChecked = groupSelected.includes(option);
    const newSelected = {
      ...selected,
      [group]: isChecked
        ? groupSelected.filter(o => o !== option)
        : [...groupSelected, option]
    };
    onChange(newSelected);
  };

  const toggleGroup = group => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  return (
    <div style={{ color: '#fff', fontSize: 15, minWidth: 180 }}>
      {Object.entries(filters).map(([group, options]) => (
        <div key={group} style={{ marginBottom: 18, borderBottom: '1px solid #232323', paddingBottom: 8 }}>
          <div
            style={{
              fontWeight: 700,
              marginBottom: 6,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              userSelect: 'none',
            }}
            onClick={() => toggleGroup(group)}
          >
            <span>{group.replace(/_/g, ' ')}</span>
            <span style={{ fontSize: 18, marginLeft: 8, transition: 'transform 0.18s', transform: openGroups[group] ? 'rotate(90deg)' : 'rotate(0deg)' }}>&#9654;</span>
          </div>
          {openGroups[group] && (
            <div style={{ marginLeft: 2, marginTop: 2 }}>
              {options.map(option => (
                <label key={option} style={{ display: 'block', marginBottom: 4, cursor: 'pointer', userSelect: 'none' }}>
                  <input
                    type="checkbox"
                    checked={selected[group]?.includes(option) || false}
                    onChange={() => handleToggle(group, option)}
                    style={{ marginRight: 8 }}
                  />
                  <span style={{ color: '#fff', fontWeight: 500 }}>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Filters; 