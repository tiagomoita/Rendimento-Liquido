/* eslint-disable jest/expect-expect */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../utils/test";
import Summary from "./Summary";

describe.skip("[COMPONENT TESTING] Summary", () => {
  const initialProps = {};

  const subject = (props = initialProps) => (
    <ComponentTestWrapper>
      <Summary {...props} />
    </ComponentTestWrapper>
  );

  const initialSubject = subject();

  it("should be in the document and visible", () => {
    render(initialSubject);
    const elem = screen.getByTestId("Summary-testId");
    expect(elem).toBeInTheDocument();
    expect(elem).toBeVisible();
  });
});
