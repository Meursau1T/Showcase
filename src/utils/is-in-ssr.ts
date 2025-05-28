export const isInSSR = () => {
  if (typeof window === 'object') {
    return false;
  }
  return true;
}
