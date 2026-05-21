import { site } from "@data/site";
import { getLivePosts, postTitle, postUrl } from "@lib/posts";

export async function GET() {
  const posts = await getLivePosts(8);
  const latestWriting = posts.length > 0
    ? posts.map((post) => `- ${postTitle(post)}: ${new URL(postUrl(post), site.url).toString()}`).join("\n")
    : "- Blog archive: https://samir-pipalia.com/blog/";

  const body = `# Samir Pipalia

Samir Pipalia is a London-based Head of Applications / ERP and Integration leader.

Canonical website: https://samir-pipalia.com/
LinkedIn: https://www.linkedin.com/in/pipalia/
Email: samir@pipalia.co.uk

## Professional Positioning

Samir Pipalia is suited to senior roles such as Head of Applications, ERP Lead, SAP Business One Lead, Technical Applications Lead, Application Transformation Lead, Integration Lead, and senior interim or contract application leadership roles.

He has 25+ years' experience delivering and owning complex application landscapes across SAP Business One, integrations, automation, eCommerce platforms, data, infrastructure and operational IT.

## Core Strengths

- SAP Business One SQL and HANA
- ERP leadership and application ownership
- Integration architecture and delivery
- BPA / TaskCentre, DI-API, Service Layer, REST/SOAP APIs, XML and JSON
- Boyum, SAP Concur, Crystal Reports, SQL Server and SAP HANA
- eCommerce and Shopify integration
- Java, C#, VB.NET, Python, NodeJS, JavaScript, HTML and CSS
- AWS hosting, Azure hosting, VMware and virtualisation
- Vendor and stakeholder management
- L3 escalation, incident ownership and service desk enablement

## Career Evidence

- Stabilised an oil and gas SAP Business One landscape spanning 38 companies across multiple business units and geographies.
- Helped Fast Key Services grow from roughly £200k turnover into a multi-million-pound organisation by designing and evolving ERP, eCommerce, integration and operational systems.
- Delivered IATA-compliant aviation invoicing, fuel card enablement and SAP Concur integration.
- Supported multi-country SAP Business One operations across UK, USA, Germany, Switzerland, India, Singapore, Norway and Benelux.
- Improved Crystal Reports performance from over one minute to under five seconds in a SAP Business One HANA environment.

## Selected Case Study Topics

- SAP Business One landscape stabilisation across 38 companies: https://samir-pipalia.com/sap-business-one-landscape-stabilisation.html
- SAP Business One fuel card integration for BP and Total acceptance: https://samir-pipalia.com/sap-business-one-fuel-card-integration.html
- Shopify to SAP Business One B2B eCommerce order processing: https://samir-pipalia.com/shopify-sap-business-one-integration.html

## Latest Writing

${latestWriting}

## Current Availability

Samir Pipalia is open to senior permanent, interim and contract opportunities in applications, ERP, integration and technical leadership.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
