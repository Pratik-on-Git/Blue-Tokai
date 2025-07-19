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
        <div key={group} style={{ marginBottom: 18, borderBottom: '1px solid #232323', paddingBottom: 8 }}>
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
                  style={{ display: 'block', marginBottom: 4, cursor: 'pointer', userSelect: 'none', opacity: 0 }}
                >
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