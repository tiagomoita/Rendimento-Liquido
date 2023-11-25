/* eslint-disable jest/expect-expect */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../utils/test";
import Simulation from "./Simulation";

describe.skip("[COMPONENT TESTING] Simulation", () => {
  const initialProps = {};

  const subject = (props = initialProps) => (
    <ComponentTestWrapper>
      <Simulation {...props} />
    </ComponentTestWrapper>
  );

  const initialSubject = subject();

  it("should be in the document and visible", () => {
    render(initialSubject);
    const elem = screen.getByTestId("Simulation-testId");
    expect(elem).toBeInTheDocument();
    expect(elem).toBeVisible();
  });
});
