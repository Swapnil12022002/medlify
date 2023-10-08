import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface SpinnerProps {
  color: string;
  loading: boolean;
  size: number;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Spinner({ color, loading, size }: SpinnerProps) {
  return (
    <ClipLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
      data-testId="loader"
    />
  );
}
