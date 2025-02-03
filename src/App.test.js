import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("should render the Learn React link", async () => {
    render(<App />);
    
    // Menggunakan query yang lebih baik untuk mencari elemen
    const linkElement = screen.getByRole("link", { name: /learn react/i });

    expect(linkElement).toBeInTheDocument();
  });
});
