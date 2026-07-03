Accreditation Intelligence System — Checklist and Mapping

Purpose
- Help colleges prepare the website and content to meet NAAC and NBA evidence/criteria requirements.

High-level mapping (NAAC & NBA) -> Site areas
- Criterion: Institutional Vision, Mission & Goals
  - Pages: About page, footer, site settings `siteName`, `aboutPage` content
  - Admin edit: `admin/site-settings` -> `aboutPage`, `siteName`

- Criterion: Governance, Leadership and Management
  - Pages: About / Organogram / Committees (use `pages` JSON blocks, `campusesPage`, `contactPage`)
  - Admin edit: `site-settings` -> `campusesPage`, `contactPage`, add committee pages via `slugPages`

- Criterion: Teaching, Learning and Evaluation
  - Pages: Programs (`programsPage`), Academics, Course descriptions; upload syllabi and outcomes in `slugPages`
  - Admin edit: `site-settings` -> `programsPage`, `academicsPage`, `slugPages`

- Criterion: Research, Innovation and Extension
  - Pages: Research & Development (`researchInnovationPage`), Publications, Projects, Patents
  - Admin edit: use `researchInnovationPage` JSON block to list projects, publications, patents, research centers

- Criterion: Infrastructure and Learning Resources
  - Pages: Campuses, Library, Facilities pages
  - Admin edit: `campusesPage`, `libraryPage` JSON blocks; upload images via hero slides or page JSON

- Criterion: Student Support and Progression
  - Pages: Student Services, Placements, Scholarships, Registrations
  - Admin edit: `studentServicesPage`, `placementsPage`, `scholarshipPage`, `registrations` admin pages

- Criterion: Institutional Values and Best Practices
  - Pages: About -> values, committees, policies, mandatory disclosure
  - Admin edit: `aboutPage`, `slugPages` for policies and disclosures

- NBA specific (Programme outcomes, curriculum, faculty profile)
  - Pages: Programs (detailed), Faculty page, Course outcomes, Assessment matrix
  - Admin edit: `programsPage`, `admin/faculty` to publish faculty profiles and publications

Editable site settings added
- `accreditationBanner` (header): editable from `admin/site-settings` -> "Accreditation Banner"
- Use `admin/site-settings` to edit all homepage, page JSON blocks and publish changes.

Quick actions for a college to prepare the site
1. Login to `/admin/login` and open `Homepage Editor` (`admin/site-settings`).
2. Update `accreditationBanner` with your custom institution name if desired; Save Draft -> Publish.
3. Use `researchInnovationPage` to list research projects, publications, patents, and funding evidence.
4. Populate `aboutPage` with Vision, Mission, Aims, and Values.
5. Add Program details and course outcomes in `programsPage` and upload syllabus documents via `slugPages` or a file upload endpoint.
6. Publish each draft after reviewing in the live preview panel.

Detailed step-by-step customization and publishing
1. Sign in: open [admin login](/admin/login) and authenticate using your administrator credentials.
2. Edit homepage banner: open [Homepage Editor](frontend/src/pages/admin/site-settings.js) (Admin → Homepage Editor) and update the **Accreditation Banner** field. Click `Save Draft` then `Publish` to make it live.
3. Fill About page: in the Homepage Editor, open the `aboutPage` JSON block (or use the About page editor) and add Vision, Mission, Aims, Values, and proof documents. Use `Save Draft` → `Publish`.
4. Research evidence: open [Research & Development Editor](frontend/src/pages/admin/site-settings.js) and add projects, publications, patents, and research centers. For each evidence item, attach files using the upload controls.
5. Programs & outcomes: open the `programsPage` JSON in the Homepage Editor and add PEOs/POs/COs. Upload syllabi under `slugPages` or attach them to program entries.
6. Faculty profiles: open [Faculty Admin](/admin/faculty) and ensure faculty profiles include CV, publications, and ORCID/IDs.
7. Infrastructure and resources: update `campusesPage` and `libraryPage` in the Homepage Editor with images and facility reports.
8. Student support and placements: update `placementsPage`, `studentServicesPage`, and related admin entries with placement reports, student achievements, and progression data.
9. Policies and disclosures: create `slugPages` entries for mandatory disclosure, policies, and committee documents. These pages are suitable for uploading official PDF evidence.
10. Accreditation evidence dashboard: open [Accreditation Dashboard](/admin/accreditation-dashboard) to add per-criterion evidence items and upload supporting files. Save Draft → Publish when ready.

Publishing notes
- Draft vs Publish: many fields are saved as drafts first — always use `Save Draft` and then `Publish` to make the content public.
- File upload: use the upload buttons present in each editor. Files are stored via `/api/uploads` and returned as URLs that are attached to JSON entries.
- Evidence naming: use clear, descriptive titles for uploaded files (e.g., `PEO_Meeting_Minutes_2025.pdf`, `Syllabus_CSE_2024.pdf`).

Where to edit (quick links)
- Homepage Editor: [admin/site-settings](admin/site-settings)
- Faculty admin: [admin/faculty](admin/faculty)
- Projects: [admin/projects](admin/projects)
- Publications: [admin/publications](admin/publications)
- Accreditation Dashboard: [admin/accreditation-dashboard](admin/accreditation-dashboard)

Need more?
- I can add: an export button to download all published evidence as a ZIP, per-criterion automated checklist completion badges, or a public progress page that shows published accreditation readiness.


Next steps I can implement for you (pick any):
- Add a dedicated `Accreditation Dashboard` page listing NAAC/NBA criteria with evidence upload fields.
- Wire evidence file uploads to an organized folder and reference them in JSON blocks.
- Automate generation of a printable evidence report (ZIP) for submission.

If you want me to proceed, tell me which next step to implement first.
