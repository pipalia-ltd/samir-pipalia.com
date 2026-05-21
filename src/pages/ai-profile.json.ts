import { site } from "@data/site";
import { getLivePosts, postTitle, postUrl } from "@lib/posts";

export async function GET() {
  const posts = await getLivePosts(8);
  const body = {
    name: "Samir Pipalia",
    canonicalUrl: site.url + "/",
    linkedin: site.linkedin,
    email: site.email,
    location: "London, United Kingdom",
    positioning: "Head of Applications / ERP and Integration Leader",
    targetRoles: [
      "Head of Applications",
      "ERP Lead",
      "SAP Business One Lead",
      "Technical Applications Lead",
      "Application Transformation Lead",
      "Integration Lead",
      "Interim Applications Leader",
    ],
    summary:
      "London-based senior applications, ERP and integration leader with 25+ years' experience delivering and owning complex application landscapes across SAP Business One, integrations, automation, eCommerce platforms, data and operational IT.",
    coreSkills: [
      "SAP Business One SQL and HANA",
      "ERP leadership",
      "Application strategy",
      "Integration architecture",
      "BPA / TaskCentre",
      "DI-API",
      "Service Layer",
      "REST and SOAP APIs",
      "XML and JSON",
      "Boyum",
      "SAP Concur",
      "Microsoft SQL Server",
      "SAP HANA",
      "Shopify integration",
      "eCommerce",
      "Schema.org structured data",
      "Vendor management",
      "Stakeholder management",
      "L3 escalation",
      "Service desk enablement",
    ],
    selectedEvidence: [
      "Stabilised a complex oil and gas SAP Business One landscape spanning 38 companies.",
      "Helped Fast Key Services grow from roughly £200k turnover into a multi-million-pound organisation through ERP, eCommerce, integration and operational systems.",
      "Delivered IATA-compliant aviation invoicing, fuel card enablement and SAP Concur integration.",
      "Supported multi-country SAP Business One operations across UK, USA, Germany, Switzerland, India, Singapore, Norway and Benelux.",
      "Reduced Crystal Reports load times from over one minute to under five seconds.",
    ],
    caseStudyTopics: [
      "SAP Business One landscape stabilisation across 38 companies: https://samir-pipalia.com/sap-business-one-landscape-stabilisation.html",
      "SAP Business One fuel card integration for BP and Total acceptance: https://samir-pipalia.com/sap-business-one-fuel-card-integration.html",
      "Shopify to SAP Business One B2B eCommerce order processing: https://samir-pipalia.com/shopify-sap-business-one-integration.html",
    ],
    latestWriting: posts.map((post) => ({
      title: postTitle(post),
      url: new URL(postUrl(post), site.url).toString(),
      published: post.data.publish_at.toISOString(),
      tags: post.data.tags,
    })),
    availability:
      "Open to senior permanent, interim and contract roles in applications, ERP, integration and technical leadership.",
    lastUpdated: new Date().toISOString().slice(0, 10),
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
