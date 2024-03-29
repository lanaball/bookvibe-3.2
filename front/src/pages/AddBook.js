//COMPONENTS
import BackBtn from "../components/buttons/BackBtn";
import SubmitBtn from "../components/buttons/SubmitBtn";
import AddBookFooter from "../components/footers/AddBookFooter";
import BookFormAdd from "../components/form/BookFormAdd.js";

//HOOKS
import { useState } from "react";
import chroma from "chroma-js";
import { NavLink } from "react-router-dom";

//STYLE SHEETS
import "./AddBook.scss";

const AddBook = () => {
  //-------------------------------------------------------------------------------------------------------------------------------
  //USE STATES

  // stores hex value of the color chosen by the user on the color picker to use the inline style for the background on the parent container
  const [userBackgroundColor, setUserBackgroundColor] = useState("#1A49CB");

  // stores the brightness value to assess whether the text & buttons in the page need to be dark or light to contrast background
  const [colorBrightness, setColorBrightness] = useState(null);

  //-------------------------------------------------------------------------------------------------------------------------------
  //CALL BACK FUNCTIONS

  // function is fired when user clicks on the color picker and changes the color;
  const handleColor = (e) => {
    setUserBackgroundColor(e.target.value);

    // transforms the hex value into an rgb value so that we can execute the luminance() function below;
    let color = chroma(userBackgroundColor);

    // finds luminance value and stores this in brightness useState above;
    setColorBrightness(color.luminance());
  };


  //-------------------------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <div
        style={{ backgroundColor: userBackgroundColor }}
        className={colorBrightness > 0.3 ? "add-book dark" : "add-book"}
      >
        <div className="add-book__left-col">
          <h1 className="header">add a book</h1>
          <NavLink to={"/books"}>
            <BackBtn colorBrightness={colorBrightness} />
          </NavLink>
        </div>

        <div className="add-book__right-col">
          <BookFormAdd userBackgroundColor={userBackgroundColor} colorBrightness={colorBrightness}/>
        </div>
      </div>
      <AddBookFooter handleColor={handleColor} />
    </div>
  );
};

export default AddBook;
