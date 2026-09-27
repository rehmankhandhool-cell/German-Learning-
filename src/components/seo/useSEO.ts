import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
}

export function useSEO({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription
}: SEOProps) {
  useEffect(() => {
    // 1. Page title
    document.title = title;

    // 2. Helper to set or create meta tags
    const setMeta = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', ogTitle || title);
    setMeta('property', 'og:description', ogDescription || description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('name', 'twitter:title', ogTitle || title);
    setMeta('name', 'twitter:description', ogDescription || description);
    setMeta('name', 'twitter:url', canonicalUrl);

    // 3. Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Cleanup when unmounting or switching to restore root title
    return () => {
      // Optional cleanup if needed
    };
  }, [title, description, canonicalUrl, ogTitle, ogDescription]);
}
