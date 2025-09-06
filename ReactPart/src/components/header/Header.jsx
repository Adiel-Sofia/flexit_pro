
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./header.module.css";
import finalLogo from "../../assets/finalLogo.png";
import StateButton from "../buttons/stateButton/StateButton";
import LogOut from "../buttons/logOut/LogOut";
import axios from "axios";
import UpdateProfile from "../popUps/updateProfile/UpdateProfile";
/**
 * description: Header component
 * @returns JSX of component
 */

function Header(props) {
  const {
    logOut, // פונקציה ליציאה מהמערכת
    setUpdatePopUp, // setter לפתיחת חלון עדכון פרופיל
    userIn, // מידע על המשתמש הנוכחי
    setChangePassPopUp, // setter לפתיחת חלון שינוי סיסמה
    setUpdateProInUse, // לא בשימוש כאן אבל מגיע מה props
  } = props;
  const [showDrop, setShowDrop] = useState(false); // ניהול תצוגת התפריט הנפתח
  const [showRequests, setShowRequests] = useState(false); // ניהול תצוגת בקשות המשתמש
  const [allRequests, setAllRequests] = useState([]); // שמירת כל הבקשות שהמשתמש קיבל
  const image_src = "/uploads/woman.png"; // תמונת פרופיל ברירת מחדל

  function denyRequest(requestId) {
    // שולח בקשת עדכון לבטל בקשה ספציפית
    const requestToUpdate = { requestId: requestId };
    axios
      .put("requests/deny", requestToUpdate)
      .then((res) => {
        handleRequests(); // רענון רשימת הבקשות לאחר סירוב
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function acceptRequest(requestId, projectId) {
    // שולח בקשת עדכון לאשר בקשה ספציפית
    const requestToUpdate = {
      requestId: requestId,
      email: JSON.parse(localStorage.getItem("user")).email,
      projectId: projectId,
    };

    axios
      .put("requests/accept", requestToUpdate)
      .then((res) => {
        handleRequests(); // רענון רשימת הבקשות לאחר אישור
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleRequests() {
    // שולח בקשת POST להביא את כל הבקשות של המשתמש הנוכחי
    const emailOfUser = JSON.parse(localStorage.getItem("user")).email;
    const userToSend = { email: emailOfUser };
    axios
      .post("requests", userToSend)
      .then((res) => {
        const requestsFromDB = res.data.map((item) => ({
          projectName: item.projectName,
          email: item.fromUser,
          requestId: item.requestId,
          projectId: item.projectId,
        }));
        setAllRequests(requestsFromDB);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setShowRequests(true); // מציג את חלון הבקשות
  }

  return (
    <header className={classes.header}>
      {/* Wrapper למידע המשתמש בצד שמאל */}
      <div className={classes.userWrapper}>
        {showDrop ? (
          <div
            onMouseEnter={() => setShowDrop(true)}
            onMouseLeave={() => setShowDrop(false)}
            className={classes.dropdown_container}
          >
            {/* תפריט נפתח עם אפשרויות לניהול פרופיל ושינוי סיסמה */}
            <div className={classes.dropdown_menu}>
              <p onClick={() => setUpdatePopUp(true)}>Update my profile</p>
              <p onClick={() => setChangePassPopUp(true)}>Reset Password</p>
              <p onClick={handleRequests}>My Requests</p>
            </div>
          </div>
        ) : null}
        <div>
          {/* תמונת פרופיל - מעלה את ה-dropdown בעת מעבר עכבר */}
          <img
            onMouseEnter={() => setShowDrop(true)}
            onMouseLeave={() => setShowDrop(false)}
            src={image_src}
          />
          {/* כפתור יציאה מהמערכת */}
          <LogOut logOut={logOut} />
        </div>
        <div>
          {/* הצגת שם המשתמש */}
          <p>{userIn.userName}</p>
        </div>
      </div>

      {/* לוגו האפליקציה במרכז */}
      <div className={classes.logoWrapper}>
        <img className={classes.logo} src={finalLogo} />
      </div>

      {/* כפתורי ניווט בצד ימין */}
      <div className={classes.buttonsWrapper}>
        <StateButton name="Use" func={props.use} />
        <StateButton name="Moodify" func={props.modify} />
      </div>

      {/* חלון פופאפ להצגת בקשות המשתמש */}
      {showRequests && (
        <div
          className={classes.popupOverlay}
          onClick={() => setShowRequests(false)} // סגירת הפופאפ בלחיצה מחוץ לחלון
        >
          <div className={classes.popup} onClick={(e) => e.stopPropagation()}>
            <h3 className={classes.popupTitle}>My requests</h3>
            {allRequests.map((req) => (
              <div key={req.requestId} className={classes.requestRow}>
                {/* הצגת פרטי הבקשה */}
                <span>{req.projectName} |</span>
                <span>{req.email}|</span>
                <div>
                  {/* כפתורי אישור וסירוב בקשה */}
                  <button
                    className={classes.acceptButton}
                    onClick={() => acceptRequest(req.requestId, req.projectId)}
                  >
                    Accept
                  </button>
                  <button
                    className={classes.denyButton}
                    onClick={() => denyRequest(req.requestId)}
                  >
                    Deny
                  </button>
                </div>
              </div>
            ))}
            {/* כפתור לסגירת הפופאפ */}
            <button
              className={classes.closeButton}
              onClick={() => setShowRequests(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;






// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import classes from "./header.module.css";
// import finalLogo from "../../assets/finalLogo.png";
// import StateButton from "../buttons/stateButton/StateButton";
// import LogOut from "../buttons/logOut/LogOut";
// import axios from "axios";
// import UpdateProfile from "../popUps/updateProfile/UpdateProfile";
// /**
//  * description: Header component
//  * @returns JSX of component
//  */

// function Header(props) {
//   const {
//     logOut,
//     setUpdatePopUp,
//     userIn,
//     setChangePassPopUp,
//     setUpdateProInUse,
//   } = props;
//   const [showDrop, setShowDrop] = useState(false);
//   const [showRequests, setShowRequests] = useState(false);
//   const [allRequests, setAllRequests] = useState([]);
//   const image_src = "/uploads/woman.png";

//   function denyRequest(requestId) {
//     const requestToUpdate = {
//       requestId: requestId,
//     };
//     axios
//       .put("requests/deny", requestToUpdate)
//       .then((res) => {
//         handleRequests();
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }
//   function acceptRequest(requestId, projectId) {
//     const requestToUpdate = {
//       requestId: requestId,
//       email: JSON.parse(localStorage.getItem("user")).email,
//       projectId: projectId,
//     };

//     axios
//       .put("requests/accept", requestToUpdate)
//       .then((res) => {
//         handleRequests();
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }
//   function handleRequests() {
//     const emailOfUser = JSON.parse(localStorage.getItem("user")).email;
//     const userToSend = {
//       email: emailOfUser,
//     };
//     axios
//       .post("requests", userToSend)
//       .then((res) => {
//         const requestsFromDB = res.data.map((item) => ({
//           projectName: item.projectName,
//           email: item.fromUser,
//           requestId: item.requestId,
//           projectId: item.projectId,
//         }));
//         setAllRequests(requestsFromDB);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//     setShowRequests(true);
//   }
//   return (
//     <header className={classes.header}>
//       <div className={classes.userWrapper}>
//         {showDrop ? (
//           <div
//             onMouseEnter={() => setShowDrop(true)}
//             onMouseLeave={() => setShowDrop(false)}
//             className={classes.dropdown_container}
//           >
//             <div className={classes.dropdown_menu}>
//               <p onClick={() => setUpdatePopUp(true)}>Update my profile</p>
//               <p onClick={() => setChangePassPopUp(true)}>Reset Password</p>
//               <p onClick={handleRequests}>My Requests</p>
//             </div>
//           </div>
//         ) : null}
//         <div>
//           <img
//             onMouseEnter={() => setShowDrop(true)}
//             onMouseLeave={() => setShowDrop(false)}
//             src={image_src}
//           />
//           <LogOut logOut={logOut} />
//         </div>
//         <div>
//           <p>{userIn.userName}</p>
//         </div>
//       </div>

//       <div className={classes.logoWrapper}>
//         <img className={classes.logo} src={finalLogo} />
//       </div>
//       <div className={classes.buttonsWrapper}>
//         <StateButton name="Use" func={props.use} />
//         <StateButton name="Moodify" func={props.modify} />
//       </div>

//       {showRequests && (
//         <div
//           className={classes.popupOverlay}
//           onClick={() => setShowRequests(false)}
//         >
//           <div className={classes.popup} onClick={(e) => e.stopPropagation()}>
//             <h3 className={classes.popupTitle}>My requests</h3>
//             {allRequests.map((req) => (
//               <div key={req.requestId} className={classes.requestRow}>
//                 <span>{req.projectName} |</span>
//                 <span>{req.email}|</span>
//                 <div>
//                   <button
//                     className={classes.acceptButton}
//                     onClick={() => acceptRequest(req.requestId, req.projectId)}
//                   >
//                     Accept
//                   </button>
//                   <button
//                     className={classes.denyButton}
//                     onClick={() => denyRequest(req.requestId)}
//                   >
//                     Deny
//                   </button>
//                 </div>
//               </div>
//             ))}
//             <button
//               className={classes.closeButton}
//               onClick={() => setShowRequests(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;