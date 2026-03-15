import { useEffect, useRef, useCallback } from 'react';
import './Events.css';
import React from 'react';
import myImage from './poster.jpeg';
import { useState } from 'react';
import axios from 'axios';

export default function Events() {

    const liveID = useRef(null);
    const timeOut1 = useRef(null);
    const timeOut2 = useRef(null);
    const scrollParent = useRef(null);
    const target = useRef(null);

    const [eventsLabel, setEventslabel] = useState([]);
    const [Image, setImage] = useState(myImage);
    const [eventsList, setEventsList] = useState([]);

    // fetch events:
    const getEventsList = async () => {
        const response = await axios.post('http://localhost:5001/api/get_All_Events', {});
        return response.data;
    }

    // check if event is live:
    const isLive = (start, end) => {
        var hour = new Date().getHours();
        if (hour >= end) return "event completedEvent";
        else if (hour >= start && hour <= end) return "event liveEvent";
        else return "event";
    }

    const checkTime = (time) => {
        if (time < 12) return ":00am";
        else return ":00pm";
    }

    const setTiming = (start, end) => {
        var hour = new Date().getHours();
        if (hour >= end) return "Completed";
        else if (hour >= start && hour <= end) return "is Live now!";
        else return ("Today from " + start + checkTime(start) + " to " + end + checkTime(end));
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setEventList = async () => {
        var list = await getEventsList();
        if (!Array.isArray(list)) return;

        setEventsList(list);
        var events = [];

        for (let i = 0; i < list.length; i++) {
            var checkEvent = isLive(list[i][1], list[i][2]);
            if (checkEvent.includes("liveEvent") && liveID.current === null) {
                liveID.current = i;
            }
            events.push(
                <div key={i} id={i} onClick={eventClicked} className={checkEvent}>
                    {list[i][0]}
                    <div id={i} className={liveID.current === i ? "EventTiming liveTiming" : "EventTiming"}>
                        {setTiming(list[i][1], list[i][2])}
                    </div>
                </div>
            )
        }
        setEventslabel(events);
    }

    // scroll to live event:
    const showLive = () => {
        var targetDiv = document.getElementById(liveID.current);
        try {
            if (targetDiv) {
                scrollParent.current.scrollTo({
                    top: targetDiv.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        } catch (error) { }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setAboutEvent = useCallback((i) => {
        if (!eventsList[i]) return;
        if (document.getElementById("eventTitle") != null && document.getElementById("aboutEvent") != null) {
            document.getElementById("eventTitle").innerHTML = eventsList[i][0];
            document.getElementById("aboutEvent").innerHTML = eventsList[i][3]; // description is index 3
        }
    })

    const eventClicked = (event) => {
        setImage(myImage);
        const childs = document.getElementById("eventlist").childElementCount;
        for (let i = 0; i < childs; i++) {
            if (i === parseInt(event.target.id)) {
                document.getElementById(i).classList.add("selectedEvent");
            } else {
                document.getElementById(i).classList.remove("selectedEvent");
            }
        }
        setAboutEvent(event.target.id);

        const targetOffset = target.current.offsetTop;
        if (targetOffset > 140) {
            const scrollPosition = targetOffset - (targetOffset * 14 / 100);
            window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
        }
    }

    useEffect(() => {
        setEventList();
    }, [setEventList]);

    useEffect(() => {
        if (eventsLabel.length === 0) return;
        timeOut1.current = setTimeout(() => {
            if (liveID.current !== null) setAboutEvent(liveID.current);
        }, 0);
        timeOut2.current = setTimeout(() => {
            if (liveID.current !== null) showLive();
        }, 500);

        return () => {
            clearTimeout(timeOut1.current);
            clearTimeout(timeOut2.current);
        };
    }, [eventsLabel, eventsList, setAboutEvent]);


    return (
        <>
            <div className="eventBG" id='eventBG'>
                <div className="eventListBG">
                    Todays Events
                    <span>
                        <svg className='eventSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75H192 160 64c-35.3 0-64 28.7-64 64v96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V352l8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V300.4c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4V32zm-64 76.7V240 371.3C357.2 317.8 280.5 288 200.7 288H192V192h8.7c79.8 0 156.5-29.8 215.3-83.3z" /></svg>
                    </span>
                    <div ref={scrollParent} id='eventlist' className="eventList">
                        {eventsLabel}
                    </div>
                </div>
                <div className="eventInfoBG" ref={target}>
                    <div className="eventPoster">
                        <img className='poster' src={Image} alt='poster'></img>
                    </div>
                    <div className="aboutEventBG">
                        <div className="eventTitle" id='eventTitle'>No Events</div>
                        <div className="aboutEvent" id='aboutEvent'></div>
                    </div>
                </div>
            </div>
        </>
    )
}