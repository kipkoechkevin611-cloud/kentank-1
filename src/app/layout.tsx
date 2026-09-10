import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Chatbot from "../components/Chatbot";
import FloatingCart from "../components/FloatingCart";
import CartToastWrapper from "../components/CartToastWrapper";
import { CartProvider } from "../context/CartContext";

const inter = Inter({ subsets: ["latin"] });

// Get site URL from environment variable with fallback
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kentank.co.ke';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Kentank Kenya';
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@kentank.co.ke';
const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+254784400492';

export const metadata: Metadata = {
  title: "Kentank Water Tanks Kenya | Premium Water Storage Solutions",
  description: "Genuine Kentank water tanks for homes, farms, and industries. Free countrywide delivery, 15-year warranty, KEBS certified. Prices from KSh 5,500 for 1000L tanks.",
  keywords: "Kentank Kenya, water tanks Kenya, plastic tanks, water storage tanks, septic tanks Kenya, underground tanks, tank suppliers Kenya, free delivery water tanks",
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Kentank Water Tanks Kenya | Premium Water Storage Solutions",
    description: "Genuine Kentank water tanks with free countrywide delivery, 15-year warranty, and KEBS certification. Order now!",
    url: siteUrl,
    siteName: siteName,
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kentank Water Tanks Kenya | Premium Water Storage Solutions",
    description: "Genuine Kentank water tanks with free countrywide delivery, 15-year warranty, and KEBS certification.",
    creator: '@kentankkenya',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${siteName} - Kentank Water Tanks`,
    description: 'Genuine Kentank water tanks for homes, farms, and industries. Free countrywide delivery, 15-year warranty, KEBS certified.',
    url: siteUrl,
    telephone: contactPhone.replace(/\s/g, ''),
    email: contactEmail,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KE',
      addressLocality: 'Nairobi',
      addressRegion: 'Nairobi',
      streetAddress: 'Industrial Area',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-1.2921',
      longitude: '36.8219',
    },
    openingHours: 'Mo-Sa 08:00-18:00',
    priceRange: 'KSh 5,500 - KSh 132,500',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Kenya',
    },
    makesOffer: [
      {
        '@type': 'Offer',
        name: '1000L Vertical Tank',
        price: '5500',
        priceCurrency: 'KES',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: '5000L Vertical Tank',
        price: '27500',
        priceCurrency: 'KES',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: '10000L Vertical Tank',
        price: '51000',
        priceCurrency: 'KES',
        availability: 'https://schema.org/InStock',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Water Tanks',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: '1000L Vertical Tank',
            description: 'Compact vertical tank perfect for small households',
            category: 'Water Tanks',
          },
          price: '5500',
          priceCurrency: 'KES',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: '5000L Vertical Tank',
            description: 'Medium capacity tank for residential use',
            category: 'Water Tanks',
          },
          price: '27500',
          priceCurrency: 'KES',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: '10000L Vertical Tank',
            description: 'Large capacity tank for commercial use',
            category: 'Water Tanks',
          },
          price: '51000',
          priceCurrency: 'KES',
        },
      ],
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/assets/logo.jpeg`,
    description: 'Leading supplier of genuine Kentank water tanks in Kenya',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactPhone.replace(/\s/g, ''),
      contactType: 'sales',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://www.facebook.com/kentankkenya',
      'https://twitter.com/kentankkenya',
      'https://www.instagram.com/kentankkenya',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <CartProvider>
          <div id="main-content">
            {children}
          </div>
          <CartToastWrapper />
          <FloatingCart />
          <Chatbot />
        </CartProvider>
      </body>
    </html>
  );
}
