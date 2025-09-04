import classes from "./use.module.css";
import Projects from "../../projects/Projects";
import Function from "../../function/Function";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CalendarFunc from "../../functionsFormats/calendar/CalendarFunc";
import Blog from "../../functionsFormats/blog/Blog";
import ImageGallery from "../../functionsFormats/imageGallery/ImageGallery";
import Files from "../../functionsFormats/files/Files";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import BlogList from "../../functionsFormats/blogList/BlogList";
import AllList from "../../functionsFormats/allLists/AllLists";


export default function Use() {
  const [projects, setProjects] = useState([]);
  const [functions, setFunctions] = useState([]);
  // const [choosePro, setChoosePro] = useState(false);
  // const [goBack, setGoBack] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentFunction, setCurrentFunction] = useState(null);
  const [showFunctions, setShowFunctions] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [showLists, setShowLists] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  //this will happen first thing when we enter the page
  useEffect(() => {
    fetchData();
  }, []);
  function onClickFunc(type, functionId) {
    setCurrentFunction(functionId);
    if (type === "calendar") setShowCalendar(true);
    if (type === "blog") setShowBlog(true);
    if (type === "gallery") setShowGallery(true);
    if (type === "files") setShowFiles(true);
    if (type === "list") setShowLists(true);
  }
  function handleGoBack() {
    setShowFunctions(true);
    setShowCalendar(false);
    setShowBlog(false);
    setShowCharts(false);
    setShowLists(false);
    setShowFiles(false);
    setShowGallery(false);
  }

  const allFunctionComponents = functions.map((el) => {
    if (el.active == 1) {
      return (
        <Function
          onClickFunc={onClickFunc}
          setShowFunctions={setShowFunctions}
          showChecked={false}
          functionId={el.functionId}
          projectId={currentProject}
          key={el.functionId}
          type={el.type}
          active={el.active}
        />
      );
    }
    return null;
  });
  const fetchData = () => {
    const emailOfUser = JSON.parse(localStorage.getItem("user")).email;
    const userToSend = {
      email: emailOfUser,
    };
    axios
      .post("project", userToSend)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function getFunctions(project) {
    handleGoBack();
    setCurrentProject(project);
    setShowFunctions(true);
    const idToSend = {
      functionId: project.id,
    };
    axios
      .post("project/functions", idToSend)
      .then((res) => {
        console.log(res.data);
        setFunctions(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  //this is fake data - delete at the end

  const initialList = [
    { text: "לסיים את התרגיל", completed: false },
    { text: "ללכת לסופר", completed: true },
  ];
  //
  return (
    <main className={classes.container}>
      {showFunctions ? (
        <div className={classes.changes}>
          <div className={classes.functions}>{allFunctionComponents}</div>
        </div>
      ) : (
        <div>
          <IoChevronBackCircleSharp size={40} onClick={handleGoBack} />
        </div>
      )}

      {showCalendar ? (
        <div className={classes.functionDisplay}>
          <CalendarFunc functionId={currentFunction} />
        </div>
      ) : null}

      {showBlog ? (
        <div className={classes.functionDisplay}>
          <BlogList functionId={currentFunction} />
        </div>
      ) : null}

      {showGallery ? (
        <div className={classes.functionDisplay}>
          <ImageGallery functionId={currentFunction} />
        </div>
      ) : null}

      {showFiles ? (
        <div>
          <Files functionId={currentFunction} />
        </div>
      ) : null}

      {showLists ? (
        <div>
          <AllList functionId={currentFunction} />
        </div>
      ) : null}
      <div className={classes.projects}>
        <Projects
          show={false} //dont show the plus icon
          getFunctions={getFunctions} //get functions from db
          projects={projects} //get projects from DB
        />
      </div>
    </main>
  );
}
