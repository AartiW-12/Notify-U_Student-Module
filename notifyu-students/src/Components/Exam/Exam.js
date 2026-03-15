import React, { useEffect, useState } from 'react'
import './Exam.css'
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Document, Page } from 'react-pdf';
import pdf from './timetable.pdf';

import { pdfjs } from 'react-pdf';
import axios from 'axios';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

export default function Exam({ usersInfo, userID }) {

    const getSittingArrangement = async () => {
        const examInfo = await axios.post("https://notify-u-student-module.onrender.com/api/getSeatingArrangement", { userID });
        // var examInfo = [['Date', '00/00/00'], ['Course name', 'Data Analytics'], ['Course code', 'AIL404'], ['PRN', '20UAI000'], ['Block No.', 'CS-00'], ['Bench No.', '00']];
        // console.log(examInfo.data);
        return examInfo.data;
    }

    const setResultLink = () => {
        var link = null;
        if (link === null) return "No result!"
        else return link;
    }

    const getETimeTable = () => { 
        return (
            <Document file={pdf}  >
                <Page pageNumber={1} className="EpdfPage" scale={1} />
            </Document>
        )
    }



    const [arrangement, setarrangement] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const displayArrangement = async () => {

        var examInfo = await getSittingArrangement();

        if (!examInfo || !Array.isArray(examInfo) || examInfo.length === 0) {
            setarrangement([<div key="none">No exam data found.</div>]);
            return;
        }

        examInfo = examInfo[0];

        let titles = ["Exam Date", "Course Name", "Course Code", "Block No.", "Bench No."]
        var labels = []
        for (let i = 0; i < examInfo.length; i++) {
            labels.push(
                <div key={i} className="SeatingArrangementrows">
                    {titles[i] + ": "}<b>{examInfo[i]}</b>
                </div>
            )
        }
        setarrangement(labels);
    }

    useEffect(() => {
        displayArrangement();
    }, [displayArrangement])


    return (
        <div className='Examparent'>
            <div className="Examleft">
                <div className="examTimetableTitle">
                    Exam Timetable
                </div>
                <div className="ExampdfViewer">
                    {getETimeTable()}
                </div>
            </div>
            <div className='ExamRightParent'>
                <h4 className='ExamRightText'>
                    Sitting Arrangement
                    <svg className='ExamSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z" /></svg>
                </h4>
                <div className="ExamRight">
                    {arrangement}
                </div>
            </div>
            <div className='LinkContainer'>
                Result Link:
                <a className='ExamLink' href={setResultLink()} target='_blank' rel="noreferrer"> {setResultLink()}</a>
            </div>
        </div>
    )
}