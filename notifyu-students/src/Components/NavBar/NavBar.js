import { useState } from "react";
import "./NavBar.css"
import { Link, useLocation} from "react-router-dom";

export default function NavBar(props) {

    const[page, setPage] = useState("Home");

    let sidebar = 
    {
        width: '70%',
        backgroundColor: 'rgb(0,0,0)',       
    }

    let goTop = (e) =>{
        document.documentElement.scrollTop = 0;
        setPage(e.target.innerHTML);
    }

    const activePage = useLocation();

    return (
        <>
            <nav className="navbar navbar-expand-lg  navbar-dark  bg-tranparent sticky-top ">
                <div className="container-fluid">

                    <p className="fs-4 brandBG" href="/NavBar/NavBar">
                        <span className="brand" >NotifyU</span> <span className="page showOnPhone">| {page}</span>
                    </p>

                    <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div style={sidebar} className="offcanvas offcanvas-end"  id="offcanvasNavbar" >

                        <div className="offcanvas-header text-white border-bottom">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Students</h5>

                            <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>

                        <div className="offcanvas-body d-flex flex-column p-1">
                            <ul className="navbar-nav justify-content-center align-items-center fs-7 flex-grow-1 pe-3">
                                <li className="mx-2 my-3">
                                    <Link onClick={goTop} id="home" className={activePage.pathname === '/' ? 'active ' : 'menuEffect'}aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="mx-2 my-3">
                                    <Link onClick={goTop} id="department" className={activePage.pathname === '/Components/Department/Department' ? 'active ' : 'menuEffect'} aria-current="page" to="/Components/Department/Department">Department</Link>
                                </li>
                                <li className="mx-2 my-3">
                                    <Link onClick={goTop} id="exam" className={activePage.pathname === '/Components/Exam/Exam' ? 'active ' : 'menuEffect'} aria-current="page" to="/Components/Exam/Exam">Exam</Link>
                                </li>
                                <li className="mx-2 my-3">
                                    <Link onClick={goTop} id="library" className={activePage.pathname === '/Components/Library/Library' ? 'active ' : 'menuEffect'} aria-current="page" to="/Components/Library/Library">Library</Link>
                                </li>
                                <li className="mx-2 my-3">
                                    <Link onClick={goTop} id="tpo" className={activePage.pathname === '/Components/TPO/TPO' ? 'active ' : 'menuEffect'} aria-current="page" to="/Components/TPO/TPO">TPO</Link>
                                </li>
                                <li className="mx-2 my-3">
                                    <Link onClick={goTop} id="events" className={activePage.pathname === '/Components/Events/Events' ? 'active ' : 'menuEffect'} aria-current="page" to="/Components/Events/Events">Events</Link>
                                </li>
                                <li className="mx-2 my-3">
                                    <Link onClick={goTop} id="about" className={activePage.pathname === '/Components/About/About' ? 'active ' : 'menuEffect'} aria-current="page" to="/Components/About/About">About</Link>
                                </li>
                                <li className="mx-2 my-3">
                                    <Link onClick={goTop} id="profile" className={activePage.pathname === '/Components/Profile/Profile' ? 'active ' : 'menuEffect'} aria-current="page" to="/Components/Profile/Profile">Profile</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}