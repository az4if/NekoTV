import React from "react";
import PageHeader from "../components/PageHeader";

const About = () => {
  return (
    <div className="min-h-screen pb-10">
      <PageHeader title="About" />
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-neutral-900/50 rounded-lg p-6">
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">About NekoTV</h2>
              <p className="text-neutral-300">
                NekoTV is a free anime streaming platform dedicated to providing high-quality content to anime enthusiasts worldwide. Our platform offers a vast collection of anime series and movies with both subbed and dubbed options.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Our Mission</h2>
              <p className="text-neutral-300">
                Our mission is to create a seamless and enjoyable anime watching experience for our users. We strive to maintain an ad-free environment while ensuring easy access to a wide range of anime content.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Content Sourcing</h2>
              <p className="text-neutral-300">
                NekoTV does not host any video files on its servers. Instead, we embed content from various third-party sources. We are committed to respecting intellectual property rights and respond promptly to any valid DMCA takedown requests.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Community Guidelines</h2>
              <p className="text-neutral-300">
                We foster a respectful and inclusive community for all anime fans. We encourage constructive discussions and responsible sharing of opinions while maintaining a spoiler-free environment for new viewers.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#89bcf8] mb-3">Contact Us</h2>
              <p className="text-neutral-300">
                If you have any questions, suggestions, or concerns, please feel free to reach out to us at{" "}
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

export default About;
