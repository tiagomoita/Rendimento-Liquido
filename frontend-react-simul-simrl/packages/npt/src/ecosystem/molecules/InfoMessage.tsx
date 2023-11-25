/* eslint-disable react/jsx-no-useless-fragment */
import { NBInfoMessage } from "@nb-omc-xit-frontend/nb-shared/lib/NBInfoMessage";
import { useDispatch, useSelector } from "react-redux";
import { retrieveAlerts } from "../../store/modules/main/selectors";
import "./InfoMessage.scss";
import { resetAlert } from "../../store/modules/main/slices";

const InfoMessage = () => {
  const alerts = useSelector(retrieveAlerts);
  const dispatch = useDispatch();

  return (
    <div className="info-message-wrapper">
      {alerts.length !== 0 ? (
        <NBInfoMessage
          handleClose={() => dispatch(resetAlert())}
          message={alerts[0].message}
          open
          title={alerts[0].title}
          variant={alerts[0].variant}
          key={alerts[0].id}
        />
      ) : null}
    </div>
  );
};

export default InfoMessage;
