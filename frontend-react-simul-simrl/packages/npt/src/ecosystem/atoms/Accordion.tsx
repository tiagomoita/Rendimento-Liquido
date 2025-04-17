import { useState, ReactNode } from "react";

import "./Accordion.scss";
import { NBAccordion } from "@nb-omc-xit-frontend/nb-shared/lib/NBAccordion";
import { NBTooltip } from "@nb-omc-xit-frontend/nb-data-display/lib/NBTooltip";
import infoSolid from "../../assets/images/circle-info-solid.svg";

type AccordionProps = {
  title: string;
  isDisabled?: boolean;
  children?: ReactNode;
  open?: boolean;
  textInfo?: string;
  infoIcon?: boolean;
};

const Accordion = (props: AccordionProps) => {
  const {
    title,
    children,
    isDisabled,
    open = false,
    textInfo = "",
    infoIcon,
  } = props;
  const [isOpen, setIsOpen] = useState(open);

  return (
    <div className="accordion-wrapper">
      <NBAccordion
        // eslint-disable-next-line react/no-unstable-nested-components
        header={
          <div style={{ display: "flex" }}>
            <div className="accordion-header">
              <b>{title}</b>
            </div>
            {infoIcon === true && (
              <div
                style={{
                  width: "22px",
                  marginLeft: "5px",
                  marginTop: "5px",
                  zIndex: "2",
                }}
              >
                <NBTooltip
                  tooltip={textInfo}
                  variant="dark"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <img style={{ width: "20px" }} src={infoSolid} alt="img" />
                </NBTooltip>
              </div>
            )}
          </div>
        }
        // eslint-disable-next-line react/jsx-no-bind
        onChange={() => setIsOpen(!isOpen)}
        variant="primary"
        expanded={isOpen}
        disabled={isDisabled}
      >
        {children}
      </NBAccordion>
    </div>
  );
};

export default Accordion;
