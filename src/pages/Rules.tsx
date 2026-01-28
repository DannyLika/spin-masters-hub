import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, BookOpen, FileText } from "lucide-react";

interface RuleLink {
  label: string;
  organization: string;
  url: string;
}

interface RuleSection {
  title: string;
  description: string;
  links: RuleLink[];
}

const ruleSections: RuleSection[] = [
  {
    title: "Beyblade X",
    description: "Official, Regional & Community Rules",
    links: [
      {
        label: "Beyblade X Regulations (6th Edition)",
        organization: "Takara Tomy",
        url: "https://www.takaratomyasia.com/img/beybladex/1732149844_BEYBLADE%20X%20-%20REGULATION%206th%20Edition.pdf",
      },
      {
        label: "BJX Beyblade X Rulebook 2024–2025",
        organization: "Beyblade Japan X",
        url: "https://img1.wsimg.com/blobby/go/b90a29fa-631a-4c1e-b027-1e57d0b85847/BJX%20Rulebook%202025.pdf",
      },
      {
        label: "X Format Rules (PDF)",
        organization: "World Beyblade Organization",
        url: "https://www.scribd.com/document/765532361/X-Format-Rules-World-Beyblade-Organization",
      },
    ],
  },
  {
    title: "Beyblade Burst",
    description: "Hasbro & WBO Format Rules",
    links: [
      {
        label: "Beyblade Burst Guide Book / Rules",
        organization: "Hasbro",
        url: "https://www.hasbro.com/common/assets/Image/Printables/d83b87d6e2ab4791a7be48878ece4410/b1c4eb1950569047f5380b24fb5a9331/CF43A075_GUIDE_BOOK.pdf",
      },
      {
        label: "Burst Limited Format Rules (PDF)",
        organization: "World Beyblade Organization",
        url: "https://www.scribd.com/document/741264638/Burst-Limited-Format-Rules-World-Beyblade-Organization",
      },
      {
        label: "Burst Format Rules Hub",
        organization: "World Beyblade Organization",
        url: "https://worldbeyblade.org",
      },
    ],
  },
  {
    title: "Plastic / HMS / Metal Fight",
    description: "Classic Generation Rules",
    links: [
      {
        label: "Plastic & HMS Format Rules",
        organization: "World Beyblade Organization",
        url: "https://docs.google.com/document/d/15b3nO9q9qq_gkCCqxURAf7-In92NdHrbV4HRl3esCag",
      },
      {
        label: "Standard Version Rule Book (Metal Fight)",
        organization: "Community Reference",
        url: "https://www.scribd.com/document/47970265/standardrules",
      },
    ],
  },
];

export default function Rules() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-bold text-gradient-primary mb-4">
              Official Rulebooks
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Access official and community rulebooks for all Beyblade generations. 
              Click any link to view the full rules document.
            </p>
          </div>

          {/* Rule Sections */}
          <div className="space-y-8">
            {ruleSections.map((section) => (
              <Card key={section.title} className="glass border-primary/20">
                <CardHeader>
                  <CardTitle className="font-display text-2xl text-primary">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                        >
                          <FileText className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {link.label}
                              </span>
                              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {link.organization}
                            </span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="text-center text-sm text-muted-foreground mt-12">
            These links point to external documents maintained by their respective organizations.
          </p>
        </div>
      </main>
    </div>
  );
}
