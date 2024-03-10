import { useState } from 'react';
import data from '../data/data.json'
import classes from '../styles/Card.module.css'
import removeIcon from '../images/icon-remove.svg'

function Card() {
    const [roleFilter, setRoleFilter] = useState('');
    const [levelFilter, setLevelFilter] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [selectedTools, setSelectedTools] = useState([])


    const filteredData = data.filter(item => {
        return (!roleFilter || item.role === roleFilter) &&
            (!levelFilter || item.level === levelFilter) &&
            (!selectedTools.length || selectedTools.every(tool => item.tools.includes(tool))) &&
            (!selectedLanguages.length || selectedLanguages.every(lang => item.languages.includes(lang)));
        // in each parenthleses if first statement is true all elements are return, if false it returns items on certain conditions.
    });

    const handleRoleChange = (role) => {
        if (!selectedRoles.includes(role)) {
            setSelectedRoles([...selectedRoles, role]);
            setRoleFilter(role);
        } else {
            setSelectedRoles(selectedRoles.filter(selectedRole => selectedRole !== role));
            setRoleFilter('');
        }
    }

    const handleLevelChange = (level) => {
        if (!selectedLevels.includes(level)) {
            setSelectedLevels([...selectedLevels, level]);
            setLevelFilter(level);
        } else {
            setSelectedLevels(selectedLevels.filter(selectedLevel => selectedLevel !== level));
            setLevelFilter('');
        }
    }

    const handleLanguageChange = (lang) => {
        if (!selectedLanguages.includes(lang)) {
            setSelectedLanguages([...selectedLanguages, lang]);
        } else {
            setSelectedLanguages(selectedLanguages.filter(selectedLang => selectedLang !== lang));
        }
    }

    const handleToolsChange = (tool) => {
        if (!selectedTools.includes(tool)) {
            setSelectedTools([...selectedTools, tool])
        } else {
            setSelectedTools(selectedTools.filter(selectedtool => selectedtool !== tool))
        }
    }
    const handleFilterReset = () => {
        setRoleFilter('');
        setLevelFilter('');
        setSelectedRoles([]);
        setSelectedLanguages([]);
        setSelectedLevels([]);
        setSelectedTools([])
    }

    return (
        <div>
            {
                (selectedRoles.length > 0 || selectedLanguages.length > 0 || selectedLevels.length > 0 || selectedTools.length > 0) &&
                < div className={classes.filters}>
                    <div className={classes.filter_container}>
                        <div className={classes.selected_filter}>
                            {selectedRoles.map((role, index) => (
                                <span key={index} className={classes.selected_role}>
                                    {role}
                                    <img src={removeIcon} alt="remove" className={classes.remove_icon} onClick={() => handleRoleChange(role)} />
                                </span>
                            ))}
                        </div>
                        <div className={classes.selected_filter}>
                            {selectedLevels.map((level, index) => (
                                <span key={index} className={classes.selected_level}>
                                    {level}
                                    <img src={removeIcon} alt="remove" className={classes.remove_icon} onClick={() => handleLevelChange(level)} />
                                </span>
                            ))}
                        </div>
                        <div className={classes.selected_filter}>
                            {selectedLanguages.map((lang, index) => (
                                <span key={index} className={classes.selected_langs}>
                                    {lang}
                                    <img src={removeIcon} alt="remove" className={classes.remove_icon} onClick={() => handleLanguageChange(lang)} />
                                </span>
                            ))}
                        </div>
                        <div className={classes.selected_filter}>
                            {selectedTools.map((tool, index) => (
                                <span key={index} className={classes.selected_tools}>
                                    {tool}
                                    <img src={removeIcon} alt="remove" className={classes.remove_icon} onClick={() => handleToolsChange(tool)} />
                                </span>
                            ))}
                        </div>
                    </div>
                    <button onClick={handleFilterReset} className={classes.clear_btn}>Clear</button>
                </div>
            }
            {
                filteredData.map((element) => {
                    return (
                        <div className={classes.card} key={element.id}>
                            <div className={classes.logo_details}>
                                <img src={element.logo} alt={element.logo} className={classes.logo} />
                                <div className={classes.about}>
                                    <div className={classes.company}>
                                        <h4>{element.company}</h4>
                                        {element.new ? <p>NEW!</p> : null}
                                        {element.featured ? <span>FEATURED</span> : null}
                                    </div>
                                    <h3>{element.position}</h3>
                                    <div className={classes.details}>
                                        <span>{element.postedAt}</span>
                                        <span className={classes.separator}></span>
                                        <span>{element.contract}</span>
                                        <span className={classes.separator}></span>
                                        <span>{element.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.skills}>
                                <span onClick={() => handleRoleChange(element.role)}>{element.role}</span>
                                <span onClick={() => handleLevelChange(element.level)}>{element.level}</span>
                                <div className={classes.languages}>{element.languages.map((lang, i) => {
                                    return <span key={i} onClick={() => handleLanguageChange(lang)}>{lang}</span>
                                })}</div>
                                <div className={classes.tools}>
                                    {element.tools.map((tool, i) => {
                                        return <span onClick={() => handleToolsChange(tool)} key={i}>{tool}</span>
                                    })}
                                </div>
                            </div>
                        </div>)
                })
            }
        </div >);
}
export default Card;
