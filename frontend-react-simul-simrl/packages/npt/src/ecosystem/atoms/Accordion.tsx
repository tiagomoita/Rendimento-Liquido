import { useState, ReactNode } from "react";

import "./Accordion.scss";
import { NBAccordion } from "@nb-omc-xit-frontend/nb-shared/lib/NBAccordion";

type AccordionProps = {
  title: string;
  isDisabled?: boolean;
  children?: ReactNode;
};

const Accordion = (props: AccordionProps) => {
  const { title, children, isDisabled } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-wrapper">
      <NBAccordion
        classes="nb-accordion"
        // eslint-disable-next-line react/no-unstable-nested-components
        header={
          <div className="accordion-header">
            <b>{title}</b>
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
