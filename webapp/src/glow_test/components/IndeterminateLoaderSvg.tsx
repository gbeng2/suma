interface IndeterminateLoaderSvgProps {
  size?: number | string;
}

export default function IndeterminantLoaderSvg({ size }: IndeterminateLoaderSvgProps) {
  size = size || 300;
  return (
    <svg
      style={{
        margin: "auto",
        background: "none",
        display: "block",
        shapeRendering: "auto",
      }}
      width={size}
      height={size}
      viewBox="31 31 38 38"
      preserveAspectRatio="xMidYMid"
    >
      <g>
        <circle
          cx="50"
          cy="50"
          r="16"
          pathLength="100"
          stroke="currentColor"
          strokeDasharray="75 25"
          strokeWidth="3"
          fill="none"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;360 50 50"
          dur="0.9"
          repeatCount="indefinite"
        ></animateTransform>
      </g>
    </svg>
  );
}
