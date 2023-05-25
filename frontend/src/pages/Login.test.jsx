import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Login from "./Login";
import { AuthContextProvider } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

const MockLoginPage = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthContextProvider>
  );
};

describe("Login", () => {
  it("should render login form", () => {
    render(<MockLoginPage />);
    const componentElement = screen.getByRole("form");
    expect(componentElement).toBeInTheDocument();
  });

  // it("displays correct text", () => {
  //   render(<MyComponent />);
  //   const textElement = screen.getByText("Hello, World!");
  //   expect(textElement).toBeInTheDocument();
  // });
});
