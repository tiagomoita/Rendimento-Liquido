/* eslint-disable jest/expect-expect */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ComponentTestWrapper } from "../../utils/test";
import Footer from "./Footer";
import Header from "./Header";

describe.skip("[COMPONENT TESTING] Stepper", () => {
  const initialProps = {};

  const subject = (props = initialProps) => (
    <ComponentTestWrapper>
      <Header {...props} />
      <Footer {...props} />
    </ComponentTestWrapper>
  );

  const initialSubject = subject();
  test("should hide Stepper if we are in first page", async () => {
    render(initialSubject);

    expect(window.location.pathname).toBe("/");
    const elem = screen.queryByTestId("Stepper-testId");
    expect(elem).toBeNull();
  });

  test("should change pathname if we move to simulation page", async () => {
    render(initialSubject);

    expect(window.location.pathname).toBe("/");
    const dropdown = screen.getByLabelText("Número de Titulares");
    fireEvent.click(dropdown);
    const option = screen.getByText("2 Titulares");
    fireEvent.click(option);
    const button = screen.getByRole("button", { name: "Continuar" });
    fireEvent.click(button);
    expect(window.location.pathname).toBe("/simulation");
  });

  test("should show stepper with correct steps according to number of holders chosen by the user", async () => {
    render(initialSubject);

    // go to first page
    const firstStep = screen.queryAllByTestId("step-label-testId")[0];
    fireEvent.click(firstStep);

    // 2 Titulares
    const dropdown = screen.getByLabelText("Número de Titulares");
    fireEvent.click(dropdown);
    const option = screen.getByText("2 Titulares");
    fireEvent.click(option);
    const continuar = screen.getByRole("button", { name: "Continuar" });
    fireEvent.click(continuar);

    const steps = screen.getAllByTestId("step-testId");
    expect(steps).toHaveLength(4);

    // 4 Titulares
    const anterior = screen.getByRole("button", { name: "Anterior" });
    fireEvent.click(anterior);
    const dropdown2 = screen.getByLabelText("Número de Titulares");
    fireEvent.click(dropdown2);
    const option2 = screen.getByText("4 Titulares");
    fireEvent.click(option2);
    fireEvent.click(continuar);

    const steps2 = screen.getAllByTestId("step-testId");
    expect(steps2).toHaveLength(6);
  });
});
