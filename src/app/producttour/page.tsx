import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
  {
    title: "New Features",
    description: "Explore our enhanced trading platform with integrated wallets, exchanges, and essential market insights.",
    details: [
      "Automated Indices Trading - Enjoy automated trading on selected indices.",
      "Automated Currency Trading - Trade currency pairs effortlessly with our automated system now!"
    ]
  },
  {
    title: "FxAuto Key Features",
    details: [
      "AI-Powered Market Predictions - Leverage AI-driven market forecasts to make informed trading decisions."
    ]
  },
  {
    title: "Need Help?",
    details: [
      "24/7 Phone Support - Call our customer service team anytime for immediate assistance.",
      "Call Now",
      "FAQs - View FAQs for detailed instructions on specific features.",
      "Product Tour - Stay informed with the latest updates and developments in FxAuto."
    ]
  },
  {
    title: "Your trusted forex bot",
    description: "Here at FxAuto, we are committed to user protection with strict protocol and industry-leading technical measures.",
    details: [
      "Secure Asset Fund for Users (SAFU) - Our trading bot allocates 10% of platform fees to a secure asset fund, providing an additional layer of protection for user funds.",
      "Personalized Access Control - Advanced security features allow you to restrict device and IP address access, ensuring only authorized users can control your trading bot.",
      "End-to-End Encryption - Your transaction data is safeguarded with industry-leading encryption, ensuring complete privacy and security for all your trading activities."
    ]
  }
];

export default function ProductTour() {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Product Tour</h1>
      {sections.map((section, index) => (
        <Card key={index} className="p-4">
          <h2 className="text-xl font-semibold">{section.title}</h2>
          {section.description && <p className="text-gray-600 mt-2">{section.description}</p>}
          {expanded[index] && (
            <CardContent className="mt-4 space-y-2">
              {section.details.map((detail, i) => (
                <p key={i} className="text-gray-700">{detail}</p>
              ))}
            </CardContent>
          )}
          <Button onClick={() => toggleExpand(index)} className="mt-3">
            {expanded[index] ? "Show Less" : "Learn More"}
          </Button>
        </Card>
      ))}
    </div>
  );
}
