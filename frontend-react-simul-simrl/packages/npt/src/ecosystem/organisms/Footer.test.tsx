/* eslint-disable jest/expect-expect */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ComponentTestWrapper } from "../../utils/test";
import Footer from "./Footer";
import Header from "./Header";

describe.skip("[COMPONENT TESTING] Footer", () => {
  const initialProps = {};

  const subject = (props = initialProps) => (
    <ComponentTestWrapper>
      <Header {...props} />
      <Footer {...props} />
    </ComponentTestWrapper>
  );

  const initialSubject = subject();

  test("Continuar button is disable if there is no holders", async () => {
    render(initialSubject);

    const dropdown = screen.getByLabelText("Número de Titulares");
    expect(dropdown).toHaveValue("");
    const button = screen.getByRole("button", { name: "Continuar" });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test("Continuar button is enable if holders > 0", async () => {
    render(initialSubject);

    const dropdown = screen.getByLabelText("Número de Titulares");
    fireEvent.click(dropdown);
    const option = screen.getByText("2 Titulares");
    fireEvent.click(option);

    const button = screen.getByRole("button", { name: "Continuar" });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  test("Continuar button should go to next holder", async () => {
    render(initialSubject);
  });

  test("Anterior button should go to previous holder", async () => {
    render(initialSubject);
  });
});
