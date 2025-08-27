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
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">DMCA Takedown Request Requirements</h2>
              <p className="text-neutral-300">
                We take the intellectual property rights of others seriously and require that our Users do the same. The Digital Millennium Copyright Act (DMCA) established a process for addressing claims of copyright infringement. If you own a copyright or have authority to act on behalf of a copyright owner and want to report a claim that a third party is infringing that material on or through GitLab's services, please submit a DMCA report on our Contact page, and we will take appropriate action.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">DMCA Report Requirements</h2>
              <ul className="text-neutral-300 list-disc pl-5 space-y-3">
                <li>A description of the copyrighted work that you claim is being infringed;</li>
                <li>A description of the material you claim is infringing and that you want removed or access to which you want disabled and the URL or other location of that material;</li>
                <li>Your name, title (if acting as an agent), address, telephone number, and email address;</li>
                <li>The following statement: "I have a good faith belief that the use of the copyrighted material I am complaining of is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use)";</li>
                <li>The following statement: "The information in this notice is accurate and, under penalty of perjury, I am the owner, or authorized to act on behalf of the owner, of the copyright or of an exclusive right that is allegedly infringed";</li>
                <li>An electronic or physical signature of the owner of the copyright or a person authorized to act on the owner's behalf.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Submission Process</h2>
              <p className="text-neutral-300 mb-4">
                Your DMCA take down request should be submitted here:{" "}
                <a href="https://hianime.to/contact" className="text-[#89bcf8] hover:underline" target="_blank" rel="noopener noreferrer">
                  https://hianime.to/contact
                </a>
              </p>
              <p className="text-neutral-300">
                We will then review your DMCA request and take proper actions, including removal of the content from the website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DMCA;
