import React, { useState } from 'react';
import {
  KeyRound,
  ShieldCheck,
  Zap,
  RefreshCw,
  Lock,
  Unlock,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DiffieHellmanView: React.FC = () => {
  // Diffie-Hellman Parameters over small prime for illustrative mathematics
  const p = 23; // Prime modulus
  const g = 5;  // Generator base

  const [alicePrivateA, setAlicePrivateA] = useState<number>(6);
  const [bobPrivateB, setBobPrivateB] = useState<number>(15);
  const [isMitmActive, setIsMitmActive] = useState<boolean>(false);
  const [evePrivateE, setEvePrivateE] = useState<number>(8);

  // Modular exponentiation (base^exp % mod)
  const modExp = (base: number, exp: number, mod: number) => {
    let res = 1;
    base = base % mod;
    for (let i = 0; i < exp; i++) {
      res = (res * base) % mod;
    }
    return res;
  };

  // Alice computes A = g^a mod p
  const alicePublicA = modExp(g, alicePrivateA, p);
  // Bob computes B = g^b mod p
  const bobPublicB = modExp(g, bobPrivateB, p);
  // Eve computes E = g^e mod p
  const evePublicE = modExp(g, evePrivateE, p);

  // Normal Shared Secret: s_alice = B^a mod p, s_bob = A^b mod p
  const aliceSharedKey = isMitmActive ? modExp(evePublicE, alicePrivateA, p) : modExp(bobPublicB, alicePrivateA, p);
  const bobSharedKey = isMitmActive ? modExp(evePublicE, bobPrivateB, p) : modExp(alicePublicA, bobPrivateB, p);

  const eveSharedWithAlice = modExp(alicePublicA, evePrivateE, p);
  const eveSharedWithBob = modExp(bobPublicB, evePrivateE, p);

  const isMatch = aliceSharedKey === bobSharedKey;

  const randomizeKeys = () => {
    setAlicePrivateA(Math.floor(Math.random() * 15) + 2);
    setBobPrivateB(Math.floor(Math.random() * 15) + 2);
    setEvePrivateE(Math.floor(Math.random() * 15) + 2);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Diffie-Hellman Key Agreement & MITM Attack Simulator</span>
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-bold font-mono">
                p={p}, g={g}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Interactive mathematical demonstration of non-secret channel key exchange: (K = B^a equiv A^b equiv g^{ab} pmod p) and vulnerability to active Man-in-the-Middle tampering without digital signatures.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMitmActive(prev => !prev)}
              className={'btn-press px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ' + (
                isMitmActive
                  ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-500/50'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              )}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{isMitmActive ? 'MITM Attack: ACTIVE' : 'Inject MITM Interceptor'}</span>
            </button>

            <button
              onClick={randomizeKeys}
              className="btn-press px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Randomize Keys</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Participant Columns: Alice, (Eve MITM), Bob */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alice Column */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold text-sm">
                A
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Alice (Client)</h3>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Endpoint A</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Private Secret (a):</span>
              <span className="font-mono font-bold text-sky-600">{alicePrivateA} (Hidden)</span>
            </div>
            <input
              type="range"
              min="2"
              max="20"
              value={alicePrivateA}
              onChange={e => setAlicePrivateA(Number(e.target.value))}
              className="w-full accent-sky-600"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Computed Public Key</span>
            <div className="font-mono text-sm font-bold text-slate-900 dark:text-white">
              (A = g^a pmod p = {g}^{'{'}{alicePrivateA}{'}'} pmod{'{'}{p}{'}'} = ) <span className="text-sky-600">{alicePublicA}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-sky-700 dark:text-sky-400 block">Derived Session Symmetric Key</span>
            <div className="text-xl font-mono font-black text-sky-700 dark:text-sky-300">
              (K_A = {aliceSharedKey})
            </div>
            <span className="text-[10px] text-slate-400 block">
              Computed via {isMitmActive ? 'intercepted Eve public E' : 'Bob public B'}
            </span>
          </div>
        </div>

        {/* Middle: Insecure Channel / Eve MITM Column */}
        <div className={'p-6 rounded-2xl border transition shadow-sm space-y-4 flex flex-col justify-between ' + (
          isMitmActive
            ? 'bg-rose-50/30 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
        )}>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className={'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ' + (
                  isMitmActive ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-100 text-slate-500'
                )}>
                  {isMitmActive ? 'E' : '⇄'}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isMitmActive ? 'Eve (Man-in-the-Middle)' : 'Public Transmission Wire'}
                </h3>
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Insecure Link</span>
            </div>

            {isMitmActive ? (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-rose-100/60 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Packet Interception Active</span>
                  </div>
                  <p className="text-[11px] leading-tight">
                    Eve intercepts (A={alicePublicA}) and (B={bobPublicB}), substituting her own public key (E={evePublicE}) to establish independent sessions with both parties!
                  </p>
                </div>

                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Key with Alice:</span>
                    <span className="font-bold text-sky-600">(K_{'{'}EA{'}'} = {eveSharedWithAlice})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Key with Bob:</span>
                    <span className="font-bold text-emerald-600">(K_{'{'}EB{'}'} = {eveSharedWithBob})</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-2">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Legitimate Key Agreement</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Only public numbers (A={alicePublicA}) and (B={bobPublicB}) cross the wire. An eavesdropper cannot compute (g^{'{'}ab{'}'}) without solving the discrete logarithm problem.
                </p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-center text-slate-500">
            {isMitmActive ? (
              <strong className="text-rose-600 font-bold">Encrypted traffic decrypted & re-encrypted in flight!</strong>
            ) : (
              <span>End-to-End Cryptographic Match: <strong className="text-emerald-600 font-mono">{aliceSharedKey === bobSharedKey ? 'SECURE' : 'ERROR'}</strong></span>
            )}
          </div>
        </div>

        {/* Bob Column */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm">
                B
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Bob (Server)</h3>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Endpoint B</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Private Secret (b):</span>
              <span className="font-mono font-bold text-emerald-600">{bobPrivateB} (Hidden)</span>
            </div>
            <input
              type="range"
              min="2"
              max="20"
              value={bobPrivateB}
              onChange={e => setBobPrivateB(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Computed Public Key</span>
            <div className="font-mono text-sm font-bold text-slate-900 dark:text-white">
              (B = g^b pmod p = {g}^{'{'}{bobPrivateB}{'}'} pmod{'{'}{p}{'}'} = ) <span className="text-emerald-600">{bobPublicB}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 block">Derived Session Symmetric Key</span>
            <div className="text-xl font-mono font-black text-emerald-700 dark:text-emerald-300">
              (K_B = {bobSharedKey})
            </div>
            <span className="text-[10px] text-slate-400 block">
              Computed via {isMitmActive ? 'intercepted Eve public E' : 'Alice public A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
