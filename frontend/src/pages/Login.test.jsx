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

  it("show a link to admin", () => {
    render(<MockLoginPage />);
    const linkElement = screen.getByText("here");

    // check if we have link
    expect(linkElement).toBeInTheDocument();

    // check if it is an actual link
    expect(linkElement.tagName).toBe("A");

    // check if it has the correct href
    expect(linkElement.getAttribute("href")).toBe("/addadmin");
  });
});
