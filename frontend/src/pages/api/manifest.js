import { getApiBase, defaultPublicSettings } from '../../lib/siteSettings'

export default async function handler(req, res) {
    const apiBase = getApiBase()
    try {
        const r = await fetch(`${apiBase}/api/site-settings`)
        const settings = r.ok ? await r.json() : {}
        const merged = { ...defaultPublicSettings, ...(settings || {}).settings }
        // App-level overrides: prefer appName and appIconPwa when present
        const appName = merged.appName || merged.siteName || defaultPublicSettings.siteName
        const appIcon = merged.appIconPwa || merged.siteLogoPwa || merged.appIcon || merged.siteLogo || '/cropped_circle-image.png'

        const manifest = {
            name: appName,
            short_name: appName,
            description: merged.accreditationBanner || defaultPublicSettings.accreditationBanner,
            start_url: '/',
            scope: '/',
            display: 'standalone',
            background_color: '#0f172a',
            theme_color: '#0f172a',
            orientation: 'portrait-primary',
            icons: [
                { src: appIcon, sizes: '192x192', type: 'image/*', purpose: 'any maskable' },
                { src: appIcon, sizes: '512x512', type: 'image/*', purpose: 'any maskable' },
            ],
        }

        res.setHeader('Content-Type', 'application/json')
        res.status(200).send(JSON.stringify(manifest))
    } catch (err) {
        console.error('manifest api error', err)
        res.status(200).json(require('../../../public/manifest.json'))
    }
}
