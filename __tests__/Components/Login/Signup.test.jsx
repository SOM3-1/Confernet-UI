import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Signup from "../../../src/Components/Login/Signup";
import { MemoryRouter } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { registerUser } from "../../../src/services/registerService";

vi.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: vi.fn(),
}));

vi.mock("../../../src/firebase/firebaseConfig", () => ({
  auth: {},
}));

vi.mock("../../../src/services/registerService", () => ({
  registerUser: vi.fn(),
}));

describe("Signup Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("test-id: 14, renders all form fields", () => {
    render(<Signup />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Signup/i })).toBeInTheDocument();
  });

  it("test-id: 15, shows success message and navigates after successful signup", async () => {
    createUserWithEmailAndPassword.mockResolvedValue({
      user: { uid: "test-uid" },
    });

    registerUser.mockResolvedValue({ success: true });

    render(<Signup />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: "2000-01-01" } });

    fireEvent.click(screen.getByRole("button", { name: /Signup/i }));

    await waitFor(() =>
      expect(screen.getByText(/Welcome, John Doe! Signup successful/i)).toBeInTheDocument()
    );

    expect(localStorage.getItem("userId")).toBe("test-uid");
    expect(registerUser).toHaveBeenCalled();
  });

  it("test-id: 16, shows error message on failed signup", async () => {
    createUserWithEmailAndPassword.mockRejectedValue(new Error("Signup failed"));
  
    render(<Signup />, { wrapper: MemoryRouter });
  
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: "Jane" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "pass" } });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: "1990-01-01" } });
  
    fireEvent.click(screen.getByRole("button", { name: /Signup/i }));
  
    await waitFor(() =>
        expect(screen.getByRole("alert")).toHaveTextContent(/Signup failed/i)
      );      
  });
  

  it("test-id: 17, displays loading spinner during signup", async () => {
    let resolveSignup;
    createUserWithEmailAndPassword.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSignup = resolve;
        })
    );

    render(<Signup />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: "Test" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password" } });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: "2000-01-01" } });

    fireEvent.click(screen.getByRole("button", { name: /Signup/i }));

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    resolveSignup({ user: { uid: "test-id" } });

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });
});
