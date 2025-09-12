import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  Zap,
  Info,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EccVisualizerView: React.FC = () => {
  // Elliptic Curve Weierstrass equation parameters: y^2 = x^3 + ax + b
  const [a, setA] = useState<number>(-3);
  const [b, setB] = useState<number>(3);
  const [pX, setPX] = useState<number>(-1.5);
  const [qX, setQX] = useState<number>(1.2);

  // SVG dimensions
  const width = 640;
  const height = 400;
  const scale = 38; // pixels per unit
  const originX = width / 2;
  const originY = height / 2;

  const toSvgX = (x: number) => originX + x * scale;
  const toSvgY = (y: number) => originY - y * scale;

  // Calculate y for a given x on y^2 = x^3 + ax + b
  const getY = (x: number) => {
    const rhs = x * x * x + a * x + b;
    if (rhs < 0) return null;
    return Math.sqrt(rhs);
  };

  // Generate curve path points
  const pointsTop: { x: number; y: number }[] = [];
  const pointsBottom: { x: number; y: number }[] = [];

  for (let x = -3.5; x <= 3.5; x += 0.05) {
    const y = getY(x);
    if (y !== null && y <= 5.0) {
      pointsTop.push({ x: toSvgX(x), y: toSvgY(y) });
      pointsBottom.unshift({ x: toSvgX(x), y: toSvgY(-y) });
    }
  }

  // Points P and Q on the curve
  const pY = getY(pX) ?? 1;
  const qY = getY(qX) ?? 1.5;

  // Chord line connecting P and Q: slope m = (qY - pY) / (qX - pX)
  const isIdentical = Math.abs(pX - qX) < 0.01;
  const m = isIdentical ? (3 * pX * pX + a) / (2 * pY || 0.001) : (qY - pY) / (qX - pX);

  // Third intersection xR = m^2 - pX - qX
  const rX = m * m - pX - qX;
  const rY_intersect = m * (rX - pX) + pY;
  // Negation point R = P + Q = (rX, -rY_intersect)
  const sumY = -rY_intersect;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Elliptic Curve Cryptography (ECC) Geometric Point Addition</span>
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-bold font-mono">
                y² = x³ + {a}x + {b}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Interactive chord-and-tangent geometric visualizer of group point addition (P + Q = R) underpinning modern ECDSA, Ed25519, and Bitcoin/Ethereum Secp256k1 keys.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setA(-3); setB(3); setPX(-1.5); setQX(1.2); }}
              className="btn-press px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Curve</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: SVG Curve Plot + Interactive Point Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SVG Canvas */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-bold text-sky-600">
                <span className="w-3 h-3 rounded-full bg-sky-500" /> Point P ({pX.toFixed(2)}, {pY.toFixed(2)})
              </span>
              <span className="flex items-center gap-1.5 font-bold text-amber-600">
                <span className="w-3 h-3 rounded-full bg-amber-500" /> Point Q ({qX.toFixed(2)}, {qY.toFixed(2)})
              </span>
              <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-400" /> Result R = P+Q ({rX.toFixed(2)}, {sumY.toFixed(2)})
              </span>
            </div>
            <span className="text-slate-400 font-mono text-[11px]">Weierstrass Field</span>
          </div>

          <div className="w-full aspect-[16/10] bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden">
            <svg
              className="w-full h-full"
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Axes */}
              <line x1="0" y1={originY} x2={width} y2={originY} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <line x1={originX} y1="0" x2={originX} y2={height} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

              {/* Curve Upper Half */}
              {pointsTop.length > 1 && (
                <path
                  d={`M ${pointsTop[0].x} ${pointsTop[0].y} ` + pointsTop.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                />
              )}

              {/* Curve Lower Half */}
              {pointsBottom.length > 1 && (
                <path
                  d={`M ${pointsBottom[0].x} ${pointsBottom[0].y} ` + pointsBottom.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                />
              )}

              {/* Chord Secant Line connecting P, Q, and intersecting -R */}
              {pY !== null && qY !== null && (
                <line
                  x1={toSvgX(-3.5)}
                  y1={toSvgY(m * (-3.5 - pX) + pY)}
                  x2={toSvgX(3.5)}
                  y2={toSvgY(m * (3.5 - pX) + pY)}
                  stroke="#f43f5e"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.8"
                />
              )}

              {/* Vertical reflection line from -R to R */}
              {Math.abs(rX) <= 4.0 && (
                <line
                  x1={toSvgX(rX)}
                  y1={toSvgY(rY_intersect)}
                  x2={toSvgX(rX)}
                  y2={toSvgY(sumY)}
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
              )}

              {/* Point P */}
              {pY !== null && (
                <g>
                  <circle cx={toSvgX(pX)} cy={toSvgY(pY)} r="7" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                  <text x={toSvgX(pX) - 10} y={toSvgY(pY) - 10} className="text-[11px] font-black fill-sky-700 dark:fill-sky-300">P</text>
                </g>
              )}

              {/* Point Q */}
              {qY !== null && (
                <g>
                  <circle cx={toSvgX(qX)} cy={toSvgY(qY)} r="7" fill="#d97706" stroke="#ffffff" strokeWidth="2" />
                  <text x={toSvgX(qX) + 8} y={toSvgY(qY) - 10} className="text-[11px] font-black fill-amber-700 dark:fill-amber-300">Q</text>
                </g>
              )}

              {/* Intersection Point -R */}
              {Math.abs(rX) <= 4.0 && (
                <g>
                  <circle cx={toSvgX(rX)} cy={toSvgY(rY_intersect)} r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                  <text x={toSvgX(rX) + 8} y={toSvgY(rY_intersect) + 4} className="text-[10px] font-bold fill-rose-600">-R</text>
                </g>
              )}

              {/* Result Point R = P + Q */}
              {Math.abs(rX) <= 4.0 && (
                <g>
                  <circle cx={toSvgX(rX)} cy={toSvgY(sumY)} r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" className="animate-pulse" />
                  <text x={toSvgX(rX) + 10} y={toSvgY(sumY) - 8} className="text-[11px] font-black fill-emerald-600 dark:fill-emerald-300">R = P + Q</text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Controls & Math Ledger */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>Point Coordinates Sandbox</span>
            </h3>

            {/* Slider P_x */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Point (P) X-Coordinate:</span>
                <span className="font-mono font-bold text-sky-600">{pX.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-2.0"
                max="2.5"
                step="0.05"
                value={pX}
                onChange={e => setPX(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>

            {/* Slider Q_x */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Point (Q) X-Coordinate:</span>
                <span className="font-mono font-bold text-amber-600">{qX.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-2.0"
                max="2.5"
                step="0.05"
                value={qX}
                onChange={e => setQX(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Curve Parameters */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block">Curve Param (a):</span>
                <input
                  type="number"
                  value={a}
                  onChange={e => setA(Number(e.target.value))}
                  className="w-full p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                />
              </div>
              <div>
                <span className="text-slate-500 block">Curve Param (b):</span>
                <input
                  type="number"
                  value={b}
                  onChange={e => setB(Number(e.target.value))}
                  className="w-full p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                />
              </div>
            </div>

            {/* Math Formula Card */}
            <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs space-y-1.5">
              <div className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Group Law Law of Addition</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
                Slope (m = rac{y_2 - y_1}{x_2 - x_1} = {m.toFixed(2)})<br />
                (x_3 = m^2 - x_1 - x_2 = {rX.toFixed(2)})<br />
                (y_3 = m(x_1 - x_3) - y_1 = {sumY.toFixed(2)})
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center">
            Scalar multiplication (k cdot P) is computed by repeated Point Doubling & Addition.
          </div>
        </div>
      </div>
    </div>
  );
};
