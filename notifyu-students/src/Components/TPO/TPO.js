import './TPO.css'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function TPO({ usersInfo }) {

    const isHidden = useRef(false);
    const scrollParent = useRef(null);

    const [companies, setCompanies] = useState([]);
    const [todaysCampus, setTodaysCampus] = useState("---");
    const [todaysDesc, setTodaysDesc] = useState("No Campus Today");
    const todaysCampusID = useRef(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const skills = usersInfo && usersInfo[4] ? usersInfo[4] : [];
                const response = await axios.post(
                    "http://localhost:5001/api/companyMatchingSkill",
                    { skills }
                );
                const list = response.data;
                if (!Array.isArray(list)) return;

                // find today's campus:
                const today = new Date().getDate();
                list.forEach((company, i) => {
                    const campusDate = new Date(company[1]).getDate();
                    if (today === campusDate && todaysCampusID.current === null) {
                        todaysCampusID.current = i;
                        setTodaysCampus(company[0]);
                        setTodaysDesc(company[3]);
                    }
                });

                setCompanies(list);

                setTimeout(() => autoScroll(), 500);
                setTimeout(() => hideSidebar(), 1400);

            } catch (error) {
                console.error(error);
            }
        };
        fetchCompanies();
    }, [usersInfo]); 


    const hideSidebar = () => {
        if (isHidden.current) return;
        const el = document.getElementById("companies");
        const toggler = document.getElementById("toggler");
        if (!el || !toggler) return;

        el.className = "companiesListBG off-screen";
        toggler.innerHTML = "...";
        toggler.className = "toggleBtn";
        isHidden.current = true;
    }

    const showSidebar = () => {
        const el = document.getElementById("companies");
        const toggler = document.getElementById("toggler");
        if (!el || !toggler) return;

        el.className = "companiesListBG on-screen";
        toggler.innerHTML = "";
        toggler.className = "toggleBtn btn-close btn-close-white shadow-none";
        isHidden.current = false;
    }

    const handleClick = () => {
        if (isHidden.current) showSidebar();
        else hideSidebar();
    }

    const autoScroll = () => {
        const targetDiv = document.getElementById(todaysCampusID.current);
        try {
            if (targetDiv && scrollParent.current) {
                scrollParent.current.scrollTo({
                    top: targetDiv.offsetTop - 120,
                    behavior: "smooth"
                });
            }
        } catch (error) {}
    }

    const selectedCompany = (event) => {
        const list = document.getElementById("companiesList");
        if (!list) return;

        for (let i = 0; i < list.childElementCount; i++) {
            const el = document.getElementById(i);
            if (el && el.contains(event.target)) {
                el.classList.add("selectedCompany");
                document.getElementById("nameInfo").innerHTML = companies[i][0];
                document.getElementById("driveInfo").innerHTML = companies[i][3];
            } else if (el) {
                el.classList.remove("selectedCompany");
            }
        }
        hideSidebar();
    }

    const renderCompanies = () => {
        const today = new Date().getDate();
        return companies.map((company, i) => {
            const campusDate = new Date(company[1]).getDate();
            const assignClass = today === campusDate ? "todaysCampus companyBG" : "companyBG";

            return (
                <div key={i} id={i} className={assignClass} onClick={selectedCompany}>
                    <div className='name-date'>
                        <div className='C-name'><b>{company[0]}</b></div>
                        <div className='C-date'>{company[1]}</div>
                    </div>
                    <div className='compatibility'>
                        <ProgressBar className='progressBar' now={company[2]} />
                    </div>
                </div>
            );
        });
    }

    return (
        <>
            <div className="tpoParent">
                <div className="companiesListBG on-screen" id='companies'>
                    <div className="togglerBg">
                        <div onClick={handleClick} id='toggler' className="toggleBtn btn-close btn-close-white shadow-none"></div>
                    </div>
                    <div className="Ctitle">
                        Companies
                        <span>
                            <svg className='companiesSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h89.9c-6.3-10.2-9.9-22.2-9.9-35.1c0-46.9 25.8-87.8 64-109.2V271.8 48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zM576 272a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM352 477.1c0 19.3 15.6 34.9 34.9 34.9H605.1c19.3 0 34.9-15.6 34.9-34.9c0-51.4-41.7-93.1-93.1-93.1H445.1c-51.4 0-93.1 41.7-93.1 93.1z" /></svg>
                        </span>
                    </div>
                    <div ref={scrollParent} className="companiesList" id='companiesList'>
                        {renderCompanies()}
                    </div>
                </div>
                <div className="companiesInfo">
                    <div className="infoContainer">
                        <div className="nameInfo" id='nameInfo'>{todaysCampus}</div>
                        <div className="driveInfo" id='driveInfo'>{todaysDesc}</div>
                    </div>
                </div>
            </div>
        </>
    )
}