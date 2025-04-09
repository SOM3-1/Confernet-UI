import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PaymentModal from "../../../../src/Components/Payment/PaymentModal";

const mockEvent = {
  registrationFee: "25",
  currency: "USD",
  qrCodeUrl: "https://example.com/qr.png",
};

describe("PaymentModal Component", () => {
  const onClose = vi.fn();
  const onPay = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("test-id: 26, renders when open with event data", () => {
    render(<PaymentModal open={true} onClose={onClose} onPay={onPay} event={mockEvent} />);

    expect(screen.getByText("Complete Payment")).toBeInTheDocument();
    expect(screen.getByAltText("QR Code")).toBeInTheDocument();
    expect(screen.getByText(/Payment Amount: USD 25.00/)).toBeInTheDocument();
  });

  it("test-id: 27,calls onClose when cancel is clicked", () => {
    render(<PaymentModal open={true} onClose={onClose} onPay={onPay} event={mockEvent} />);
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("test-id: 28, triggers payment with Stripe and shows loader", async () => {
    render(<PaymentModal open={true} onClose={onClose} onPay={onPay} event={mockEvent} />);
    
    fireEvent.click(screen.getByRole("button", { name: /pay with stripe/i }));
    
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    
    await waitFor(() => {
      expect(onPay).toHaveBeenCalledWith("stripe");
    });
  });

  it("test-id: 29, triggers payment with PayPal", async () => {
    render(<PaymentModal open={true} onClose={onClose} onPay={onPay} event={mockEvent} />);
    fireEvent.click(screen.getByRole("button", { name: /pay with paypal/i }));

    await waitFor(() => {
      expect(onPay).toHaveBeenCalledWith("paypal");
    });
  });

  it("test-id: 30, triggers payment with Credit Card", async () => {
    render(<PaymentModal open={true} onClose={onClose} onPay={onPay} event={mockEvent} />);
    fireEvent.click(screen.getByRole("button", { name: /pay with credit card/i }));

    await waitFor(() => {
      expect(onPay).toHaveBeenCalledWith("card");
    });
  });

  it("test-id: 31,renders nothing if event is not provided", () => {
    const { container } = render(<PaymentModal open={true} onClose={onClose} onPay={onPay} />);
    expect(container.firstChild).toBeNull();
  });
});
