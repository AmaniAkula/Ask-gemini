import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';

const Sidebar = ({ recentPrompts, onSelectPrompt,onNewChat }) => {
    const [extended, setExtended] = useState(false);


    return (
        <div className="sidebar">
            <div className="top">
                <img
                    onClick={() => setExtended(prev => !prev)}
                    src={assets.menu_icon}
                    alt=""
                    className="menu"
                />
                <div className="new-chat" onClick={onNewChat} >
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended && (
                    <div className="recent">
                        <div className="recent-title">Recent</div>
                        {recentPrompts.length > 0 && recentPrompts.map((prompt, idx) => (
                                <div
                                    key={idx}
                                    className="recent-entry"
                                    onClick={() => onSelectPrompt(prompt)}
                                >
                    
                                    <p>{prompt.slice(0,18)}...</p>
                                </div>
                         ))}
                    </div>
                )}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
