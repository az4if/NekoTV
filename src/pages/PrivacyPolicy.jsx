import React from "react";
import PageHeader from "../components/PageHeader";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pb-10">
      <PageHeader title="Privacy Policy" />
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-neutral-900/50 rounded-lg p-6">
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Data Collection</h2>
              <p className="text-neutral-300">
                We collect minimal user data necessary for the functioning of AniMix, such as account information and user preferences.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Use of Data</h2>
              <p className="text-neutral-300">
                The data collected is used to improve service quality and user experience. We do not share personal data with third parties except as required by law.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Cookies and Tracking</h2>
              <p className="text-neutral-300">
                AniMix uses cookies and similar tracking technologies to enhance the user experience like caching video timestamps and tracking watched content.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Third-Party Services</h2>
              <p className="text-neutral-300">
                Embedded videos from third-party sites may have their own privacy policies, and we advise users to read these policies on the respective sites.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Security</h2>
              <p className="text-neutral-300">
                We are committed to ensuring your data is secure but remind users that no method of transmission over the Internet is 100% secure.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Changes to Privacy Policy</h2>
              <p className="text-neutral-300">
                We may update our Privacy Policy from time to time. We will notify users of any changes by posting the new policy on this page.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Contact Us</h2>
              <p className="text-neutral-300">
                If you have any questions about these terms, please contact us at{" "}
                <a href="mailto:nekotv-anime@proton.me" className="text-[#89bcf8] hover:underline">
                  nekotv-anime@proton.me
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
