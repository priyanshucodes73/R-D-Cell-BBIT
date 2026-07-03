import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FaSave, FaUpload, FaPlus, FaTrash } from 'react-icons/fa'
import { fetchWithAuth } from '../../lib/auth'
import { defaultPublicSettings } from '../../lib/siteSettings'

const NAAC_CRITERIA = [
    'Institutional Vision, Mission & Goals',
    'Governance, Leadership and Management',
    'Teaching, Learning and Evaluation',
    'Research, Innovation and Extension',
    'Infrastructure and Learning Resources',
    'Student Support and Progression',
    'Institutional Values and Best Practices',
]

const NBA_CRITERIA = [
    'Program Educational Objectives (PEOs)',
    'Program Outcomes (POs) and Course Outcomes (COs)',
    'Curriculum and Teaching-Learning Process',
    'Faculty and Staff Information',
    'Student Performance and Placement',
]

const CRITERIA_MAPPING = {
    'Institutional Vision, Mission & Goals': [
        { label: 'About Page', href: '/admin/site-settings' },
        { label: 'Homepage Editor -> About Page JSON', href: '/admin/site-settings' },
    ],
    'Governance, Leadership and Management': [
        { label: 'Organogram / Committees (use slug pages)', href: '/admin/site-settings' },
        { label: 'Contacts & Registrations', href: '/admin/contacts' },
    ],
    'Teaching, Learning and Evaluation': [
        { label: 'Programs Page JSON', href: '/admin/site-settings' },
        { label: 'Slug Pages (upload syllabi)', href: '/admin/site-settings' },
    ],
    'Research, Innovation and Extension': [
        { label: 'Research & Development Editor', href: '/admin/site-settings' },
        { label: 'Publications Admin', href: '/admin/publications' },
        { label: 'Projects Admin', href: '/admin/projects' },
    ],
    'Infrastructure and Learning Resources': [
        { label: 'Campuses / Library JSON', href: '/admin/site-settings' },
    ],
    'Student Support and Progression': [
        { label: 'Student Services JSON', href: '/admin/site-settings' },
        { label: 'Placements Admin', href: '/admin/news-events' },
    ],
    'Institutional Values and Best Practices': [
        { label: 'About Page -> Values', href: '/admin/site-settings' },
        { label: 'Slug Pages -> Policies & Disclosures', href: '/admin/site-settings' },
    ],
    'Program Educational Objectives (PEOs)': [
        { label: 'Programs Page JSON', href: '/admin/site-settings' },
    ],
    'Program Outcomes (POs) and Course Outcomes (COs)': [
        { label: 'Programs Page / Slug Pages', href: '/admin/site-settings' },
    ],
    'Curriculum and Teaching-Learning Process': [
        { label: 'Programs Page / Files (syllabi)', href: '/admin/site-settings' },
    ],
    'Faculty and Staff Information': [
        { label: 'Faculty Admin', href: '/admin/faculty' },
    ],
    'Student Performance and Placement': [
        { label: 'Placements Page & Admin', href: '/admin/site-settings' },
    ],
}

export default function AccreditationDashboard() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [evidence, setEvidence] = useState({})

    useEffect(() => {
        if (typeof window !== 'undefined' && !localStorage.getItem('adminToken')) {
            router.push('/admin/login')
            return
        }
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await fetchWithAuth('/api/site-settings/admin')
            if (!res.ok) throw new Error('Failed to fetch settings')
            const list = await res.json()
            const item = list.find((s) => s.key === 'accreditationEvidence')
            const parsed = item?.draftValue ?? item?.publishedValue ?? item?.value ?? '{}'
            setEvidence(typeof parsed === 'string' ? JSON.parse(parsed || '{}') : parsed)
        } catch (err) {
            console.error(err)
            setEvidence({})
        } finally {
            setLoading(false)
        }
    }

    const uploadFile = async (file) => {
        const form = new FormData()
        form.append('file', file)
        const res = await fetchWithAuth('/api/uploads', { method: 'POST', body: form })
        if (!res.ok) {
            const d = await res.json().catch(() => ({}))
            throw new Error(d.error || 'Upload failed')
        }
        const d = await res.json()
        return d.url
    }

    const addEvidence = (criterion) => {
        setEvidence((e) => ({
            ...e,
            [criterion]: [...(e[criterion] || []), { title: '', description: '', file: '' }],
        }))
    }

    const updateEvidenceItem = (criterion, index, field, value) => {
        setEvidence((e) => {
            const copy = JSON.parse(JSON.stringify(e || {}))
            copy[criterion] = copy[criterion] || []
            copy[criterion][index] = { ...(copy[criterion][index] || {}), [field]: value }
            return copy
        })
    }

    const removeEvidenceItem = (criterion, index) => {
        setEvidence((e) => {
            const copy = JSON.parse(JSON.stringify(e || {}))
            copy[criterion] = copy[criterion] || []
            copy[criterion].splice(index, 1)
            return copy
        })
    }

    const handleFileChange = async (criterion, index, file) => {
        if (!file) return
        try {
            updateEvidenceItem(criterion, index, 'uploading', true)
            const url = await uploadFile(file)
            updateEvidenceItem(criterion, index, 'file', url)
        } catch (err) {
            alert(err.message || 'Upload failed')
        } finally {
            updateEvidenceItem(criterion, index, 'uploading', false)
        }
    }

    const saveDraft = async () => {
        setSaving(true)
        try {
            const res = await fetchWithAuth(`/api/site-settings/${encodeURIComponent('accreditationEvidence')}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ draftValue: JSON.stringify(evidence), section: 'accreditation', description: 'Accreditation evidence and uploads', type: 'json', isPublic: false }),
            })
            if (!res.ok) {
                const d = await res.json().catch(() => ({}))
                throw new Error(d.error || 'Save failed')
            }
            alert('Saved draft')
        } catch (err) {
            console.error(err)
            alert(err.message || 'Failed to save')
        } finally {
            setSaving(false)
        }
    }

    const publishNow = async () => {
        setSaving(true)
        try {
            await saveDraft()
            const res = await fetchWithAuth(`/api/site-settings/${encodeURIComponent('accreditationEvidence')}/publish`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
            if (!res.ok) {
                const d = await res.json().catch(() => ({}))
                throw new Error(d.error || 'Publish failed')
            }
            alert('Published accreditation evidence')
        } catch (err) {
            console.error(err)
            alert(err.message || 'Failed to publish')
        } finally {
            setSaving(false)
        }
    }

    const progressFor = (criterion) => {
        const list = evidence[criterion] || []
        if (!list.length) return 0
        const done = list.filter((it) => it.file).length
        return Math.round((done / list.length) * 100)
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading…</div>

    const allCriteria = [...NAAC_CRITERIA, ...NBA_CRITERIA]

    return (
        <div className="min-h-screen p-6 bg-slate-50">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Accreditation Dashboard</h1>
                    <div className="flex gap-3">
                        <button onClick={saveDraft} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">{saving ? 'Saving…' : <><FaSave className="inline mr-2" />Save Draft</>}</button>
                        <button onClick={publishNow} disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded">Publish</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allCriteria.map((c) => (
                        <div key={c} className="bg-white p-4 rounded-lg border">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <div className="font-semibold">{c}</div>
                                    <div className="text-xs text-gray-500">Progress: {progressFor(c)}%</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => addEvidence(c)} className="px-3 py-1 bg-white border rounded inline-flex items-center gap-2"><FaPlus />Add Evidence</button>
                                    <div className="text-xs text-gray-600">Edit sources:</div>
                                    <div className="flex gap-2">
                                        {(CRITERIA_MAPPING[c] || []).map((m) => (
                                            <a key={m.label} href={m.href} className="px-2 py-1 bg-slate-100 rounded text-sm text-slate-700 border">{m.label}</a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {(evidence[c] || []).map((item, idx) => (
                                    <div key={`${c}-${idx}`} className="rounded-md border p-3">
                                        <input className="w-full mb-2 px-3 py-2 border rounded" placeholder="Title" value={item.title || ''} onChange={(e) => updateEvidenceItem(c, idx, 'title', e.target.value)} />
                                        <textarea className="w-full mb-2 px-3 py-2 border rounded" placeholder="Description" rows={2} value={item.description || ''} onChange={(e) => updateEvidenceItem(c, idx, 'description', e.target.value)} />
                                        <div className="flex items-center gap-3">
                                            <label className="inline-flex items-center gap-2 px-3 py-2 bg-white border rounded cursor-pointer">
                                                <FaUpload /> {item.uploading ? 'Uploading…' : 'Upload File'}
                                                <input type="file" accept="*/*" className="hidden" onChange={(e) => handleFileChange(c, idx, e.target.files?.[0])} />
                                            </label>
                                            {item.file ? <a className="text-sm text-blue-600" href={item.file} target="_blank" rel="noreferrer">View file</a> : <span className="text-sm text-gray-500">No file</span>}
                                            <button className="ml-auto text-red-600" onClick={() => removeEvidenceItem(c, idx)}><FaTrash /></button>
                                        </div>
                                    </div>
                                ))}
                                {!((evidence[c] || []).length) && <div className="text-xs text-gray-500">No evidence items yet. Click Add Evidence to start.</div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
