import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const Filters = ({ filters, selected, onChange }) => {
  const [openGroups, setOpenGroups] = useState(() => Object.keys(filters).reduce((acc, group) => ({ ...acc, [group]: true }), {}));
  const groupRefs = useRef({});
  const optionRefs = useRef({});

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

  // Animate group titles on mount
  useEffect(() => {
    const groupEls = Object.values(groupRefs.current);
    gsap.fromTo(
      groupEls,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.12, delay: 0.1 }
    );
  }, []);

  // Animate options when a group is opened
  useEffect(() => {
    Object.entries(openGroups).forEach(([group, isOpen]) => {
      if (isOpen && optionRefs.current[group]) {
        gsap.fromTo(
          optionRefs.current[group],
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.08, overwrite: true }
        );
      }
    });
  }, [openGroups]);

  return (
    <div style={{ color: '#fff', fontSize: 15, minWidth: 180 }}>
      {Object.entries(filters).map(([group, options], groupIdx) => (
        <div key={group} style={{ marginBottom: 18, borderBottom: '1px solid rgba(255, 255, 255, 0.3)', paddingBottom: 8 }}>
          <div
            ref={el => (groupRefs.current[group] = el)}
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
              {options.map((option, i) => (
                <label
                  key={option}
                  ref={el => {
                    if (!optionRefs.current[group]) optionRefs.current[group] = [];
                    optionRefs.current[group][i] = el;
                  }}
                  style={{ display: 'flex', alignItems: 'center', marginBottom: 4, cursor: 'pointer', userSelect: 'none', opacity: 0 }}
                >
                  <span style={{ position: 'relative', display: 'inline-block', width: 20, height: 16, marginRight: 4 }}>
                    <input
                      type="checkbox"
                      checked={selected[group]?.includes(option) || false}
                      onChange={() => handleToggle(group, option)}
                      style={{
                        opacity: 0,
                        width: 20,
                        height: 20,
                        margin: 0,
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        cursor: 'pointer',
                        zIndex: 2
                      }}
                    />
                    <span
                      style={{
                        display: 'block',
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        border: '2px solid #fff',
                        background: selected[group]?.includes(option) ? '#fff' : 'transparent',
                        transition: 'background 0.18s, border 0.18s',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        boxSizing: 'border-box',
                        zIndex: 1
                      }}
                    >
                      {selected[group]?.includes(option) && (
                        <svg width="12" height="12" viewBox="0 0 12 12" style={{ position: 'absolute', top: 0, left: 0.5 }}>
                          <polyline points="2,7 5,10 10,3" style={{ fill: 'none', stroke: '#000', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
                        </svg>
                      )}
                    </span>
                  </span>
                  <span style={{ color: '#fff', fontWeight: 400 }}>{option}</span>
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