import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FaCheckCircle, FaFileAlt, FaQrcode, FaSearch, FaShieldAlt, FaTimesCircle, FaArrowRight } from "react-icons/fa";

const sampleTokens = [
    {
        code: "BBIT-NAAC-2026-001",
        title: "Mandatory Disclosure PDF",
        status: "Verified",
        issuer: "IQAC Office",
        date: "2026-07-03",
        type: "Accreditation Evidence",
    },
    {
        code: "BBIT-COE-2026-012",
        title: "Academic Calendar Notice",
        status: "Verified",
        issuer: "Controller of Examination",
        date: "2026-07-01",
        type: "Official Notice",
    },
    {
        code: "BBIT-STD-2026-041",
        title: "Student Certificate",
        status: "Pending",
        issuer: "Registrar Office",
        date: "2026-06-28",
        type: "Certificate",
    },
];

export default function QRVerificationPage() {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(sampleTokens[0]);
    const [generatorText, setGeneratorText] = useState("BBIT-NAAC-2026-001");
    const [verificationPulse, setVerificationPulse] = useState(0);
    const qrPreviewRef = useRef(null);

    const normalizedSearch = search.trim().toUpperCase();
    const match = useMemo(() => sampleTokens.find((item) => item.code === normalizedSearch) || null, [normalizedSearch]);
    const displayItem = match || selected;
    const verified = displayItem.status === "Verified";
    const normalizedGeneratorText = generatorText.trim() || "BBIT-NAAC-2026-001";
    const qrMatrix = useMemo(() => generateQrMatrix(normalizedGeneratorText), [normalizedGeneratorText]);

    const handleVerify = () => {
        setSelected(match || sampleTokens[0]);
        if ((match || sampleTokens[0])?.status === "Verified") {
            triggerSuccessCue();
            setVerificationPulse((value) => value + 1);
        }
    };

    const handleDownloadQr = async () => {
        const text = normalizedGeneratorText;
        const svgMarkup = createQrSvg(text);
        const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${text.replace(/[^a-zA-Z0-9_-]/g, "_") || "qr-code"}.svg`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
                <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.32em] text-cyan-300">
                        <FaQrcode /> QR Verification
                    </div>
                    <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                        Verify official documents, notices, and accreditation evidence instantly.
                    </h1>
                    <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">
                        A college can place QR codes on certificates, PDFs, disclosure pages, or notices so anyone can scan and confirm authenticity.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/accreditation-intelligence">
                            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-3 font-bold text-blue-950 shadow-lg transition hover:bg-yellow-300 cursor-pointer">
                                Back to Accreditation System <FaArrowRight />
                            </span>
                        </Link>
                        <Link href="/contact-us">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15 cursor-pointer">
                                Request QR setup help
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] md:p-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-950 text-white">
                                <FaSearch />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Lookup panel</p>
                                <h2 className="text-2xl font-bold text-slate-950">Enter a code to verify a record</h2>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <input
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Try BBIT-NAAC-2026-001"
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400"
                            />
                            <button
                                type="button"
                                onClick={handleVerify}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                <FaShieldAlt /> Verify
                            </button>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            {sampleTokens.map((item) => (
                                <button
                                    key={item.code}
                                    type="button"
                                    onClick={() => {
                                        setSelected(item);
                                        setSearch(item.code);
                                    }}
                                    className={`rounded-2xl border p-4 text-left transition ${selected.code === item.code ? "border-blue-500 bg-blue-50 shadow-sm" : "border-slate-200 bg-slate-50 hover:bg-slate-100"}`}
                                >
                                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{item.type}</p>
                                    <p className="mt-2 font-bold text-slate-900">{item.title}</p>
                                    <p className="mt-1 text-sm text-slate-600">{item.code}</p>
                                </button>
                            ))}
                        </div>

                        <div className={`mt-6 rounded-[1.75rem] border p-6 text-white transition ${verified ? "border-emerald-400/40 bg-slate-950" : "border-slate-200 bg-slate-950"}`}>
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Verification result</p>
                                    <h3 className="mt-2 text-2xl font-bold">{displayItem.title}</h3>
                                </div>
                                <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${verified ? "bg-emerald-500/20 text-emerald-200" : "bg-amber-500/20 text-amber-200"}`}>
                                    {verified ? <FaCheckCircle /> : <FaTimesCircle />}
                                    {displayItem.status}
                                </div>
                            </div>

                            {verified && (
                                <div key={verificationPulse} className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-100 animate-pulse">
                                    Verified successfully. Sound and vibration feedback activated.
                                </div>
                            )}

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <InfoCard label="Code" value={displayItem.code} />
                                <InfoCard label="Issuer" value={displayItem.issuer} />
                                <InfoCard label="Date" value={displayItem.date} />
                                <InfoCard label="Category" value={displayItem.type} />
                            </div>

                            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/80">
                                QR verification helps colleges prove that certificates, notices, and accreditation evidence are official and unchanged.
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
                            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">QR code generator</p>
                            <h2 className="mt-2 text-2xl font-bold text-slate-950">Create a verification QR box</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Type any approved code, notice number, or evidence ID and the generator will render a visual QR-style preview for your website demo.
                            </p>

                            <div className="mt-5 space-y-3">
                                <label className="block text-sm font-semibold text-slate-700">QR payload</label>
                                <input
                                    type="text"
                                    value={generatorText}
                                    onChange={(event) => setGeneratorText(event.target.value)}
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400"
                                    placeholder="Enter certificate or evidence code"
                                />
                            </div>

                            <div className="mt-6 flex items-center justify-center rounded-[1.75rem] bg-slate-950 p-5">
                                <div ref={qrPreviewRef} className="camera-frame relative w-full max-w-[240px] overflow-hidden rounded-[2rem] bg-white p-3 shadow-inner">
                                    <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-cyan-400/70" />
                                    <div className="pointer-events-none absolute inset-x-5 top-5 h-0.5 bg-cyan-400/80 shadow-[0_0_18px_rgba(34,211,238,0.9)] animate-scanner-sweep" />
                                    <div className="pointer-events-none absolute left-4 top-4 h-6 w-6 rounded-tl-2xl border-l-4 border-t-4 border-cyan-300" />
                                    <div className="pointer-events-none absolute right-4 top-4 h-6 w-6 rounded-tr-2xl border-r-4 border-t-4 border-cyan-300" />
                                    <div className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 rounded-bl-2xl border-b-4 border-l-4 border-cyan-300" />
                                    <div className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 rounded-br-2xl border-b-4 border-r-4 border-cyan-300" />
                                    <div className="grid grid-cols-[repeat(21,minmax(0,1fr))] gap-1">
                                        {qrMatrix.map((row, rowIndex) =>
                                            row.map((cell, colIndex) => (
                                                <div
                                                    key={`${rowIndex}-${colIndex}`}
                                                    className={`aspect-square rounded-[3px] ${cell ? "bg-slate-950" : "bg-transparent"}`}
                                                />
                                            ))
                                        )}
                                    </div>
                                    <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-cyan-400/60 via-cyan-400/10 to-transparent animate-scanline" />
                                    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-slate-900/5" />
                                </div>
                            </div>

                            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Encoded value</p>
                                <p className="mt-2 break-all text-sm font-semibold text-slate-900">{normalizedGeneratorText}</p>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSearch(normalizedGeneratorText)}
                                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                                >
                                    <FaShieldAlt /> Use in verifier
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDownloadQr}
                                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    <FaArrowRight /> Download QR
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelected(sampleTokens[0])}
                                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Reset sample
                                </button>
                            </div>
                        </div>

                        <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
                            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">How it works</p>
                            <div className="mt-4 space-y-4">
                                {[
                                    "Generate a QR code for any approved record.",
                                    "Place it on a PDF, notice, certificate, or web page.",
                                    "Scan the code to open a verification screen.",
                                    "Show status, issuer, and date instantly.",
                                ].map((step, index) => (
                                    <div key={step} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-950 text-sm font-bold text-white">
                                            {index + 1}
                                        </div>
                                        <p className="text-sm leading-6 text-slate-700">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-blue-50 to-slate-50 p-6">
                            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Use cases</p>
                            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                                <div className="flex gap-3"><FaFileAlt className="mt-1 text-blue-700" /> Student certificates</div>
                                <div className="flex gap-3"><FaFileAlt className="mt-1 text-blue-700" /> Accreditation disclosures</div>
                                <div className="flex gap-3"><FaFileAlt className="mt-1 text-blue-700" /> Administrative notices</div>
                                <div className="flex gap-3"><FaFileAlt className="mt-1 text-blue-700" /> Event approvals and letters</div>
                            </div>
                        </div>

                        <div className="rounded-[2rem] bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white shadow-[0_18px_50px_rgba(29,78,216,0.18)]">
                            <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">Sales angle</p>
                            <h3 className="mt-3 text-2xl font-bold">Another reason colleges buy the platform.</h3>
                            <p className="mt-3 text-white/85 leading-7">
                                QR verification turns your website into a trust system. Colleges can verify official records online and improve credibility for students, staff, and external reviewers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function InfoCard({ label, value }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-white/50">{label}</p>
            <p className="mt-2 font-semibold text-white">{value}</p>
        </div>
    );
}

function generateQrMatrix(text) {
    const size = 21;
    const matrix = Array.from({ length: size }, () => Array(size).fill(false));
    const seed = hashString(text);

    const drawFinder = (startRow, startCol) => {
        for (let row = 0; row < 7; row += 1) {
            for (let col = 0; col < 7; col += 1) {
                const isBorder = row === 0 || row === 6 || col === 0 || col === 6;
                const isCenter = row >= 2 && row <= 4 && col >= 2 && col <= 4;
                matrix[startRow + row][startCol + col] = isBorder || isCenter;
            }
        }
    };

    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    let cursor = 0;
    for (let row = 0; row < size; row += 1) {
        for (let col = 0; col < size; col += 1) {
            const inFinderArea = (row < 7 && col < 7) || (row < 7 && col >= size - 7) || (row >= size - 7 && col < 7);
            if (inFinderArea) continue;
            const bitA = ((seed >> (cursor % 24)) & 1) === 1;
            const bitB = ((row * 17 + col * 31 + seed) % 7) < 3;
            matrix[row][col] = bitA ^ bitB;
            cursor += 1;
        }
    }

    return matrix;
}

function createQrSvg(text) {
    const size = 210;
    const matrix = generateQrMatrix(text);
    const cellSize = size / matrix.length;

    const cells = matrix
        .map((row, rowIndex) =>
            row
                .map((cell, colIndex) => {
                    if (!cell) return "";
                    return `<rect x="${colIndex * cellSize}" y="${rowIndex * cellSize}" width="${cellSize}" height="${cellSize}" rx="2" ry="2" fill="#0f172a" />`;
                })
                .join("")
        )
        .join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" fill="#ffffff" rx="24" ry="24" />
  ${cells}
</svg>`;
}

function hashString(value) {
    let hash = 0;
    for (let index = 0; index < value.length; index += 1) {
        hash = (hash << 5) - hash + value.charCodeAt(index);
        hash |= 0;
    }
    return Math.abs(hash) || 1;
}

// Append page-level animation rules for the scan effect
if (typeof document !== "undefined") {
    const styleId = "qr-scanline-animation";
    if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = `
            @keyframes scanner-sweep {
                0% { transform: translateY(0); opacity: 0; }
                12% { opacity: 1; }
                50% { opacity: 0.95; }
                100% { transform: translateY(180px); opacity: 0; }
            }
            @keyframes scanline {
                0% { transform: translateY(-20%); opacity: 0; }
                15% { opacity: 1; }
                50% { transform: translateY(220%); opacity: 0.9; }
                100% { transform: translateY(440%); opacity: 0; }
            }
            .animate-scanner-sweep { animation: scanner-sweep 2.8s ease-in-out infinite; }
            .animate-scanline { animation: scanline 2.4s linear infinite; }
        `;
        document.head.appendChild(style);
    }
}

function triggerSuccessCue() {
    if (typeof window === "undefined") return;

    if (navigator.vibrate) {
        navigator.vibrate([80, 50, 120]);
    }

    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;

        const audioContext = new AudioContextClass();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(660, audioContext.currentTime + 0.18);

        gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.25);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.26);
        oscillator.onended = () => audioContext.close().catch(() => { });
    } catch (error) {
        console.warn("Unable to play success cue", error);
    }
}