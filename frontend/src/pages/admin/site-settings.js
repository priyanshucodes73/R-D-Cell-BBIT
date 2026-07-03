import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaArrowLeft, FaPlus, FaSave, FaTrash, FaUpload, FaEye, FaBullhorn, FaBars, FaShareAlt, FaImage } from "react-icons/fa";
import { defaultPublicSettings, getApiBase } from "../../lib/siteSettings";
import { fetchWithAuth } from "../../lib/auth";

const homepageTextBlocks = [
  {
    key: "siteName",
    label: "Site Name",
    description: "Logo text shown in the homepage header.",
    section: "branding",
    type: "text",
  },
  {
    key: "appName",
    label: "App Name",
    description: "Name shown to users when they install the PWA/native app.",
    section: "branding",
    type: "text",
  },
  {
    key: "siteLogo",
    label: "Site Logo",
    description: "Primary logo image used in header and PWA. Upload a circular PNG/SVG.",
    section: "branding",
    type: "image",
  },
  {
    key: "appIcon",
    label: "App Icon",
    description: "Icon used for PWA/home-screen; upload a square SVG/PNG. Will be resized to required sizes on publish.",
    section: "branding",
    type: "image",
  },
  {
    key: "topAnnouncement",
    label: "Top Announcement",
    description: "Scrolling/announcement text in the top bar.",
    section: "header",
    type: "text",
  },
  {
    key: "accreditationBanner",
    label: "Accreditation Banner",
    description: "Small rounded banner shown on every page to highlight accreditation system.",
    section: "header",
    type: "text",
  },
  {
    key: "admissionHelpline",
    label: "Admission Helpline",
    description: "Phone numbers displayed in the header.",
    section: "header",
    type: "text",
  },
  {
    key: "heroTitle",
    label: "Hero Title",
    description: "Main hero headline on the homepage.",
    section: "home",
    type: "text",
  },
  {
    key: "heroSubtitle",
    label: "Hero Subtitle",
    description: "Subheading under the hero title.",
    section: "home",
    type: "text",
  },
  {
    key: "aboutTitle",
    label: "About Title",
    description: "Heading for the about section on the homepage.",
    section: "home",
    type: "text",
  },
  {
    key: "aboutBody",
    label: "About Body",
    description: "Body copy for the homepage about section.",
    section: "home",
    type: "text",
  },
];

const listBlocks = [
  {
    key: "upperNavLinks",
    label: "Top Bar Buttons",
    description: "Edit the quick links shown in the top bar.",
    section: "navigation",
    type: "links",
    addLabel: "Add Top Bar Link",
  },
  {
    key: "socialLinks",
    label: "Top Bar Social Buttons",
    description: "Edit the social icons/buttons shown in the top bar.",
    section: "navigation",
    type: "links",
    addLabel: "Add Social Link",
  },
  {
    key: "mainNavLinks",
    label: "Main Navigation",
    description: "Edit the main menu items in the homepage header.",
    section: "navigation",
    type: "links",
    addLabel: "Add Menu Item",
  },
];

const jsonBlocks = [
  {
    key: "researchInnovationPage",
    label: "Research & Development Section",
    description: "Homepage research section content and cards.",
    section: "pages",
    type: "json",
  },
  {
    key: "homePage",
    label: "Homepage Override",
    description: "Use custom HTML to replace the full homepage body.",
    section: "homepage",
    type: "json",
  },
  {
    key: "aboutPage",
    label: "About Page",
    description: "Content for the About page (hero, overview, vision, mission, values).",
    section: "pages",
    type: "json",
  },
  {
    key: "contactPage",
    label: "Contact Page",
    description: "Contact page cards, address, numbers and office hours.",
    section: "pages",
    type: "json",
  },
  {
    key: "admissionsPage",
    label: "Admissions Page",
    description: "Admissions quick links, process and programs.",
    section: "pages",
    type: "json",
  },
  {
    key: "placementsPage",
    label: "Placements Page",
    description: "Placements stats, process and success stories.",
    section: "pages",
    type: "json",
  },
  {
    key: "careerPage",
    label: "Career Page",
    description: "Career page stats and related content.",
    section: "pages",
    type: "json",
  },
  {
    key: "campusLifePage",
    label: "Campus Life Page",
    description: "Campus life hero and stats.",
    section: "pages",
    type: "json",
  },
  {
    key: "campusesPage",
    label: "Campuses Page",
    description: "Campus overview, facilities, accreditations, and contact blocks.",
    section: "pages",
    type: "json",
  },
  {
    key: "clubsPage",
    label: "Clubs Page",
    description: "Student clubs, categories, stats, and spotlight content.",
    section: "pages",
    type: "json",
  },
  {
    key: "innovationEntrepreneurshipPage",
    label: "Innovation & Entrepreneurship",
    description: "Innovation hub, incubation, programs, and success stories.",
    section: "pages",
    type: "json",
  },
  {
    key: "exploreResearchPage",
    label: "Explore Research Page",
    description: "Research journey, labs, and featured research content.",
    section: "pages",
    type: "json",
  },
  {
    key: "internationalPage",
    label: "International Page",
    description: "International student support and mobility content.",
    section: "pages",
    type: "json",
  },
  {
    key: "studentServicesPage",
    label: "Student Services Page",
    description: "Student support, welfare, and service blocks.",
    section: "pages",
    type: "json",
  },
  {
    key: "libraryPage",
    label: "Library Page",
    description: "Library facilities, resources, and services.",
    section: "pages",
    type: "json",
  },
  {
    key: "programsPage",
    label: "Programs Page",
    description: "Programs, course structure, and academic offering blocks.",
    section: "pages",
    type: "json",
  },
  {
    key: "scholarshipPage",
    label: "Scholarship Page",
    description: "Scholarship overview, eligibility, and benefits.",
    section: "pages",
    type: "json",
  },
  {
    key: "educationLoanPage",
    label: "Education Loan Page",
    description: "Loan assistance, partner banks, and criteria.",
    section: "pages",
    type: "json",
  },
  {
    key: "howToApplyPage",
    label: "How to Apply Page",
    description: "Application steps, document checklist, and notes.",
    section: "pages",
    type: "json",
  },
  {
    key: "joinOurTeamPage",
    label: "Join Our Team Page",
    description: "Recruitment, careers, and team listings.",
    section: "pages",
    type: "json",
  },
  {
    key: "loginPage",
    label: "Login Page",
    description: "Login page headings and copy.",
    section: "authentication",
    type: "json",
  },
  {
    key: "registerPage",
    label: "Register Page",
    description: "Registration page headings and labels.",
    section: "authentication",
    type: "json",
  },
  {
    key: "verifyEmailPage",
    label: "Verify Email Page",
    description: "Verification titles, messages, and actions.",
    section: "authentication",
    type: "json",
  },
  {
    key: "slugPages",
    label: "Dynamic Slug Pages",
    description: "Admin-managed fallback content for generic slug routes.",
    section: "advanced",
    type: "json",
  },
];

const sectionLabels = {
  all: "All Sections",
  branding: "Branding",
  header: "Header",
  navigation: "Navigation",
  homepage: "Homepage",
  pages: "Page Content",
  authentication: "Authentication",
  advanced: "Advanced",
};

const heroSlidesKey = "heroSlides";

const blankSlide = {
  image: "",
  title: "",
  subtitle: "",
  ctaLabel: "Read More",
  ctaHref: "/",
};

const blankLink = { name: "", href: "" };

function safeParseJson(value, fallback) {
  if (value == null || value === "") return fallback;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function readSetting(setting, fallback) {
  const raw = setting?.draftValue ?? setting?.publishedValue ?? setting?.value ?? fallback;
  return typeof raw === "string" ? raw : JSON.stringify(raw ?? fallback ?? "");
}

function readList(setting, fallback) {
  const raw = setting?.draftValue ?? setting?.publishedValue ?? setting?.value ?? fallback;
  const parsed = safeParseJson(raw, fallback);
  return Array.isArray(parsed) ? parsed : fallback;
}

function readSlides(setting, fallback) {
  const parsed = safeParseJson(setting?.draftValue ?? setting?.publishedValue ?? setting?.value ?? fallback, fallback);
  return Array.isArray(parsed) && parsed.length ? parsed : fallback;
}

export default function SiteSettingsPage() {
  const router = useRouter();
  const apiBase = getApiBase();
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState(null);
  const [settings, setSettings] = useState([]);
  const [heroSlidesDraft, setHeroSlidesDraft] = useState(defaultPublicSettings.heroSlides);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [activeSection, setActiveSection] = useState("all");

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("adminToken")) {
      router.push("/admin/login");
      return;
    }
    fetchSettings();
  }, []);

  const settingMap = useMemo(() => {
    return settings.reduce((acc, setting) => {
      acc[setting.key] = setting;
      return acc;
    }, {});
  }, [settings]);

  const fetchSettings = async () => {
    try {
      const response = await fetchWithAuth("/api/site-settings/admin");
      if (!response.ok) throw new Error("Failed to fetch settings");
      const data = await response.json();
      const list = Array.isArray(data) ? data : [];
      setSettings(list);
      setHeroSlidesDraft(readSlides(list.find((item) => item.key === heroSlidesKey), defaultPublicSettings.heroSlides));
    } catch (error) {
      console.error("Error fetching site settings:", error);
      alert("Failed to fetch site settings");
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = async (key, draftValue, meta = {}) => {
    setSavingKey(key);
    try {
      const response = await fetchWithAuth(`/api/site-settings/${encodeURIComponent(key)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          draftValue,
          section: meta.section,
          description: meta.description,
          type: meta.type,
          isPublic: true,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save draft");
      }

      await fetchSettings();
      alert(`Saved draft: ${key}`);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to save draft");
    } finally {
      setSavingKey(null);
    }
  };

  const publishNow = async (key) => {
    setSavingKey(key);
    try {
      const response = await fetchWithAuth(`/api/site-settings/${encodeURIComponent(key)}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to publish");
      }
      await fetchSettings();
      alert(`Published: ${key}`);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to publish");
    } finally {
      setSavingKey(null);
    }
  };

  const uploadMedia = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetchWithAuth("/api/uploads", { method: "POST", body: formData });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Upload failed");
    }
    const data = await response.json();
    return data.url;
  };

  const updateHeroSlide = (index, field, value) => {
    setHeroSlidesDraft((current) => current.map((slide, slideIndex) => (slideIndex === index ? { ...slide, [field]: value } : slide)));
  };

  const addHeroSlide = () => setHeroSlidesDraft((current) => [...current, { ...blankSlide }]);
  const removeHeroSlide = (index) => setHeroSlidesDraft((current) => current.filter((_, slideIndex) => slideIndex !== index));

  const saveHeroSlides = async () => {
    await saveDraft(heroSlidesKey, JSON.stringify(heroSlidesDraft), {
      section: "homepage",
      description: "Homepage hero slider images and copy.",
      type: "json",
    });
  };

  const publishHeroSlides = async () => {
    await saveHeroSlides();
    await publishNow(heroSlidesKey);
  };

  const homepagePreview = {
    siteName: readSetting(settingMap.siteName, defaultPublicSettings.siteName),
    siteLogo: readSetting(settingMap.siteLogo, defaultPublicSettings.siteLogo || "/icons/bbit-logo-circle.svg"),
    topAnnouncement: readSetting(settingMap.topAnnouncement, defaultPublicSettings.topAnnouncement),
    accreditationBanner: readSetting(settingMap.accreditationBanner, defaultPublicSettings.accreditationBanner),
    admissionHelpline: readSetting(settingMap.admissionHelpline, defaultPublicSettings.admissionHelpline),
    heroTitle: readSetting(settingMap.heroTitle, defaultPublicSettings.heroTitle),
    heroSubtitle: readSetting(settingMap.heroSubtitle, defaultPublicSettings.heroSubtitle),
    aboutTitle: readSetting(settingMap.aboutTitle, defaultPublicSettings.aboutTitle),
    aboutBody: readSetting(settingMap.aboutBody, defaultPublicSettings.aboutBody),
    upperNavLinks: readList(settingMap.upperNavLinks, defaultPublicSettings.upperNavLinks),
    socialLinks: readList(settingMap.socialLinks, defaultPublicSettings.socialLinks),
    mainNavLinks: readList(settingMap.mainNavLinks, defaultPublicSettings.mainNavLinks),
    heroSlides: heroSlidesDraft,
  };

  const filteredHomepageTextBlocks = homepageTextBlocks.filter((block) => activeSection === "all" || block.section === activeSection);
  const filteredListBlocks = listBlocks.filter((block) => activeSection === "all" || block.section === activeSection);
  const filteredJsonBlocks = jsonBlocks.filter((block) => activeSection === "all" || block.section === activeSection);

  const sectionCounts = ["all", "branding", "header", "navigation", "homepage", "pages", "authentication", "advanced"].reduce((acc, key) => {
    const total = [...homepageTextBlocks, ...listBlocks, ...jsonBlocks].filter((block) => key === "all" || block.section === key).length;
    acc[key] = total;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="h-16 w-16 rounded-full border-b-2 border-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <button className="p-3 bg-white rounded-lg shadow hover:bg-gray-50">
                <FaArrowLeft />
              </button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Homepage Editor</h1>
              <p className="text-gray-600">Everything here updates the main homepage after publish. The homepage refreshes automatically.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow">
            <FaEye /> Live preview enabled
          </div>
        </div>

        <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-2xl overflow-hidden border border-white/10">
          <div className="grid lg:grid-cols-[1.3fr_.9fr]">
            <div className="p-8 lg:p-10 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90">
                <FaBars className="text-blue-300" /> Content control center
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight">Control the whole public website from one place</h2>
              <p className="text-white/75 max-w-2xl">
                Edit headers, page sections, authentication copy, and structured content blocks with draft and publish controls. Use the section filters to move faster.
              </p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(sectionLabels).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveSection(key)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeSection === key ? "bg-white text-slate-900 shadow" : "bg-white/10 text-white hover:bg-white/20"}`}
                  >
                    {label}
                    <span className="ml-2 rounded-full bg-black/20 px-2 py-0.5 text-xs">{sectionCounts[key]}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border-t lg:border-t-0 lg:border-l border-white/10 p-8 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="text-white/60 mb-1">Homepage blocks</div>
                  <div className="text-2xl font-bold">{homepageTextBlocks.length + listBlocks.length + jsonBlocks.filter((block) => block.section === "homepage").length}</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="text-white/60 mb-1">Page groups</div>
                  <div className="text-2xl font-bold">{jsonBlocks.filter((block) => block.section === "pages").length}</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="text-white/60 mb-1">Auth screens</div>
                  <div className="text-2xl font-bold">{jsonBlocks.filter((block) => block.section === "authentication").length}</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="text-white/60 mb-1">Advanced</div>
                  <div className="text-2xl font-bold">{jsonBlocks.filter((block) => block.section === "advanced").length}</div>
                </div>
              </div>
              <div className="rounded-2xl bg-black/20 p-4 text-sm text-white/75">
                Publish flow: save draft first, then publish the change. Public pages update automatically after publish.
              </div>
            </div>
          </div>
        </section>

        <div className="grid xl:grid-cols-[1.4fr_.9fr] gap-6 items-start">
          <div className="space-y-6">
            <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Top Bar and Header</h2>
                  <p className="text-gray-600">Edit the announcement, helpline, site name, social buttons, and top navigation buttons.</p>
                </div>
                <FaBullhorn className="text-3xl text-blue-600" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {filteredHomepageTextBlocks.map((block) => (
                  block.type === 'image' ? (
                    <ImageSettingCard
                      key={block.key}
                      block={block}
                      setting={settingMap[block.key]}
                      defaultValue={defaultPublicSettings[block.key]}
                      saving={savingKey === block.key}
                      onSave={saveDraft}
                      onPublish={publishNow}
                      uploadMedia={uploadMedia}
                    />
                  ) : (
                    <TextSettingCard
                      key={block.key}
                      block={block}
                      setting={settingMap[block.key]}
                      defaultValue={defaultPublicSettings[block.key]}
                      saving={savingKey === block.key}
                      onSave={saveDraft}
                      onPublish={publishNow}
                    />
                  )
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-4 mt-6">
                {filteredListBlocks.map((block) => (
                  <LinkSettingCard
                    key={block.key}
                    block={block}
                    setting={settingMap[block.key]}
                    defaultValue={defaultPublicSettings[block.key]}
                    saving={savingKey === block.key}
                    onSave={saveDraft}
                    onPublish={publishNow}
                  />
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{sectionLabels[activeSection] || "Section Content"}</h2>
                  <p className="text-gray-600">These blocks render directly on the public site and can be published independently.</p>
                </div>
                <FaBars className="text-3xl text-violet-600" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {filteredJsonBlocks.map((block) => (
                  block.key === "researchInnovationPage" ? (
                    <ResearchPageEditor
                      key={block.key}
                      block={block}
                      setting={settingMap[block.key]}
                      defaultValue={defaultPublicSettings[block.key]}
                      saving={savingKey === block.key}
                      onSave={saveDraft}
                      onPublish={publishNow}
                      uploadMedia={uploadMedia}
                    />
                  ) : block.key === "slugPages" ? (
                    <SlugPagesEditor
                      key={block.key}
                      block={block}
                      setting={settingMap[block.key]}
                      defaultValue={defaultPublicSettings[block.key]}
                      saving={savingKey === block.key}
                      onSave={saveDraft}
                      onPublish={publishNow}
                    />
                  ) : block.key && block.key.endsWith("Page") ? (
                    <GenericPageEditor
                      key={block.key}
                      block={block}
                      setting={settingMap[block.key]}
                      defaultValue={defaultPublicSettings[block.key]}
                      saving={savingKey === block.key}
                      onSave={saveDraft}
                      onPublish={publishNow}
                      uploadMedia={uploadMedia}
                    />
                  ) : (
                    <JsonSettingCard
                      key={block.key}
                      block={block}
                      setting={settingMap[block.key]}
                      defaultValue={defaultPublicSettings[block.key]}
                      saving={savingKey === block.key}
                      onSave={saveDraft}
                      onPublish={publishNow}
                    />
                  )
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 space-y-5">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Hero Slider Images</h2>
                  <p className="text-gray-600">Upload new images, edit captions, and publish slides. The homepage pulls updates automatically.</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={saveHeroSlides}
                    disabled={savingKey === heroSlidesKey}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    <FaSave /> Save Draft
                  </button>
                  <button
                    type="button"
                    onClick={publishHeroSlides}
                    disabled={savingKey === heroSlidesKey}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
                  >
                    Publish Slides
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                {heroSlidesDraft.map((slide, index) => (
                  <div key={`${slide.title || "slide"}-${index}`} className="rounded-2xl border bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">Slide {index + 1}</h3>
                        <p className="text-xs text-gray-500">Edit the image and CTA used in the homepage carousel.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeHeroSlide(index)}
                        className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm"
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>

                    <div className="grid lg:grid-cols-[230px_1fr] gap-4">
                      <div className="space-y-3">
                        <div className="aspect-[4/3] rounded-xl bg-white border overflow-hidden flex items-center justify-center shadow-inner">
                          {slide.image ? (
                            <img src={slide.image} alt={slide.title || `Slide ${index + 1}`} className="h-full w-full object-cover" />
                          ) : (
                            <div className="text-center text-gray-400 px-4">
                              <FaImage className="mx-auto mb-2 text-2xl" />
                              No image selected
                            </div>
                          )}
                        </div>
                        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border cursor-pointer hover:bg-gray-50 text-sm font-medium w-full justify-center">
                          <FaUpload /> {uploadingIndex === index ? "Uploading..." : "Upload Image"}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={uploadingIndex === index}
                            onChange={async (e) => {
                              const file = e.target.files?.[0] || null;
                              if (!file) return;
                              try {
                                setUploadingIndex(index);
                                const url = await uploadMedia(file);
                                updateHeroSlide(index, "image", url);
                              } catch (error) {
                                alert(error.message || "Failed to upload image");
                              } finally {
                                setUploadingIndex(null);
                              }
                            }}
                          />
                        </label>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <InputField label="Image URL" value={slide.image || ""} onChange={(value) => updateHeroSlide(index, "image", value)} placeholder="/slides/hero-1.jpg" />
                        <InputField label="Title" value={slide.title || ""} onChange={(value) => updateHeroSlide(index, "title", value)} placeholder="Slide title" />
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                          <textarea
                            rows="3"
                            value={slide.subtitle || ""}
                            onChange={(e) => updateHeroSlide(index, "subtitle", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <InputField label="CTA Label" value={slide.ctaLabel || ""} onChange={(value) => updateHeroSlide(index, "ctaLabel", value)} placeholder="Read More" />
                        <InputField label="CTA Link" value={slide.ctaHref || ""} onChange={(value) => updateHeroSlide(index, "ctaHref", value)} placeholder="/innovation-entrepreneurship" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setHeroSlidesDraft((current) => [...current, { ...blankSlide }])}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
              >
                <FaPlus /> Add Slide
              </button>
            </section>
          </div>

          <aside className="space-y-6 sticky top-6">
            <section className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold text-lg">
                <FaEye className="text-blue-600" /> Live Homepage Preview
              </div>
              <div className="rounded-2xl overflow-hidden border bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white">
                <div className="px-4 py-3 text-xs bg-black/20 flex items-center justify-between">
                  <span>{homepagePreview.topAnnouncement}</span>
                  <span>{homepagePreview.admissionHelpline}</span>
                </div>
                <div className="px-4 py-3 border-t border-white/10 bg-white/5">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 overflow-hidden shadow-sm">
                      <img src={homepagePreview.siteLogo || '/icons/bbit-logo-circle.svg'} alt="logo" className="h-12 w-12 object-contain rounded-full" />
                    </div>
                    <div className="max-w-full rounded-full bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-900 shadow-lg">
                      <span className="block truncate max-w-[48ch]">{homepagePreview.accreditationBanner}</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-4 flex items-center justify-between gap-4 border-t border-white/10">
                  <div>
                    <div className="text-lg font-extrabold">{homepagePreview.siteName}</div>
                    <div className="text-xs text-white/75">Research & Development</div>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2 text-[11px]">
                    {homepagePreview.upperNavLinks.slice(0, 4).map((item) => (
                      <span key={item.name} className="px-2 py-1 rounded-full bg-white/10">{item.name}</span>
                    ))}
                  </div>
                </div>
                <div className="px-4 py-6 border-t border-white/10">
                  <div className="text-2xl font-bold leading-tight">{homepagePreview.heroTitle}</div>
                  <div className="mt-2 text-sm text-white/80">{homepagePreview.heroSubtitle}</div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {homepagePreview.mainNavLinks.slice(0, 6).map((item) => (
                      <span key={item.name} className="px-2 py-1 rounded-full bg-yellow-400/20 text-yellow-100">{item.name}</span>
                    ))}
                  </div>
                </div>
                <div className="px-4 py-4 border-t border-white/10 bg-black/15 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/65">
                    <FaShareAlt /> Top Bar Buttons
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {homepagePreview.upperNavLinks.map((item) => (
                      <span key={item.name} className="px-2 py-1 rounded-full bg-white/10 text-[11px]">{item.name}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/65">
                    Social Buttons
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {homepagePreview.socialLinks.map((item) => (
                      <span key={item.name} className="px-2 py-1 rounded-full bg-white/10 text-[11px]">{item.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">What updates live?</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Main homepage hero text and carousel images</li>
                <li>• Top announcement and admission helpline</li>
                <li>• Top bar buttons, social links, and main navigation</li>
                <li>• Sectioned page content, auth screen copy, and slug fallbacks</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">Published changes appear on the public homepage automatically within a few seconds.</p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

function TextSettingCard({ block, setting, defaultValue, saving, onSave, onPublish }) {
  const [draft, setDraft] = useState("");

  useEffect(() => {
    setDraft(readSetting(setting, defaultValue));
  }, [setting, defaultValue]);

  const save = async () => {
    await onSave(block.key, draft, {
      section: block.section,
      description: block.description,
      type: block.type,
    });
  };

  return (
    <div className="rounded-2xl border bg-gray-50 p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{block.label}</h3>
          <p className="text-xs text-gray-500">{block.description}</p>
        </div>
      </div>
      <textarea
        rows="3"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
      <div className="flex gap-3 flex-wrap mt-3">
        <button type="button" onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
          <FaSave /> {saving ? "Saving..." : "Save Draft"}
        </button>
        <button type="button" onClick={async () => { await save(); await onPublish(block.key); }} disabled={saving} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60">
          Publish
        </button>
      </div>
    </div>
  );
}

function LinkSettingCard({ block, setting, defaultValue, saving, onSave, onPublish }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(readList(setting, defaultValue).map((item) => ({ ...item })));
  }, [setting, defaultValue]);

  const save = async () => {
    const normalized = items.map((item) => ({
      name: item.name || "",
      href: item.href || "",
      ...(Array.isArray(item.menu) && item.menu.length ? { menu: item.menu } : {}),
    }));
    await onSave(block.key, JSON.stringify(normalized), {
      section: block.section,
      description: block.description,
      type: "json",
    });
  };

  const updateItem = (index, field, value) => {
    setItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)));
  };

  return (
    <div className="rounded-2xl border bg-gray-50 p-4 lg:col-span-1">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{block.label}</h3>
          <p className="text-xs text-gray-500">{block.description}</p>
        </div>
      </div>
      <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
        {items.map((item, index) => (
          <div key={`${block.key}-${index}`} className="rounded-xl border bg-white p-3 space-y-3">
            <div className="grid grid-cols-1 gap-2">
              <InputField label="Label" value={item.name || ""} onChange={(value) => updateItem(index, "name", value)} placeholder="HOME" />
              <InputField label="Link" value={item.href || ""} onChange={(value) => updateItem(index, "href", value)} placeholder="/home" />
            </div>
            <button type="button" onClick={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm">
              <FaTrash /> Remove
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-3 flex-wrap mt-3">
        <button type="button" onClick={() => setItems((current) => [...current, { ...blankLink }])} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:bg-gray-50">
          <FaPlus /> {block.addLabel}
        </button>
        <button type="button" onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
          <FaSave /> {saving ? "Saving..." : "Save Draft"}
        </button>
        <button type="button" onClick={async () => { await save(); await onPublish(block.key); }} disabled={saving} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60">
          Publish
        </button>
      </div>
    </div>
  );
}

function ImageSettingCard({ block, setting, defaultValue, saving, onSave, onPublish, uploadMedia }) {
  const [url, setUrl] = useState("")
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    setUrl(readSetting(setting, defaultValue))
  }, [setting, defaultValue])

  const save = async () => {
    await onSave(block.key, url, { section: block.section, description: block.description, type: 'image' })
  }

  const handleFile = async (file) => {
    if (!file) return
    try {
      setUploading(true)
      const uploaded = await uploadMedia(file)
      setUrl(uploaded)
    } catch (err) {
      alert(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="rounded-2xl border bg-gray-50 p-4 lg:col-span-1">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{block.label}</h3>
          <p className="text-xs text-gray-500">{block.description}</p>
        </div>
      </div>

      <div className="mb-3">
        <div className="h-24 w-24 rounded-full bg-white overflow-hidden border flex items-center justify-center">
          {url ? <img src={url} alt="logo" className="h-full w-full object-contain" /> : <div className="text-xs text-gray-400">No logo</div>}
        </div>
      </div>

      <div className="flex gap-3">
        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border cursor-pointer hover:bg-gray-50 text-sm font-medium">
          <FaUpload /> {uploading ? 'Uploading...' : 'Upload Logo'}
          <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => handleFile(e.target.files?.[0])} />
        </label>
        <button type="button" onClick={save} disabled={saving || uploading} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
          <FaSave /> {saving ? 'Saving...' : 'Save Draft'}
        </button>
        <button type="button" onClick={async () => { await save(); await onPublish(block.key); }} disabled={saving || uploading} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60">
          Publish
        </button>
      </div>
    </div>
  )
}

function JsonSettingCard({ block, setting, defaultValue, saving, onSave, onPublish }) {
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const value = setting?.draftValue ?? setting?.publishedValue ?? setting?.value ?? defaultValue;
    try {
      const parsed = typeof value === "string" ? JSON.parse(value) : value;
      setDraft(JSON.stringify(parsed ?? defaultValue ?? {}, null, 2));
    } catch {
      setDraft(typeof value === "string" ? value : JSON.stringify(value ?? defaultValue ?? {}, null, 2));
    }
  }, [setting, defaultValue]);

  const save = async () => {
    try {
      const parsed = JSON.parse(draft);
      await onSave(block.key, JSON.stringify(parsed), {
        section: block.section,
        description: block.description,
        type: block.type,
      });
    } catch {
      alert("Invalid JSON");
    }
  };

  return (
    <div className="rounded-2xl border bg-gray-50 p-4 md:col-span-2">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{block.label}</h3>
          <p className="text-xs text-gray-500">{block.description}</p>
        </div>
      </div>
      <textarea
        rows="14"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500"
      />
      <div className="flex gap-3 flex-wrap mt-3">
        <button type="button" onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
          <FaSave /> {saving ? "Saving..." : "Save Draft"}
        </button>
        <button type="button" onClick={async () => { await save(); await onPublish(block.key); }} disabled={saving} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60">
          Publish
        </button>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}

function ResearchPageEditor({ block, setting, defaultValue, saving, onSave, onPublish, uploadMedia }) {
  const [draft, setDraft] = useState(() => safeParseJson(setting?.draftValue ?? setting?.publishedValue ?? setting?.value ?? defaultValue, defaultValue));
  const [uploading, setUploading] = useState({});

  useEffect(() => {
    setDraft(safeParseJson(setting?.draftValue ?? setting?.publishedValue ?? setting?.value ?? defaultValue, defaultValue));
  }, [setting, defaultValue]);

  const update = (path, value) => {
    setDraft((d) => {
      const copy = JSON.parse(JSON.stringify(d || {}));
      const parts = path.split(".");
      let cur = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        cur[p] = cur[p] || {};
        cur = cur[p];
      }
      cur[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  const save = async () => {
    await onSave(block.key, JSON.stringify(draft), { section: block.section, description: block.description, type: block.type });
  };

  const publish = async () => {
    await save();
    await onPublish(block.key);
  };

  // helpers for arrays
  const updateArrayItem = (arrayKey, index, field, value) => {
    setDraft((d) => {
      const copy = JSON.parse(JSON.stringify(d || {}));
      copy[arrayKey] = copy[arrayKey] || [];
      copy[arrayKey][index] = { ...(copy[arrayKey][index] || {}), [field]: value };
      return copy;
    });
  };

  const uploadForArray = async (arrayKey, index, field, file) => {
    if (!file) return;
    try {
      setUploading((u) => ({ ...u, [`${arrayKey}-${index}-${field}`]: true }));
      const url = await uploadMedia(file);
      updateArrayItem(arrayKey, index, field, url);
    } catch (err) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading((u) => ({ ...u, [`${arrayKey}-${index}-${field}`]: false }));
    }
  };

  const addArrayItem = (arrayKey, template) => setDraft((d) => {
    const copy = JSON.parse(JSON.stringify(d || {}));
    copy[arrayKey] = copy[arrayKey] || [];
    copy[arrayKey].push(template);
    return copy;
  });

  const removeArrayItem = (arrayKey, index) => setDraft((d) => {
    const copy = JSON.parse(JSON.stringify(d || {}));
    copy[arrayKey] = copy[arrayKey] || [];
    copy[arrayKey].splice(index, 1);
    return copy;
  });

  const stats = draft?.researchStats || [];
  const centers = draft?.researchCenters || [];
  const funding = draft?.fundingSources || [];
  const patents = draft?.patents || [];
  const programs = draft?.innovationPrograms || [];

  return (
    <div className="rounded-2xl border bg-gray-50 p-4 md:col-span-2">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{block.label}</h3>
          <p className="text-xs text-gray-500">Edit research page blocks with friendly controls.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Research Stats</div>
            <button onClick={() => addArrayItem('researchStats', { label: 'New Stat', value: '0' })} className="text-sm text-blue-600">Add</button>
          </div>
          <div className="space-y-2">
            {stats.map((s, i) => (
              <div key={`stat-${i}`} className="flex gap-2">
                <InputField label="Label" value={s.label || ''} onChange={(v) => updateArrayItem('researchStats', i, 'label', v)} />
                <InputField label="Value" value={s.value || ''} onChange={(v) => updateArrayItem('researchStats', i, 'value', v)} />
                <button type="button" onClick={() => removeArrayItem('researchStats', i)} className="text-red-600">Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Research Centers</div>
            <button onClick={() => addArrayItem('researchCenters', { name: 'New Center', head: '', focus: '', projects: 0, publications: 0, funding: '' })} className="text-sm text-blue-600">Add</button>
          </div>
          <div className="space-y-2">
            {centers.map((c, i) => (
              <div key={`center-${i}`} className="rounded-xl border bg-white p-3 space-y-2">
                <InputField label="Name" value={c.name || ''} onChange={(v) => updateArrayItem('researchCenters', i, 'name', v)} />
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2">
                    {c.image ? <img src={c.image} alt={c.name} className="h-12 w-12 object-cover rounded" /> : <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center text-sm">No Img</div>}
                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border cursor-pointer hover:bg-gray-50 text-sm font-medium">
                      Upload Image
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadForArray('researchCenters', i, 'image', e.target.files?.[0])} />
                    </label>
                  </div>
                </div>
                <InputField label="Head" value={c.head || ''} onChange={(v) => updateArrayItem('researchCenters', i, 'head', v)} />
                <InputField label="Focus" value={c.focus || ''} onChange={(v) => updateArrayItem('researchCenters', i, 'focus', v)} />
                <div className="grid md:grid-cols-2 gap-2">
                  <InputField label="Projects" value={String(c.projects || '')} onChange={(v) => updateArrayItem('researchCenters', i, 'projects', parseInt(v || '0'))} />
                  <InputField label="Publications" value={String(c.publications || '')} onChange={(v) => updateArrayItem('researchCenters', i, 'publications', parseInt(v || '0'))} />
                </div>
                <InputField label="Funding" value={c.funding || ''} onChange={(v) => updateArrayItem('researchCenters', i, 'funding', v)} />
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={!!c.featured} onChange={(e) => updateArrayItem('researchCenters', i, 'featured', e.target.checked)} />
                    <span className="text-xs">Featured on homepage</span>
                  </label>
                </div>
                <button type="button" onClick={() => removeArrayItem('researchCenters', i)} className="text-red-600">Remove Center</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Funding Sources</div>
            <button onClick={() => addArrayItem('fundingSources', { name: 'New Source', projects: 0, amount: '' })} className="text-sm text-blue-600">Add</button>
          </div>
          <div className="space-y-2">
            {funding.map((f, i) => (
              <div key={`fund-${i}`} className="flex gap-2 items-center">
                <InputField label="Name" value={f.name || ''} onChange={(v) => updateArrayItem('fundingSources', i, 'name', v)} />
                <InputField label="Projects" value={String(f.projects || '')} onChange={(v) => updateArrayItem('fundingSources', i, 'projects', parseInt(v || '0'))} />
                <InputField label="Amount" value={f.amount || ''} onChange={(v) => updateArrayItem('fundingSources', i, 'amount', v)} />
                <button type="button" onClick={() => removeArrayItem('fundingSources', i)} className="text-red-600">Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Recent Patents</div>
            <button onClick={() => addArrayItem('patents', { title: 'New Patent', inventors: '', number: '', status: '', year: new Date().getFullYear() })} className="text-sm text-blue-600">Add</button>
          </div>
          <div className="space-y-2">
            {patents.map((p, i) => (
              <div key={`pat-${i}`} className="rounded-xl border bg-white p-3 space-y-2">
                <InputField label="Title" value={p.title || ''} onChange={(v) => updateArrayItem('patents', i, 'title', v)} />
                <InputField label="Inventors" value={p.inventors || ''} onChange={(v) => updateArrayItem('patents', i, 'inventors', v)} />
                <div className="grid md:grid-cols-2 gap-2">
                  <InputField label="Number" value={p.number || ''} onChange={(v) => updateArrayItem('patents', i, 'number', v)} />
                  <InputField label="Year" value={String(p.year || '')} onChange={(v) => updateArrayItem('patents', i, 'year', parseInt(v || new Date().getFullYear()))} />
                </div>
                <InputField label="Status" value={p.status || ''} onChange={(v) => updateArrayItem('patents', i, 'status', v)} />
                <button type="button" onClick={() => removeArrayItem('patents', i)} className="text-red-600">Remove Patent</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Innovation Programs</div>
            <button onClick={() => addArrayItem('innovationPrograms', { name: 'New Program', description: '', capacity: '', icon: '' })} className="text-sm text-blue-600">Add</button>
          </div>
          <div className="space-y-2">
            {programs.map((pr, i) => (
              <div key={`prog-${i}`} className="rounded-xl border bg-white p-3 space-y-2">
                <InputField label="Name" value={pr.name || ''} onChange={(v) => updateArrayItem('innovationPrograms', i, 'name', v)} />
                <div className="flex items-center gap-2">
                  {pr.image ? <img src={pr.image} alt={pr.name} className="h-12 w-12 object-cover rounded" /> : <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center text-sm">No Img</div>}
                  <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border cursor-pointer hover:bg-gray-50 text-sm font-medium">
                    Upload Image
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadForArray('innovationPrograms', i, 'image', e.target.files?.[0])} />
                  </label>
                </div>
                <InputField label="Capacity/Info" value={pr.capacity || ''} onChange={(v) => updateArrayItem('innovationPrograms', i, 'capacity', v)} />
                <textarea rows={3} value={pr.description || ''} onChange={(e) => updateArrayItem('innovationPrograms', i, 'description', e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={!!pr.featured} onChange={(e) => updateArrayItem('innovationPrograms', i, 'featured', e.target.checked)} />
                    <span className="text-xs">Featured on homepage</span>
                  </label>
                </div>
                <button type="button" onClick={() => removeArrayItem('innovationPrograms', i)} className="text-red-600">Remove Program</button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-3">
          <button type="button" onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
            <FaSave /> {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button type="button" onClick={publish} disabled={saving} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60">Publish</button>
        </div>
      </div>
    </div>
  );
}

function GenericPageEditor({ block, setting, defaultValue, saving, onSave, onPublish, uploadMedia }) {
  const [draft, setDraft] = useState(() => safeParseJson(setting?.draftValue ?? setting?.publishedValue ?? setting?.value ?? defaultValue, defaultValue));
  const [uploading, setUploading] = useState({});

  useEffect(() => {
    setDraft(safeParseJson(setting?.draftValue ?? setting?.publishedValue ?? setting?.value ?? defaultValue, defaultValue));
  }, [setting, defaultValue]);

  const updateField = (path, value) => {
    setDraft((d) => {
      const copy = JSON.parse(JSON.stringify(d || {}));
      const parts = path.split(".");
      let cur = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        cur[p] = cur[p] || {};
        cur = cur[p];
      }
      cur[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  const updateArrayItem = (arrayKey, index, field, value) => {
    setDraft((d) => {
      const copy = JSON.parse(JSON.stringify(d || {}));
      copy[arrayKey] = copy[arrayKey] || [];
      copy[arrayKey][index] = { ...(copy[arrayKey][index] || {}), [field]: value };
      return copy;
    });
  };

  const uploadForArray = async (arrayKey, index, field, file) => {
    if (!file) return;
    try {
      setUploading((u) => ({ ...u, [`${arrayKey}-${index}-${field}`]: true }));
      const url = await uploadMedia(file);
      updateArrayItem(arrayKey, index, field, url);
    } catch (err) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading((u) => ({ ...u, [`${arrayKey}-${index}-${field}`]: false }));
    }
  };

  const addArrayItem = (arrayKey, item) => setDraft((d) => {
    const copy = JSON.parse(JSON.stringify(d || {}));
    copy[arrayKey] = copy[arrayKey] || [];
    copy[arrayKey].push(item);
    return copy;
  });

  const removeArrayItem = (arrayKey, index) => setDraft((d) => {
    const copy = JSON.parse(JSON.stringify(d || {}));
    copy[arrayKey] = copy[arrayKey] || [];
    copy[arrayKey].splice(index, 1);
    return copy;
  });

  const save = async () => {
    await onSave(block.key, JSON.stringify(draft), { section: block.section, description: block.description, type: block.type });
  };

  const publish = async () => {
    await save();
    await onPublish(block.key);
  };

  // helpers for specific arrays
  const overview = draft?.overview || [];
  const values = draft?.values || [];
  const cards = draft?.cards || [];
  const quickLinks = draft?.quickLinks || draft?.quickLinks || [];
  const process = draft?.process || [];
  const programs = draft?.programs || [];
  const placementStats = draft?.placementStats || [];
  const successStories = draft?.successStories || [];
  const pageContentHtml = draft?.pageContentHtml || "";

  return (
    <div className="rounded-2xl border bg-gray-50 p-4 md:col-span-2">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{block.label}</h3>
          <p className="text-xs text-gray-500">Edit page content with structured controls. Unknown fields available as JSON at the bottom.</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Hero */}
        <div>
          <div className="font-medium mb-2">Hero</div>
          <InputField label="Hero Title" value={draft?.heroTitle || ''} onChange={(v) => updateField('heroTitle', v)} />
          <div className="mt-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Subtitle</label>
            <textarea rows={2} value={draft?.heroSubtitle || ''} onChange={(e) => updateField('heroSubtitle', e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>
        </div>

        {/* Overview */}
        {Array.isArray(overview) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Overview</div>
              <button onClick={() => addArrayItem('overview', 'New paragraph')} className="text-sm text-blue-600">Add</button>
            </div>
            <div className="space-y-2">
              {overview.map((p, i) => (
                <div key={`ov-${i}`} className="flex gap-2 items-start">
                  <textarea rows={2} value={p || ''} onChange={(e) => updateArrayItem('overview', i, null, e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                  <button type="button" onClick={() => removeArrayItem('overview', i)} className="text-red-600">Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="font-medium mb-2">Full Page Override</div>
          <p className="text-xs text-gray-500 mb-2">Use this when you want the public page to render a custom HTML layout instead of the default structured sections.</p>
          <textarea
            rows={10}
            value={pageContentHtml}
            onChange={(e) => updateField('pageContentHtml', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
            placeholder="<h2>Custom page content</h2><p>...</p>"
          />
        </div>

        {/* Values (title + desc) */}
        {Array.isArray(values) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Values</div>
              <button onClick={() => addArrayItem('values', { title: 'New', desc: '' })} className="text-sm text-blue-600">Add</button>
            </div>
            <div className="space-y-2">
              {values.map((v, i) => (
                <div key={`val-${i}`} className="rounded-xl border bg-white p-3 space-y-2">
                  <InputField label="Title" value={v.title || ''} onChange={(val) => updateArrayItem('values', i, 'title', val)} />
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea rows={2} value={v.desc || ''} onChange={(e) => updateArrayItem('values', i, 'desc', e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={!!v.featured} onChange={(e) => updateArrayItem('values', i, 'featured', e.target.checked)} />
                      <span className="text-xs">Featured</span>
                    </label>
                    <button type="button" onClick={() => removeArrayItem('values', i)} className="text-red-600">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact cards / generic cards */}
        {Array.isArray(cards) && cards.length >= 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Cards</div>
              <button onClick={() => addArrayItem('cards', { icon: '', title: 'New', content: '', subtext: '' })} className="text-sm text-blue-600">Add</button>
            </div>
            <div className="space-y-2">
              {cards.map((c, i) => (
                <div key={`card-${i}`} className="rounded-xl border bg-white p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    {c.image ? <img src={c.image} alt={c.title || c.name} className="h-12 w-12 object-cover rounded" /> : <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center text-sm">No Img</div>}
                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border cursor-pointer hover:bg-gray-50 text-sm font-medium">
                      Upload Image
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadForArray('cards', i, 'image', e.target.files?.[0])} />
                    </label>
                    <InputField label="Icon (emoji/class)" value={c.icon || ''} onChange={(v) => updateArrayItem('cards', i, 'icon', v)} />
                  </div>
                  <InputField label="Title" value={c.title || ''} onChange={(v) => updateArrayItem('cards', i, 'title', v)} />
                  <InputField label="Content" value={c.content || ''} onChange={(v) => updateArrayItem('cards', i, 'content', v)} />
                  <InputField label="Subtext" value={c.subtext || ''} onChange={(v) => updateArrayItem('cards', i, 'subtext', v)} />
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={!!c.featured} onChange={(e) => updateArrayItem('cards', i, 'featured', e.target.checked)} />
                      <span className="text-xs">Featured</span>
                    </label>
                    <button type="button" onClick={() => removeArrayItem('cards', i)} className="text-red-600">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        {Array.isArray(quickLinks) && quickLinks.length >= 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Quick Links</div>
              <button onClick={() => addArrayItem('quickLinks', { title: 'New', href: '#', desc: '', icon: '' })} className="text-sm text-blue-600">Add</button>
            </div>
            <div className="space-y-2">
              {quickLinks.map((q, i) => (
                <div key={`ql-${i}`} className="flex gap-2 items-start">
                  <InputField label="Title" value={q.title || q.name || ''} onChange={(v) => updateArrayItem('quickLinks', i, 'title', v)} />
                  <InputField label="Href" value={q.href || ''} onChange={(v) => updateArrayItem('quickLinks', i, 'href', v)} />
                  <InputField label="Description" value={q.desc || ''} onChange={(v) => updateArrayItem('quickLinks', i, 'desc', v)} />
                  <button type="button" onClick={() => removeArrayItem('quickLinks', i)} className="text-red-600">Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Process steps */}
        {Array.isArray(process) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Process / Steps</div>
              <button onClick={() => addArrayItem('process', { step: String(process.length + 1), title: 'New', desc: '' })} className="text-sm text-blue-600">Add</button>
            </div>
            <div className="space-y-2">
              {process.map((ps, i) => (
                <div key={`ps-${i}`} className="flex gap-2 items-start">
                  <InputField label="Step" value={ps.step || ''} onChange={(v) => updateArrayItem('process', i, 'step', v)} />
                  <InputField label="Title" value={ps.title || ''} onChange={(v) => updateArrayItem('process', i, 'title', v)} />
                  <InputField label="Description" value={ps.desc || ''} onChange={(v) => updateArrayItem('process', i, 'desc', v)} />
                  <button type="button" onClick={() => removeArrayItem('process', i)} className="text-red-600">Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Programs (simple editor) */}
        {Array.isArray(programs) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Programs</div>
              <button onClick={() => addArrayItem('programs', { level: 'New', programs: [], seats: 0 })} className="text-sm text-blue-600">Add</button>
            </div>
            <div className="space-y-2">
              {programs.map((pg, i) => (
                <div key={`pg-${i}`} className="rounded-xl border bg-white p-3 space-y-2">
                  <InputField label="Level" value={pg.level || ''} onChange={(v) => updateArrayItem('programs', i, 'level', v)} />
                  <InputField label="Seats" value={String(pg.seats || pg && pg.seats || '')} onChange={(v) => updateArrayItem('programs', i, 'seats', parseInt(v || '0'))} />
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Programs (comma separated)</label>
                    <input type="text" value={(Array.isArray(pg.programs) ? pg.programs.join(', ') : pg.programs) || ''} onChange={(e) => updateArrayItem('programs', i, 'programs', String(e.target.value).split(',').map(s => s.trim()))} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={!!pg.featured} onChange={(e) => updateArrayItem('programs', i, 'featured', e.target.checked)} />
                      <span className="text-xs">Featured</span>
                    </label>
                    <button type="button" onClick={() => removeArrayItem('programs', i)} className="text-red-600">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Placements specific */}
        {Array.isArray(placementStats) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Placement Stats</div>
              <button onClick={() => addArrayItem('placementStats', { label: 'New', value: '' })} className="text-sm text-blue-600">Add</button>
            </div>
            <div className="space-y-2">
              {placementStats.map((ps, i) => (
                <div key={`plstat-${i}`} className="flex gap-2 items-center">
                  <InputField label="Label" value={ps.label || ''} onChange={(v) => updateArrayItem('placementStats', i, 'label', v)} />
                  <InputField label="Value" value={ps.value || ''} onChange={(v) => updateArrayItem('placementStats', i, 'value', v)} />
                  <button type="button" onClick={() => removeArrayItem('placementStats', i)} className="text-red-600">Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success stories */}
        {Array.isArray(successStories) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Success Stories</div>
              <button onClick={() => addArrayItem('successStories', { name: 'New', company: '', package: '', branch: '', year: '', quote: '' })} className="text-sm text-blue-600">Add</button>
            </div>
            <div className="space-y-2">
              {successStories.map((ss, i) => (
                <div key={`ss-${i}`} className="rounded-xl border bg-white p-3 space-y-2">
                  <InputField label="Name" value={ss.name || ''} onChange={(v) => updateArrayItem('successStories', i, 'name', v)} />
                  <InputField label="Company" value={ss.company || ''} onChange={(v) => updateArrayItem('successStories', i, 'company', v)} />
                  <InputField label="Package" value={ss.package || ''} onChange={(v) => updateArrayItem('successStories', i, 'package', v)} />
                  <InputField label="Branch" value={ss.branch || ''} onChange={(v) => updateArrayItem('successStories', i, 'branch', v)} />
                  <InputField label="Year" value={ss.year || ''} onChange={(v) => updateArrayItem('successStories', i, 'year', v)} />
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Quote</label>
                    <textarea rows={2} value={ss.quote || ''} onChange={(e) => updateArrayItem('successStories', i, 'quote', e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <button type="button" onClick={() => removeArrayItem('successStories', i)} className="text-red-600">Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Raw JSON fallback */}
        <div>
          <div className="font-medium mb-2">Raw JSON (advanced)</div>
          <textarea rows={8} value={JSON.stringify(draft || {}, null, 2)} onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setDraft(parsed);
            } catch {
              // ignore invalid JSON while typing
            }
          }} className="w-full px-4 py-2 border rounded-lg font-mono text-sm" />
        </div>

        <div className="flex gap-3 mt-3">
          <button type="button" onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
            <FaSave /> {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button type="button" onClick={publish} disabled={saving} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60">Publish</button>
        </div>
      </div>
    </div>
  );
}

function SlugPagesEditor({ block, setting, defaultValue, saving, onSave, onPublish }) {
  const initialPages = safeParseJson(setting?.draftValue ?? setting?.publishedValue ?? setting?.value ?? defaultValue, defaultValue) || {};
  const [draft, setDraft] = useState(() => (initialPages && typeof initialPages === "object" && !Array.isArray(initialPages) ? initialPages : {}));
  const [selectedSlug, setSelectedSlug] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [pageForm, setPageForm] = useState({
    title: "",
    subtitle: "",
    gradient: "from-blue-600 to-indigo-600",
    content: "<p>Write page content here.</p>",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const nextPages = safeParseJson(setting?.draftValue ?? setting?.publishedValue ?? setting?.value ?? defaultValue, defaultValue) || {};
    const normalizedPages = nextPages && typeof nextPages === "object" && !Array.isArray(nextPages) ? nextPages : {};
    setDraft(normalizedPages);
    const firstSlug = Object.keys(normalizedPages)[0] || "";
    setSelectedSlug((current) => (current && normalizedPages[current] ? current : firstSlug));
  }, [setting, defaultValue]);

  useEffect(() => {
    if (!selectedSlug) {
      setPageForm({
        title: "",
        subtitle: "",
        gradient: "from-blue-600 to-indigo-600",
        content: "<p>Write page content here.</p>",
      });
      return;
    }

    const page = draft[selectedSlug] || {};
    setPageForm({
      title: page.title || "",
      subtitle: page.subtitle || "",
      gradient: page.gradient || "from-blue-600 to-indigo-600",
      content:
        typeof page.content === "string"
          ? page.content
          : page.content
            ? JSON.stringify(page.content, null, 2)
            : "<p>Write page content here.</p>",
    });
  }, [selectedSlug, draft]);

  const sanitizeSlug = (value) =>
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const commitPage = (slug, form) => {
    const nextDraft = { ...(draft || {}) };
    const parsedContent = (() => {
      const raw = form.content ?? "";
      try {
        return JSON.parse(raw);
      } catch {
        return raw;
      }
    })();

    nextDraft[slug] = {
      title: form.title || "Untitled Page",
      subtitle: form.subtitle || "",
      gradient: form.gradient || "from-blue-600 to-indigo-600",
      content: parsedContent,
    };

    setDraft(nextDraft);
    return nextDraft;
  };

  const addPage = () => {
    setError("");
    const slug = sanitizeSlug(newSlug);
    if (!slug) {
      setError("Enter a valid slug such as student-life or alumni.");
      return;
    }
    if (draft[slug]) {
      setError("That slug already exists.");
      return;
    }

    const nextDraft = {
      ...(draft || {}),
      [slug]: {
        title: "New Page",
        subtitle: "Custom page controlled from admin",
        gradient: "from-blue-600 to-indigo-600",
        content: "<p>Add your page content here.</p>",
      },
    };

    setDraft(nextDraft);
    setSelectedSlug(slug);
    setNewSlug("");
    setPageForm({
      title: "New Page",
      subtitle: "Custom page controlled from admin",
      gradient: "from-blue-600 to-indigo-600",
      content: "<p>Add your page content here.</p>",
    });
  };

  const save = async () => {
    if (!selectedSlug) {
      setError("Select or create a slug page first.");
      return;
    }

    setError("");
    const nextDraft = commitPage(selectedSlug, pageForm);
    await onSave(block.key, JSON.stringify(nextDraft), { section: block.section, description: block.description, type: block.type });
  };

  const publish = async () => {
    await save();
    await onPublish(block.key);
  };

  const removePage = () => {
    if (!selectedSlug) return;
    const nextDraft = { ...(draft || {}) };
    delete nextDraft[selectedSlug];
    const nextSlug = Object.keys(nextDraft)[0] || "";
    setDraft(nextDraft);
    setSelectedSlug(nextSlug);
  };

  const pages = Object.keys(draft || {}).sort();

  return (
    <div className="rounded-2xl border bg-gray-50 p-4 md:col-span-2">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{block.label}</h3>
          <p className="text-xs text-gray-500">Create and override dynamic slug pages from one place. These pages render on the public route /[slug].</p>
        </div>
      </div>

      {error && <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <div className="rounded-xl border bg-white p-3">
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value)}
              placeholder="new-page-slug"
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
            <button type="button" onClick={addPage} className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white">
              <FaPlus />
            </button>
          </div>

          <div className="max-h-[560px] space-y-2 overflow-y-auto pr-1">
            {pages.length === 0 ? (
              <div className="rounded-lg border border-dashed p-3 text-sm text-gray-500">
                No slug pages yet.
              </div>
            ) : (
              pages.map((slug) => {
                const isActive = slug === selectedSlug;
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => setSelectedSlug(slug)}
                    className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition ${isActive ? "border-blue-500 bg-blue-50" : "bg-white hover:bg-gray-50"}`}
                  >
                    <span className="font-medium text-gray-900">/{slug}</span>
                    <span className="text-xs text-gray-500">edit</span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4">
          {!selectedSlug ? (
            <div className="rounded-lg border border-dashed p-6 text-sm text-gray-500">Select or create a slug page to start editing.</div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <InputField label="Slug" value={selectedSlug} onChange={(value) => {
                  const nextSlug = sanitizeSlug(value);
                  if (!nextSlug || nextSlug === selectedSlug) {
                    setSelectedSlug(nextSlug || selectedSlug);
                    return;
                  }
                  if (draft[nextSlug]) {
                    setError("That slug already exists.");
                    return;
                  }
                  setError("");
                  setDraft((current) => {
                    const copy = { ...(current || {}) };
                    copy[nextSlug] = copy[selectedSlug];
                    delete copy[selectedSlug];
                    return copy;
                  });
                  setSelectedSlug(nextSlug);
                }} />
                <InputField label="Gradient" value={pageForm.gradient} onChange={(value) => setPageForm((current) => ({ ...current, gradient: value }))} placeholder="from-blue-600 to-indigo-600" />
              </div>

              <InputField label="Title" value={pageForm.title} onChange={(value) => setPageForm((current) => ({ ...current, title: value }))} placeholder="Page title" />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                <textarea
                  rows={2}
                  value={pageForm.subtitle}
                  onChange={(e) => setPageForm((current) => ({ ...current, subtitle: e.target.value }))}
                  className="w-full rounded-lg border px-4 py-2"
                  placeholder="Page subtitle"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Content HTML</label>
                <textarea
                  rows={16}
                  value={pageForm.content}
                  onChange={(e) => setPageForm((current) => ({ ...current, content: e.target.value }))}
                  className="w-full rounded-lg border px-4 py-2 font-mono text-sm"
                  placeholder="<h2>Heading</h2><p>Page content</p>"
                />
                <p className="mt-2 text-xs text-gray-500">This content renders on the public page. HTML is allowed for richer layouts.</p>
              </div>

              <div className="rounded-lg border bg-gray-50 p-4">
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Preview</div>
                <div className={`rounded-xl bg-gradient-to-r ${pageForm.gradient} p-5 text-white`}>
                  <h4 className="text-2xl font-bold">{pageForm.title || "Untitled Page"}</h4>
                  <p className="mt-1 text-sm opacity-90">{pageForm.subtitle || ""}</p>
                </div>
                <div className="mt-4 rounded-xl border bg-white p-4 text-sm text-gray-700">
                  {pageForm.content || "No content yet."}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-60">
                  <FaSave /> Save Draft
                </button>
                <button type="button" onClick={publish} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white disabled:opacity-60">
                  <FaShareAlt /> Publish
                </button>
                <button type="button" onClick={removePage} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
