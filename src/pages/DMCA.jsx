import React from "react";
import PageHeader from "../components/PageHeader";

const DMCA = () => {
  return (
    <div className="min-h-screen pb-10">
      <PageHeader title="DMCA" />
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-neutral-900/50 rounded-lg p-6">
          <div className="prose prose-invert max-w-none">
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">
                DMCA Takedown Notice
              </h2>
              <p className="text-neutral-300">
                We respect the intellectual property rights of creators and expect our users to do the same. 
                Under the Digital Millennium Copyright Act (DMCA), copyright 
                holders or their authorized representatives may request the removal of infringing material. 
                If you believe that your copyrighted work has been used on our website without authorization, 
                you may file a DMCA takedown request, and we will take appropriate action.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">
                What to Include in a DMCA Report
              </h2>
              <ul className="text-neutral-300 list-disc pl-5 space-y-3">
                <li>A clear description of the copyrighted work you believe is being infringed.</li>
                <li>A description of the infringing material, including the URL or exact location where it appears on our site.</li>
                <li>Your full name, title (if acting on behalf of the copyright owner), mailing address, phone number, and email address.</li>
                <li>
                  The following statement: 
                  <br />
                  <em>
                    "I have a good faith belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law."
                  </em>
                </li>
                <li>
                  The following statement: 
                  <br />
                  <em>
                    "The information in this notice is accurate, and under penalty of perjury, I am the copyright owner or am authorized to act on behalf of the owner of an exclusive right that is allegedly infringed."
                  </em>
                </li>
                <li>An electronic or physical signature of the copyright owner or an authorized representative.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">
                How to Submit Your Request
              </h2>
              <p className="text-neutral-300 mb-4">
                Please send your complete DMCA takedown notice via email to:{" "}
                <a
                  href="mailto:nekotv-anime@proton.me"
                  className="text-[#89bcf8] hover:underline"
                >
                  nekotv-anime@proton.me
                </a>
              </p>
              <p className="text-neutral-300">
                Once received, we will review your request and take the necessary steps, 
                which may include removing or disabling access to the infringing content.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DMCA;
