import React, { useRef } from 'react'

const TermsAndConditions = () => {
  const introRef = useRef<HTMLElement>(null)
  const definitionsRef = useRef<HTMLElement>(null)
  const registrationRef = useRef<HTMLElement>(null)
  const useApplicationRef = useRef<HTMLElement>(null)
  const dataProtectionRef = useRef<HTMLElement>(null)
  const terminationRef = useRef<HTMLElement>(null)
  const liabilityRef = useRef<HTMLElement>(null)
  const changesRef = useRef<HTMLElement>(null)
  const lawRef = useRef<HTMLElement>(null)
  const signaturesRef = useRef<HTMLElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: '20%', padding: '20px' }}>
        <h2>Table of Contents</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li onClick={() => scrollToSection(introRef)}>Introduction</li>
          <li onClick={() => scrollToSection(definitionsRef)}>Definitions</li>
          <li onClick={() => scrollToSection(registrationRef)}>Registration and Obligations</li>
          <li onClick={() => scrollToSection(useApplicationRef)}>Use of the Application</li>
          <li onClick={() => scrollToSection(dataProtectionRef)}>Data Protection</li>
          <li onClick={() => scrollToSection(terminationRef)}>Termination and Suspension</li>
          <li onClick={() => scrollToSection(liabilityRef)}>Limitation of Liability</li>
          <li onClick={() => scrollToSection(changesRef)}>Changes to the Terms</li>
          <li onClick={() => scrollToSection(lawRef)}>Applicable Law and Jurisdiction</li>
          <li onClick={() => scrollToSection(signaturesRef)}>Signatures</li>
        </ul>
      </div>
      <div style={{ width: '80%', padding: '20px' }}>
        <h1>Terms and Conditions for Using the Web Application for Pet Adoption</h1>

        <section ref={introRef}>
          <h2>Introduction</h2>
          <p>
            Welcome to [Name of the Web Application] (hereinafter "the Application"), a platform
            dedicated to facilitating pet adoption through the participation of foundations. By
            using our Application, foundations (hereinafter "the Foundation") agree to comply with
            the following terms and conditions (hereinafter "the Terms").
          </p>
        </section>

        <section ref={terminationRef}>
          <h2>Termination and Suspension</h2>
          <ul>
            <li>
              <strong>Termination:</strong> The Application reserves the right to suspend or
              terminate the Foundation's access to the Application in case of violation of the
              Terms.
            </li>
            <li>
              <strong>Effects of Termination:</strong> Termination of access does not exempt the
              Foundation from its responsibilities for any actions or omissions occurring before the
              termination date.
            </li>
          </ul>
        </section>

        <section ref={liabilityRef}>
          <h2>Limitation of Liability</h2>
          <ul>
            <li>
              <strong>Limited Liability:</strong> The Application will not be responsible for any
              indirect, incidental, special, consequential, or punitive damages arising from the use
              of the Application.
            </li>
            <li>
              <strong>Warranties:</strong> The Application is provided "as is," without warranties
              of any kind, express or implied.
            </li>
          </ul>
        </section>

        <section ref={changesRef}>
          <h2>Changes to the Terms</h2>
          <ul>
            <li>
              <strong>Modifications:</strong> The Application reserves the right to modify the Terms
              at any time. Modifications will be effective upon being published in the Application.
            </li>
            <li>
              <strong>Acceptance of Changes:</strong> Continued use of the Application by the
              Foundation after the publication of modifications will constitute acceptance of such
              changes.
            </li>
          </ul>
        </section>

        <section ref={lawRef}>
          <h2>Applicable Law and Jurisdiction</h2>
          <p>
            This contract will be governed by and interpreted in accordance with the laws of the
            country where the Application has its main headquarters, without regard to its conflict
            of law principles. Any dispute arising in connection with these Terms will be subject to
            the exclusive jurisdiction of the competent courts of said headquarters.
          </p>
        </section>
      </div>
    </div>
  )
}

export { TermsAndConditions }
