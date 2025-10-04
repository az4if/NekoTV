import React from "react";
import PageHeader from "../components/PageHeader";

const TermsOfService = () => {
  return (
    <div className="min-h-screen pb-10">
      <PageHeader title="Terms of Service" />
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-neutral-900/50 rounded-lg p-6">
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Acceptance of Terms</h2>
              <p className="text-neutral-300">
                By using NekoTV, you agree to these Terms of Service and acknowledge that they affect your legal rights and obligations.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Content</h2>
              <p className="text-neutral-300">
                NekoTV does not host video content but embeds videos from various third-party sources. We are not responsible for the content, quality, or the policies of these external sites.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">User Content & Disqus Rules</h2>
              <p className="text-neutral-300 mb-3">Users are welcome to share their thoughts responsibly. To maintain a respectful environment:</p>
              <ul className="text-neutral-300 list-disc pl-5 space-y-2">
                <li>Be respectful: Treat others with courtesy and avoid offensive language</li>
                <li>Stay on-topic: Ensure your comments contribute to the discussion</li>
                <li>Avoid spoilers: Don't reveal major plot points</li>
              </ul>
              <p className="text-neutral-300 mt-3">
                Comments that violate these guidelines may be removed at our discretion.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Use of Site</h2>
              <p className="text-neutral-300">
                The service is provided "as is" and is used at the user's own risk. Users must not misuse the service in any way that breaches laws or regulations.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Intellectual Property</h2>
              <p className="text-neutral-300">
                The intellectual property rights of the embedded videos remain with their respective owners. NekoTV respects these rights and does not claim ownership of this content.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Changes to Terms of Service</h2>
              <p className="text-neutral-300">
                We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Termination</h2>
              <p className="text-neutral-300">
                We may terminate or suspend access to our service immediately, without prior notice, for any breach of these Terms. Upon termination, users must cease all use of the service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
