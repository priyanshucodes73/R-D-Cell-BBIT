import { useMemo, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaCheckCircle, FaCloudUploadAlt, FaGlobe, FaShieldAlt, FaUniversity, FaUsers, FaTasks, FaRegDotCircle } from "react-icons/fa";

const featureGroups = [
    {
        title: "Public Website",
        icon: FaGlobe,
        items: [
            "Branded institutional homepage",
            "Editable top banner and header",
            "College-specific navigation and pages",
            "Responsive public site for all devices",
        ],
    },
    {
        title: "Accreditation Workflow",
        icon: FaTasks,
        items: [
            "Criterion-wise evidence tracking",
            "Draft, review, and publish workflow",
            "Progress percentages for every criterion",
            "Submission readiness overview",
        ],
    },
    {
        title: "Evidence Management",
        icon: FaCloudUploadAlt,
        items: [
            "File uploads for PDFs, images, and documents",
            "Evidence title and description fields",
            "Automated ZIP bundle generation",
            "Published links for supporting proof",
            "QR verification for certificates and notices",
        ],
    },
    {
        title: "Governance & Security",
        icon: FaShieldAlt,
        items: [
            "Admin-only access for sensitive operations",
            "Audit log support for actions and publishing",
            "Role-ready structure for IQAC / principal / staff",
            "Clear separation between draft and published content",
        ],
    },
    {
        title: "Institutional Pages",
        icon: FaUniversity,
        items: [
            "About, programs, faculty, research, and placements",
            "College-specific pages for policies and disclosures",
            "Dynamic content blocks for quick updates",
            "Easy reuse across multiple campuses or colleges",
        ],
    },
    {
        title: "Business Value",
        icon: FaUsers,
        items: [
            "Turnkey product colleges can purchase and customize",
            "Saves time during accreditation preparation",
            "Improves institutional presentation and credibility",
            "Supports sales as a complete web + workflow solution",
        ],
    },
];

const criteria = [
    ["Institutional Vision, Mission & Goals", "About page, homepage, institutional values"],
    ["Governance, Leadership and Management", "Committees, contact, and admin structure"],
    ["Teaching, Learning and Evaluation", "Programs, academics, syllabus, outcomes"],
    ["Research, Innovation and Extension", "Research projects, publications, patents"],
    ["Infrastructure and Learning Resources", "Campus, library, facilities, media"],
    ["Student Support and Progression", "Placements, scholarships, services"],
    ["Institutional Values and Best Practices", "Policies, disclosures, best practices"],
    ["NBA PEO / PO / CO support", "Programs page and accreditation dashboard"],
];

export default function AccreditationIntelligencePage() {
    const [activeFocus, setActiveFocus] = useState(featureGroups[0].title);
    const activeGroup = useMemo(() => featureGroups.find((group) => group.title === activeFocus) || featureGroups[0], [activeFocus]);
    const ActiveIcon = activeGroup.icon;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
                <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
                    <p className="text-xs uppercase tracking-[0.34em] text-cyan-300">Accreditation Intelligence System for Institutional Excellence</p>
                    <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                        NBA & NAAC compliant web platform with every feature a college needs.
                    </h1>
                    <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">
                        This platform combines a public institutional website, criterion-wise accreditation evidence, admin publishing controls, auditability, and exportable submission bundles.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/admin/accreditation-dashboard">
                            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-3 font-bold text-blue-950 shadow-lg transition hover:bg-yellow-300 cursor-pointer">
                                Open Accreditation Dashboard <FaArrowRight />
                            </span>
                        </Link>
                        <Link href="/">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15 cursor-pointer">
                                Back to website
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-4 md:px-8">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Feature spotlight</p>
                            <h2 className="mt-2 text-2xl font-bold text-slate-950">Pick a module to preview how the platform feels.</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {featureGroups.map((group) => (
                                <button
                                    key={group.title}
                                    type="button"
                                    onClick={() => setActiveFocus(group.title)}
                                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeFocus === group.title ? "bg-blue-950 text-white shadow" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                                >
                                    {group.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                        <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                                    <ActiveIcon />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Selected module</p>
                                    <h3 className="text-xl font-bold">{activeGroup.title}</h3>
                                </div>
                            </div>
                            <div className="mt-5 space-y-3 text-sm leading-7 text-white/80">
                                {activeGroup.items.map((item) => (
                                    <div key={item} className="flex gap-3 rounded-2xl bg-white/5 px-4 py-3">
                                        <FaRegDotCircle className="mt-1 shrink-0 text-cyan-300" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                ["Admin-ready", "Non-technical staff can edit and publish content."],
                                ["Submission focused", "Evidence can be exported into one bundle."],
                                ["Interactive", "Hover cards, progress, and live-state UI."],
                                ["Sales-friendly", "Looks like a real institutional product."],
                            ].map(([title, desc]) => (
                                <div key={title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                                    <p className="font-bold text-slate-900">{title}</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {featureGroups.map((group) => {
                        const Icon = group.icon;
                        return (
                            <div key={group.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-950 text-white">
                                        <Icon />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">{group.title}</h2>
                                        <p className="text-sm text-slate-500">One module in the platform</p>
                                    </div>
                                </div>
                                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                                    {group.items.map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <FaCheckCircle className="mt-1 shrink-0 text-emerald-500" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 md:px-8">
                    <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
                        <div className="rounded-[1.75rem] bg-slate-950 p-8 text-white shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
                            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">NAAC / NBA Mapping</p>
                            <h2 className="mt-4 text-3xl font-bold">Mapped to the criteria colleges usually need to show.</h2>
                            <div className="mt-6 space-y-4">
                                {criteria.map(([name, support]) => (
                                    <div key={name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <p className="font-semibold text-white">{name}</p>
                                        <p className="mt-1 text-sm leading-6 text-white/70">{support}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Automatic bundle</p>
                            <h2 className="mt-4 text-3xl font-bold text-slate-900">Generate a submission package automatically.</h2>
                            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
                                <p>Use the export endpoint to package published settings, records, and local uploads into one ZIP file.</p>
                                <p>The bundle gives colleges a neat evidence archive for internal review or accreditation submission preparation.</p>
                                <p>Because the content is editable, any college can brand the site, update the evidence, and reuse the same platform year after year.</p>
                            </div>
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                {[
                                    "ZIP export",
                                    "JSON evidence records",
                                    "File attachments",
                                    "Published website state",
                                ].map((item) => (
                                    <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-800 shadow-sm">{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
                <div className="rounded-[2rem] bg-gradient-to-r from-blue-700 to-indigo-700 p-8 text-white shadow-[0_18px_50px_rgba(29,78,216,0.22)]">
                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">Why colleges buy it</p>

                    <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
                        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Trust layer</p>
                                    <h2 className="mt-2 text-3xl font-bold text-slate-950">QR verification for official documents</h2>
                                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                                        Put QR codes on notices, certificates, and accreditation evidence so anyone can verify them from a public page.
                                    </p>
                                </div>
                                <Link href="/qr-verification">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 cursor-pointer">
                                        Open QR page <FaArrowRight />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </section>
                            <h2 className="mt-4 text-3xl font-bold">A website they can purchase, customize, and use as an accreditation-ready institutional platform.</h2>
                            <p className="mt-4 max-w-3xl text-white/85 leading-7">
                                It is not just a site theme. It is a ready-made college web system with accreditation intelligence, evidence workflows, admin controls, and a professional public presence.
                            </p>
                        </div>
                        <div className="grid gap-3">
                            {[
                                "Editable by college staff",
                                "Fits IQAC and accreditation teams",
                                "Improves institutional presentation",
                                "Can be reused across campuses",
                            ].map((item) => (
                                <div key={item} className="rounded-2xl bg-white/10 px-4 py-3 font-semibold text-white backdrop-blur-sm">{item}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}