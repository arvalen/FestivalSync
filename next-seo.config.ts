export const defaultSEOConfig = {
    title: "FestivaSync",
    description: "Sharing and discovering festival experiences",
    icons: {
        icon: "/logo.svg",
      },
    openGraph: {
        type: "website",
        locale: "id_ID",
        url: "https://festivalsync.vercel.app/",
        site_name: "FestivaSync",
        images: [
            {
                url: "/logo.svg",
                width: 800,
                height: 600,
                alt: "FestivaSync Logo",
            },
        ],
    },
    festivalsync: {
        handle: "@festivalsync",
        site: "@festivalsync",
        cardType: "summary_large_image",
    },
}