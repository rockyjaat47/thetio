const logos = [
  { name: "Google", slug: "google" },
  { name: "Apple", slug: "apple" },
  { name: "Meta", slug: "meta" },
  { name: "Netflix", slug: "netflix" },
  { name: "Spotify", slug: "spotify" },
  { name: "Airbnb", slug: "airbnb" },
  { name: "Uber", slug: "uber" },
  { name: "Stripe", slug: "stripe" },
  { name: "Shopify", slug: "shopify" },
  { name: "Notion", slug: "notion" },
  { name: "Figma", slug: "figma" },
  { name: "GitHub", slug: "github" },
  { name: "GitLab", slug: "gitlab" },
  { name: "Vercel", slug: "vercel" },
  { name: "Cloudflare", slug: "cloudflare" },
  { name: "Linear", slug: "linear" },
  { name: "Discord", slug: "discord" },
  { name: "Atlassian", slug: "atlassian" },
  { name: "Dropbox", slug: "dropbox" },
  { name: "PayPal", slug: "paypal" },
  { name: "Tesla", slug: "tesla" },
  { name: "X", slug: "x" },
  { name: "YouTube", slug: "youtube" },
  { name: "TikTok", slug: "tiktok" },
  { name: "Zoom", slug: "zoom" },
  { name: "HubSpot", slug: "hubspot" },
  { name: "Nvidia", slug: "nvidia" },
  { name: "Intel", slug: "intel" },
  { name: "Reddit", slug: "reddit" },
  { name: "Pinterest", slug: "pinterest" },
  { name: "WhatsApp", slug: "whatsapp" },
  { name: "Twitch", slug: "twitch" },
  { name: "Coinbase", slug: "coinbase" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Docker", slug: "docker" },
  { name: "Google Cloud", slug: "googlecloud" },
];

export function LogoMarquee() {
  return (
    <section className="border-y border-foreground/10 bg-background py-12">
      <p className="mb-8 text-center text-sm text-foreground/60">
        Trusted by ambitious businesses across industries
      </p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-[marquee_60s_linear_infinite] items-center gap-14 pr-14">
          {[...logos, ...logos].map((l, i) => (
            <img
              key={i}
              src={`https://cdn.simpleicons.org/${l.slug}/9ca3af`}
              alt={l.name}
              loading="lazy"
              className="h-8 w-auto flex-none object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0 dark:invert"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
