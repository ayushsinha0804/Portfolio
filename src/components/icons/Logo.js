import React from 'react';

const Logo = () => (
    <svg
        id="logo"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        viewBox="0 0 84 96"
        className="w-10 h-10 fill-none stroke-green stroke-2 hover:fill-tint transition-all duration-300"
    >
        <title>Logo</title>
        <g transform="translate(-8.000000, -2.000000)">
            <g transform="translate(11.000000, 5.000000)">
                <polygon
                    id="Shape"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="39 0 0 22 0 67 39 90 78 67 78 22"
                />
                <text
                    x="39"
                    y="50"
                    fill="currentColor"
                    fontSize="50px"
                    fontFamily="Consolas, serif"
                    textAnchor="middle"
                    stroke="none"
                    alignmentBaseline="middle"
                    dy="6" // Adjust vertical alignment
                >
                    A
                </text>
            </g>
        </g>
    </svg>
);

export default Logo;
