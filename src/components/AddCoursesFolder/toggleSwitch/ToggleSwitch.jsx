import "./ToggleSwitch.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  correctAns,
  setOption1State,
  setOption2State,
  setOption3State,
  setOption4State,
} from "../../../redux/reducers/testSlice";

const ToggleSwitch = (props) => {
  const [isToggled, setIsToggled] = useState(false);
  // console.log('props', props)
  const dispatch = useDispatch();

  const onToggle = () => {
    // if (props.value) {
    //   if (props.label === "option_1") {
    //     dispatch(setOption1State({ index: props.index, optionState: true }));
    //     dispatch(
    //       correctAns({ index: props.index, label: props.label, optionIndex: 0 })
    //     );
    //   } else if (props.label === "option_2") {
    //     dispatch(setOption2State({ index: props.index, optionState: true }));
    //     dispatch(
    //       correctAns({ index: props.index, label: props.label, optionIndex: 1 })
    //     );
    //   } else if (props.label === "option_3") {
    //     dispatch(setOption3State({ index: props.index, optionState: true }));
    //     dispatch(
    //       correctAns({ index: props.index, label: props.label, optionIndex: 2 })
    //     );
    //   } else if (props.label === "option_4") {
    //     dispatch(setOption4State({ index: props.index, optionState: true }));
    //     dispatch(
    //       correctAns({ index: props.index, label: props.label, optionIndex: 3 })
    //     );
    //   }
    // } else {
    // }

    if (props.value) {
      if (props.label === "option_1") {
        dispatch(setOption1State({ index: props.index, optionState: true }));
        dispatch(correctAns({ index: props.index, label: props.label }));
      } else if (props.label === "option_2") {
        dispatch(setOption2State({ index: props.index, optionState: true }));
        dispatch(correctAns({ index: props.index, label: props.label }));
      } else if (props.label === "option_3") {
        dispatch(setOption3State({ index: props.index, optionState: true }));
        dispatch(correctAns({ index: props.index, label: props.label }));
      } else if (props.label === "option_4") {
        dispatch(setOption4State({ index: props.index, optionState: true }));
        dispatch(correctAns({ index: props.index, label: props.label }));
      }
    } else {
    }

    // setIsToggled(!isToggled);
  };

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={props.toggleState}
        onChange={onToggle}
        label={props.label}
      />
      <span className="switch" />
    </label>
  );
};

export default ToggleSwitch;
