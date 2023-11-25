/* eslint-disable jest/expect-expect */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../utils/test";
import Holders from "./Holders";

describe.skip("[COMPONENT TESTING] Holders", () => {
  const initialProps = {};

  const subject = (props = initialProps) => (
    <ComponentTestWrapper>
      <Holders {...props} />
    </ComponentTestWrapper>
  );

  const initialSubject = subject();

  it("should be in the document and visible", () => {
    render(initialSubject);
    const elem = screen.getByTestId("Holders-testId");
    expect(elem).toBeInTheDocument();
    expect(elem).toBeVisible();
  });
});
