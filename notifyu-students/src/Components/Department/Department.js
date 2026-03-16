import React, { useEffect, useState, useCallback } from 'react'
import "./Department.css"
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Document, Page } from 'react-pdf';
import mypdf from "./timetable.pdf";
import axios from 'axios';
import { pdfjs } from 'react-pdf';

// import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

// // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
// //     'pdfjs-dist/build/pdf.worker.min.js',
// //     import.meta.url,
// // ).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


export default function Department({ usersInfo, userID }) {

    const [child, setChild] = useState([]);

    const createLabels = useCallback(async () => {

        const subjectsRes = await axios.post("https://notify-u-student-module.onrender.com/api/getSubAttendance", { userID });
        const subjects = subjectsRes.data;

        console.log(subjects);

        if (!Array.isArray(subjects) || subjects.length === 0) {
            setChild(<div>No attendance data found.</div>);
            return;
        }

        const thresholdRes = await axios.post("https://notify-u-student-module.onrender.com/api/get_Threshold_Attendane");
        const threshold = thresholdRes.data[0];

        const childs = subjects.map((subject, i) => {
            const attendance = subject[1];
            const isLow = attendance < threshold;
            const className = isLow
                ? "blink departmentSubLabel lowAttendance"
                : "departmentSubLabel";

            return (
                <div key={i + "key"} id={i + "id"} className={className}>
                    {subject[0] + "    " + attendance + "%"}
                </div>
            );
        });

        setChild(childs);

    }, [userID]); 

    useEffect(() => {
        createLabels();
    }, [createLabels]); 

    return (
        <div className='departmentBG'>
            <div className="departmentLeft">
                <div className="yTimetableTitle">
                    <b>Yearly Timetable</b>
                </div>
                <div className="ytPdfViewer">
                    <Document file={mypdf}>
                        <Page pageNumber={1} className="pdfPage" scale={1} />
                    </Document>
                </div>
            </div>
            <div className='departmentRightParent'>
                <div className="attendanceTitle">
                    Attendance
                    <svg className='attendanceSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm64 192c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm64-64c0-17.7 14.3-32 32-32s32 14.3 32 32V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V160zM320 288c17.7 0 32 14.3 32 32v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V320c0-17.7 14.3-32 32-32z" />
                    </svg>
                </div>
                <div className="departmentRight">
                    {child}
                </div>
            </div>
        </div>
    )
}