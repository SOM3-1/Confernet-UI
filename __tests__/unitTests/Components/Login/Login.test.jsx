import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../../../../src/Components/Login/Login";
import { signInWithEmailAndPassword } from "firebase/auth";

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
}));

vi.mock("../../../../src/firebase/firebaseConfig", () => ({
  auth: {},
}));

describe("Login Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("test-id: 10,renders login form inputs and button", () => {
    render(<Login />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account/i)).toBeInTheDocument();
  });

  it("test-id: 11, shows success snackbar on successful login", async () => {
    signInWithEmailAndPassword.mockResolvedValue({
      user: { uid: "mock-user-id" },
    });

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.any(Object),
        "test@example.com",
        "password123"
      );
    });

    expect(localStorage.getItem("userId")).toBe("mock-user-id");
    expect(screen.getByText(/Login successful/i)).toBeInTheDocument();
  });

  it("test-id: 12, shows error snackbar on login failure", async () => {
    signInWithEmailAndPassword.mockRejectedValue(new Error("Login failed"));

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
    });
  });

  it("test-id: 13, displays loading spinner during login", async () => {
    let resolveLogin;
    signInWithEmailAndPassword.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveLogin = resolve;
        })
    );

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "loading@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    resolveLogin({ user: { uid: "123" } });

    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );
  });
});
