import React from 'react'
import "./Footer.css";


export default function Footer() {

    let styl = {
        backgroundColor: "rgba(0, 0, 0, 0.25)",
    }


    return (
        <>

            <footer className="text-center text-lg-start background text-muted ">

                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

                </section>
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3 text-secondary"></i>DKTE’S Textile & Engineering Institute, Ichalkaranji
                                </h6>
                                <p>
                                    (An Autonomous Engineering Colleges in Maharashtra)
                                    Affiliated to Shivaji University, Kolhapur
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p><i className="fas fa-home me-3 text-secondary"></i> Rajwada, P.O.Box. No.130,
                                    Ichalkaranji-416115
                                    Dist: Kolhapur (Maharashtra) India.</p>
                                <p>
                                    <a href="https://www.linkedin.com/school/dkte/">Linkedin</a>
                                </p>
                                <p><i className="fas fa-phone me-3 text-secondary"></i> (0230) 2421300

                                </p>
                                <p><i className="fas fa-print me-3 text-secondary"></i> (0230) 2439557 / 58 / 59</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center p-4" style={styl}>
                    © 2021 Copyright:2023 DKTE, All Rights Reserved
                </div>
            </footer>

        </>
    )
}