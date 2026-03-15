import { useEffect, useState, useRef } from 'react';
import './Profile.css';
import axios from 'axios';

export default function Profile({ usersInfo, onLogout, userID }) {

  const [userSkills, setUserSkills] = useState([]);
  const scrollParent = useRef(null);

  useEffect(() => {
    if (usersInfo && usersInfo[4]) {
      setUserSkills(usersInfo[4]);
    }
  }, [usersInfo]);
  const autoScroll = () => {
    const targetDiv = document.getElementById("profileSkillBg");
    if (targetDiv && scrollParent.current) {
      scrollParent.current.scrollTo({
        top: targetDiv.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    setTimeout(autoScroll, 900);
  }, []);

  const setProfileText = () => {
    if (!usersInfo || !usersInfo[0]) return "";
    const parts = usersInfo[0].split(" ");
    return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
  };

  const setUserInfo = () => {
    if (!usersInfo) return null;

    return [
      <div key={0} className='userinfoLabel'><b>User ID:</b> {userID}</div>,
      <div key={1} className='userinfoLabel'><b>Name:</b> {usersInfo[0]}</div>,
      <div key={2} className='userinfoLabel'><b>Department:</b> {usersInfo[1]}</div>,
      <div key={3} className='userinfoLabel'><b>Division:</b> {usersInfo[2]}</div>,
      <div key={4} className='userinfoLabel'><b>Year:</b> {usersInfo[3]}</div>
    ];
  };
  const setUserSkillsUI = () => {
    if (!userSkills || userSkills.length === 0) return null;
    return userSkills.map((skill, i) => adddSkills(skill, i));
  };
  const adddSkills = (skill, i) => {
    return (
      <div
        className="skillLabel"
        key={i}
        onDoubleClick={() => handleDBClick(i)}
      >
        {skill}
      </div>
    );
  };

  const handleDBClick = (index) => {
    const updatedSkills = userSkills.filter((_, i) => i !== index);
    setUserSkills(updatedSkills);
    updateUsersSkills(updatedSkills);
  };
  const updateUsersSkills = async (skills) => {
    try {
      await axios.post('http://localhost:5001/api/updateProfile', { userID, skills });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSkillBtn = () => {
    if (userSkills.length >= 5) return;
    document.getElementById("addSkillBtn").style.display = "none";
    document.getElementById("skillInputBG").style.display = "flex";
  };
  const handleAddBtn = () => {
    const input = document.getElementById("skillInput");
    if (!input || !input.value || userSkills.length >= 5) return;

    const updatedSkills = [...userSkills, input.value];
    setUserSkills(updatedSkills);
    updateUsersSkills(updatedSkills);
    input.value = "";
    handlecancelBtn();
  };

  const handlecancelBtn = () => {
    document.getElementById("addSkillBtn").style.display = "block";
    document.getElementById("skillInputBG").style.display = "none";
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter") handleAddBtn();
  };
  return (
    <div className="profileBG">
      <div className="profileContainer" id='profileContainer'>
        <div className="profileHeader">
          <div className="instituteName">
            <b>DKTE's Textile and Engineering Institute, Ichalkaranji.</b>
          </div>
          <div className="profileText">{setProfileText()}</div>
        </div>

        <div ref={scrollParent} className="profileInfoContainer">
          <div className="profileInfoBG" id='profileInfoBG'>
            <div className="userInfo">{setUserInfo()}</div>
          </div>

          <div className="profileSkillBg" id='profileSkillBg'>
            <div className="profileSkillText">Add your top Five Skills...</div>

            <div className="profileSkillContainer">
              <div className="profileSkills" id='profileSkills'>
                {setUserSkillsUI()}
              </div>
            </div>

            <div className="addSkillsBG" id='addSkillBg'>
              <div className='removeSkillTxt'>Double Tap to Remove</div>

              <div className='addSkillBtn' id='addSkillBtn' onClick={handleSkillBtn}>
                Add
              </div>

              <div className="skillInputBG" id="skillInputBG" style={{ display: "none" }}>
                <input
                  className="skillInput"
                  id="skillInput"
                  placeholder="Java"
                  onKeyDown={handleAddSkill}
                />
                <div className="cancelInputBtn" onClick={handlecancelBtn}>X</div>
                <div className="addInputBtn" onClick={handleAddBtn}>Add</div>
              </div>

            </div>
          </div>
        </div>

        <div className="profileFooter">
          <div className="logout" onClick={onLogout}>Log out</div>
        </div>
      </div>
    </div>
  );
}
