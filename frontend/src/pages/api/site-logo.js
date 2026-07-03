import { getApiBase, defaultPublicSettings } from '../../lib/siteSettings'

export default async function handler(req, res) {
    const apiBase = getApiBase()
    try {
        const r = await fetch(`${apiBase}/api/site-settings`)
        const settings = r.ok ? await r.json() : {}
        const merged = { ...defaultPublicSettings, ...(settings || {}).settings }
        const siteLogo = merged.appIconPwa || merged.siteLogoPwa || merged.appIcon || merged.siteLogo || '/icons/bbit-logo-circle.svg'

        // If requesting a PNG (size query param), proxy to backend PNG endpoint so server can rasterize
        if (req.query.size) {
            const size = parseInt(req.query.size, 10) || 192
            const apiLogoPng = `${apiBase.replace(/\/$/, '')}/api/site-logo.png?size=${size}`
            return res.redirect(apiLogoPng)
        }

        // If logo URL is absolute, redirect directly. If relative, prefix apiBase.
        if (/^https?:\/\//i.test(siteLogo)) {
            return res.redirect(siteLogo)
        }

        // Relative path: redirect to apiBase + path
        const target = siteLogo.startsWith('/') ? `${apiBase}${siteLogo}` : `${apiBase}/${siteLogo}`
        return res.redirect(target)
    } catch (err) {
        console.error('site-logo api error', err)
        return res.redirect('/icons/bbit-logo-circle.svg')
    }
}
