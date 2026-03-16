import "./Home.css";
import { Link } from "react-router-dom";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Document, Page } from 'react-pdf';
import pdf from './timetable.pdf';
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


export default function Home({ usersInfo }) {

    let eveCount = 0;

    const getUpdateList = () => {

        let list = null;
        list = [["Event ONE", "Events"], ["Event TWO", "Events"], ["New Campus", "TPO"], ["Exam TimeTable", "Exam"], ["Event FIVE", "Events"], ["New Books", "Library"], ["Attendance update", "Department"]];

        eveCount = list.length;
        return list;
    }

    const navigateTo = (i) => {

        let link;

        switch (eventList[i][1]) {

            case "Department":
                link = "/Components/Department/Department";
                break;

            case "Exam":
                link = "/Components/Exam/Exam";
                break;

            case "Library":
                link = "/Components/Library/Library";
                break;

            case "TPO":
                link = "/Components/TPO/TPO";
                break;

            case "Events":
                link = "/Components/Events/Events";
                break;

            default:
                link = "/";

        }

        return link;

    }

    const eventList = getUpdateList();

    const events = () => {

        var eventLabels = [];

        for (var i = 0; i < eventList.length; i++) {

            eventLabels.push(
                <Link key={i+"L1"}  to={navigateTo(i)} className="moduleBG">
                    <div  key={i} className="eventName">{eventList[i][0]}</div>
                    <div key={i+"L2"} className="noLink moduleName" to={navigateTo(i)}>{eventList[i][1]}</div>
                </Link>
                
            )
        }

        return eventLabels;
    }


    const getTimeTable = () => {
        return (
            <Document file={pdf}  >
                <Page pageNumber={1} className="pdfPage" scale={1} />
            </Document>
        )
    }



    return (
        <>
            <div className="bgLabel">
                <div className="timetableLabel">
                    <div className="timeTabletitle">
                        <b>Time Table</b>
                    </div>
                    <div className="pdfViewer">
                        {getTimeTable()}
                    </div>
                </div>

                <div className="todaysLabelBG">
                    <h4 className="todaysTextBG">
                        <div className="todaysText">Updates</div>
                        <div className="IconBG">
                            <svg className="bellIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" /></svg>
                            <div className="eveCount">{eveCount}</div>
                        </div>
                    </h4>
                    <div className="todaysLabel0">
                        <div className="todaysLabel">
                            {events()}
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}