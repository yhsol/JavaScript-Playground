import classNames from "classnames";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CardFooterWrapper from "../../../../app/component/CardFooterWrapper/CardFooterWrapper";
import { activeProfileSelector } from "../../selectors/activeProfile.selector";
import { errorMessageSelector } from "../../selectors/errorMessageSelector";
import { getCreateOnClick, getErrorCloseOnClick } from "./TodoCard.funcs";

const TodoCardFooter: React.FC = () => {
  const activeProfile = useSelector(activeProfileSelector);
  const errorMessage = useSelector(errorMessageSelector);
  return (
    <div className="card-footer">
      <CardFooterWrapper>
        <button
          className={classNames("btn", "btn-primary", {
            disabled: !activeProfile?.profileId,
          })}
          onClick={getCreateOnClick(activeProfile?.profileId)}
        >
          Create New Todo
        </button>
        {errorMessage && (
          <div role="alert">
            {errorMessage}{" "}
            <button onClick={getErrorCloseOnClick()}>Close Alert</button>
          </div>
        )}
      </CardFooterWrapper>
    </div>
  );
};

export default TodoCardFooter;
