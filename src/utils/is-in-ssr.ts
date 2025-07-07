export const isInSSR = () => {
    if (typeof window === 'undefined') {
        return true
    }
    return false
}
