'use client';

import { useTheme } from 'components';
import { addColorAlpha } from 'components/utils/color';

export default function Background() {
  const theme = useTheme();
  return (
    <>
      <div className="header">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use href="#gentle-wave" x="48" y="0" fill={addColorAlpha(theme.palette.primary.hex_1000, 0.7)} />
            <use href="#gentle-wave" x="48" y="3" fill={addColorAlpha(theme.palette.tertiary.hex_1000, 0.5)} />
            <use href="#gentle-wave" x="48" y="5" fill={addColorAlpha(theme.palette.success.hex_1000, 0.3)} />
            <use href="#gentle-wave" x="48" y="7" fill={addColorAlpha(theme.palette.warning.hex_1000, 0.4)} />
          </g>
        </svg>
      </div>

      <style jsx>{`
        .header {
          position: relative;
          text-align: center;
          color: white;
          height: 100%;
          overflow: hidden;
        }
        .logo {
          width: 50px;
          fill: white;
          padding-right: 15px;
          display: inline-block;
          vertical-align: middle;
        }

        .waves {
          position: absolute;
          width: 100%;
          height: 35vh;
          max-height: 400px;
          bottom: -7px;
          left: 0;
        }

        .parallax > use {
          animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
        }
        .parallax > use:nth-child(1) {
          animation-delay: -2s;
          animation-duration: 7s;
        }
        .parallax > use:nth-child(2) {
          animation-delay: -3s;
          animation-duration: 10s;
        }
        .parallax > use:nth-child(3) {
          animation-delay: -4s;
          animation-duration: 13s;
        }
        .parallax > use:nth-child(4) {
          animation-delay: -5s;
          animation-duration: 20s;
        }
        @keyframes move-forever {
          0% {
            transform: translate3d(-90px, 0, 0);
          }
          100% {
            transform: translate3d(85px, 0, 0);
          }
        }
        @media (max-width: 768px) {
          .waves {
            max-height: 140px;
          }
        }
      `}</style>
    </>
  );
}
