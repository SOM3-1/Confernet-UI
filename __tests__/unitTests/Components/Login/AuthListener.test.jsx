import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthListener } from "../../../../src/Components/Login/AuthListener";
import * as firebaseAuth from "firebase/auth";
import { act } from "react-dom/test-utils";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock("firebase/auth", () => {
  return {
    onAuthStateChanged: vi.fn(),
    getAuth: vi.fn(),
  };
});

vi.mock("../../../../src/firebase/firebaseConfig", () => ({
  auth: {}, 
}));


const mockUser = { uid: "user123", email: "test@example.com" };

describe("AuthListener", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("test-id: 6,renders loading spinner while auth is not checked", () => {
    firebaseAuth.onAuthStateChanged.mockImplementationOnce((_auth, callback) => {
      return () => {};
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<AuthListener />}>
            <Route path="/" element={<div>Home</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("test-id: 7,navigates to /home if authenticated and on public route", async () => {
    localStorage.setItem("signupInProgress", "false");

    const navigateMock = vi.fn();
    vi.mocked(firebaseAuth.onAuthStateChanged).mockImplementationOnce((_auth, callback) => {
      callback(mockUser);
      return () => {};
    });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route element={<AuthListener />}>
            <Route path="/login" element={<div>Login</div>} />
            <Route path="/home" element={<div>Home</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Login")).toBeInTheDocument();
    });
  });

  it("test-id: 8,navigates to /login if unauthenticated and on protected route", async () => {
    vi.mocked(firebaseAuth.onAuthStateChanged).mockImplementationOnce((_auth, callback) => {
      callback(null);
      return () => {};
    });

    render(
      <MemoryRouter initialEntries={["/home"]}>
        <Routes>
          <Route element={<AuthListener />}>
            <Route path="/home" element={<div>Home</div>} />
            <Route path="/login" element={<div>Login Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument();
    });
  });

  it("test-id: 9, renders child route if authenticated and on protected route", async () => {
    vi.mocked(firebaseAuth.onAuthStateChanged).mockImplementationOnce((_auth, callback) => {
      callback(mockUser);
      return () => {};
    });

    render(
      <MemoryRouter initialEntries={["/home"]}>
        <Routes>
          <Route element={<AuthListener />}>
            <Route path="/home" element={<div data-testid="home-content">Welcome Home</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("home-content")).toBeInTheDocument();
    });
  });
});
