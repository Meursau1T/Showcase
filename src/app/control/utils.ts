type ContentWithImages = {
    backgroundImage?: string
    imageContent?: string
    textContent?: string
}

const normalizeSingleImagePath = (src: string) => {
    const value = src.trim()

    if (!value || /^https?:\/\//i.test(value) || value.startsWith('/api/uploads/')) {
        return value
    }

    const filename = value.replace(/^(?:\.\/|\/)+/, '')
    return `/api/uploads/${encodeURIComponent(filename)}`
}

export const normalizeImagePath = (src = '') => src.split('|').map(normalizeSingleImagePath).join('|')

export const normalizeContentImagePaths = (data: ContentWithImages): ContentWithImages => ({
    ...data,
    backgroundImage: normalizeImagePath(data.backgroundImage),
    imageContent: normalizeImagePath(data.imageContent),
})

export const refreshControlPage = (tab: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set('tab', tab)
    window.location.assign(url.toString())
}
