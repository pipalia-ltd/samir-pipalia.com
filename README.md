# Samir-Pipalia.com

Astro personal site for Samir Pipalia, designed for GitHub Pages, Decap CMS blog editing, scheduled publishing and AI-readable profile discovery.

## Local Development

```powershell
npm install
npm run dev
npm run build
```

## Blog Workflow

1. Visit `/admin/`.
2. Log in with Netlify Identity / Git Gateway.
3. Create a blog post by entering the body, publish date/time, optional image and optional LinkedIn URL.
4. Save the post.
5. GitHub Actions generates title, slug, description, excerpt, tags and social summary using OpenAI.
6. Review or edit the generated fields in Decap CMS.
7. The scheduled GitHub Pages build publishes the post when `publish_at` is due.

Only clean Markdown and uploaded public assets are committed. Do not enter private draft material into the CMS if the repository is public.

## Files

- `src/pages/` - Astro pages, including existing public URLs and generated feeds.
- `src/content/blog/` - Decap-managed Markdown blog posts.
- `src/layouts/` and `src/components/` - shared layouts, navigation, SEO and structured data.
- `src/styles/global.css` - responsive styling.
- `public/admin/` - Decap CMS admin page and configuration.
- `public/assets/` - static images, favicons and social images.
- `scripts/generate-ai-metadata.mjs` - OpenAI metadata enrichment for blog posts.
- `.github/workflows/` - AI metadata and GitHub Pages deployment workflows.

## GitHub Pages Setup

1. In GitHub, go to Settings -> Pages.
2. Set Source to `GitHub Actions`.
3. Confirm the custom domain `samir-pipalia.com`.
4. Add repository secret `OPENAI_API_KEY`.
5. Optionally set repository variable `OPENAI_MODEL`; otherwise the metadata script uses `gpt-5.2`.
6. Configure Netlify Identity and Git Gateway for Decap CMS login.

## DNS Setup

For an apex domain, point DNS to GitHub Pages using GitHub's current Pages IP addresses, and add a `www` CNAME to the GitHub Pages hostname. Confirm the current DNS values in GitHub's official Pages documentation before changing DNS.

## Notes

The public site intentionally excludes phone number and home address. Keep salary expectations out of the public page; discuss compensation directly with recruiters and hiring teams.

Scheduled Markdown posts and uploaded images may be visible in the GitHub repository before they are live on the website if the repository is public.

## Launch Checklist

- Enable HTTPS in GitHub Pages.
- Add the domain to Google Search Console and Bing Webmaster Tools.
- Submit `https://samir-pipalia.com/sitemap.xml` after DNS is live.
- Keep the same name, title, profile summary and headshot across LinkedIn, GitHub and other public profiles.
- GA4 is configured with measurement ID `G-Y8RDGFG5N3`; update the privacy page before adding any further tracking.
- Consider Cloudflare in front of GitHub Pages if you want configurable security headers such as `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy`.
- Publish fresh blog posts through Decap CMS; scheduled posts appear automatically once their publish time is due.
