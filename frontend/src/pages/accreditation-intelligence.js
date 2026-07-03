import Link from "next/link";
import { FaArrowRight, FaCheckCircle, FaCloudUploadAlt, FaDownload, FaEdit, FaFileExport, FaGlobe, FaShieldAlt, FaSortAmountDownAlt, FaSyncAlt, FaUniversity, FaUsers, FaTasks } from "react-icons/fa";

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