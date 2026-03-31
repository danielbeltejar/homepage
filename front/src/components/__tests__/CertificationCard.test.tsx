import { render, screen } from "@testing-library/react";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import CertificationCard from "../CertificationCard";

describe("CertificationCard", () => {
  it("renders certification name", () => {
    render(
      <CertificationCard icon={faAward} vendor="Microsoft" name="AZ-900" />
    );
    expect(screen.getByText("AZ-900")).toBeInTheDocument();
  });

  it("contains vendor name (hidden)", () => {
    render(
      <CertificationCard icon={faAward} vendor="Microsoft" name="AZ-900" />
    );
    // Vendor is rendered in a hidden span
    expect(screen.getByText("Microsoft")).toBeInTheDocument();
  });
});
