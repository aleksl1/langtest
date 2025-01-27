import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">2. Use License</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Permission is granted to temporarily access the materials on our website</li>
            <li>This is the grant of a license, not a transfer of title</li>
            <li>You may not modify or copy the materials</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">3. User Account</h2>
          <p>To access certain features of the website, you may be required to create an account. You are responsible for:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Maintaining the confidentiality of your account</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us of any unauthorized use of your account</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">4. Disclaimer</h2>
          <p>The materials on the website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">5. Limitations</h2>
          <p>In no event shall we or our suppliers be liable for any damages arising out of the use or inability to use the materials on our website.</p>
        </section>
      </div>
    </div>
  );
};

export default Terms; 