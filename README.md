# Samir-Pipalia.com

Static personal site for Samir Pipalia, designed for GitHub Pages and AI-readable profile discovery.

## Files

- `index.html` - public website and structured `schema.org` profile data.
- `styles.css` - responsive styling.
- `llms.txt` - concise AI-readable professional profile.
- `ai-profile.json` - structured summary for machines and future reuse.
- `privacy.html` - simple privacy notice for a static personal site.
- `robots.txt` and `sitemap.xml` - crawler guidance.
- `CNAME` - custom domain for GitHub Pages.

## GitHub Pages Setup

1. Create a GitHub repository, for example `samir-pipalia.com`.
2. Add these files to the repository root.
3. In GitHub, go to Settings -> Pages.
4. Set Source to `Deploy from a branch`.
5. Choose the `main` branch and `/root`.
6. Add the custom domain `samir-pipalia.com`.

## DNS Setup

For an apex domain, point DNS to GitHub Pages using GitHub's current Pages IP addresses, and add a `www` CNAME to the GitHub Pages hostname. Confirm the current DNS values in GitHub's official Pages documentation before changing DNS.

## Notes

The public site intentionally excludes phone number and home address. Keep salary expectations out of the public page; discuss compensation directly with recruiters and hiring teams.

## Launch Checklist

- Enable HTTPS in GitHub Pages.
- Add the domain to Google Search Console and Bing Webmaster Tools.
- Submit `https://samir-pipalia.com/sitemap.xml` after DNS is live.
- Keep the same name, title, profile summary and headshot across LinkedIn, GitHub and other public profiles.
- Add analytics only if useful. Privacy-friendly options include Plausible or Microsoft Clarity; update `privacy.html` first.
- Consider Cloudflare in front of GitHub Pages if you want configurable security headers such as `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy`.
- Add a fresh case study or short technical note every month or two to create a visible freshness signal.
