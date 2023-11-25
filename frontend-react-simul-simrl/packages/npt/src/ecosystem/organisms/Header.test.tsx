/* eslint-disable jest/expect-expect */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ComponentTestWrapper } from "../../utils/test";
import Header from "./Header";

describe.skip("[COMPONENT TESTING] Header", () => {
  const initialProps = {};

  const subject = (props = initialProps) => (
    <ComponentTestWrapper>
      <Header {...props} />
    </ComponentTestWrapper>
  );

  const initialSubject = subject();

  test("should be in the document and visible", () => {
    render(initialSubject);
    const elem = screen.getByTestId("Header-testId");
    expect(elem).toBeInTheDocument();
    expect(elem).toBeVisible();
  });

  test("should simulates selection", async () => {
    render(initialSubject);

    const dropdown = screen.getByLabelText("Número de Titulares");
    fireEvent.click(dropdown);
    const option = screen.getByText("2 Titulares");
    fireEvent.click(option);
    expect(dropdown).toHaveValue("2 Titulares");

    fireEvent.click(dropdown);
    const option2 = screen.getByText("3 Titulares");
    fireEvent.click(option2);
    expect(dropdown).toHaveValue("3 Titulares");
  });

  test("should remove error Message after selecting holder", async () => {
    render(initialSubject);

    const errorMessage = screen.getByText("Por favor preencha este campo");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toBeVisible();
    const dropdown = screen.getByLabelText("Número de Titulares");
    fireEvent.click(dropdown);
    const option = screen.getByText("2 Titulares");
    fireEvent.click(option);
    const errorMessage2 = screen.queryByText("Por favor preencha este campo");
    expect(errorMessage2).toBeNull();
  });
});
