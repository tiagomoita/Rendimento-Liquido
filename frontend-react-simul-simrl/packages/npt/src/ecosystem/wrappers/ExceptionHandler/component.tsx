import React, { ComponentType } from "react";
import { useSelector } from "react-redux";
import { NBSTI } from "@nb-omc-xit-frontend/nb-feedback/lib/NBSTI";

// Modules
import main from "../../../store/modules/main";

/**
 * @param {ComponentType<any>} WrappedComponent
 */
const withExceptionHandler =
  (WrappedComponent: ComponentType<any>) =>
  ({ ...props }: any) => {
    const hasException = useSelector(main.selectors.hasException);
    return hasException ? <NBSTI /> : <WrappedComponent {...props} />;
  };

export default withExceptionHandler;
