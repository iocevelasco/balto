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

        <section ref={definitionsRef}>
          <h2>Definitions</h2>
          <ul>
            <li>
              <strong>Application:</strong> The software available for mobile devices and/or web
              access provided by [Name of the Web Application] to facilitate the pet adoption
              process.
            </li>
            <li>
              <strong>Foundation:</strong> A non-profit organization dedicated to rescuing and
              adopting pets, registered and using the Application.
            </li>
            <li>
              <strong>Pets:</strong> Animals that are available for adoption through the Application
              and are under the custody of the Foundation.
            </li>
            <li>
              <strong>Adopter:</strong> A person or family interested in adopting a pet using the
              Application.
            </li>
            <li>
              <strong>User:</strong> Includes both Foundations and Adopters using the Application.
            </li>
          </ul>
        </section>

        <section ref={registrationRef}>
          <h2>Registration and Obligations of the Foundation</h2>
          <ul>
            <li>
              <strong>Registration:</strong> The Foundation must provide accurate and complete
              information when registering in the Application, and update it when necessary. The
              Foundation guarantees the truthfulness of the information provided.
            </li>
            <li>
              <strong>Content Responsibility:</strong> The Foundation is responsible for the content
              related to the pets it publishes in the Application, including descriptions, photos,
              and health data.
            </li>
            <li>
              <strong>Animal Welfare:</strong> The Foundation must ensure that all pets under its
              care receive the necessary veterinary attention, adequate feeding, and appropriate
              living conditions until they are adopted.
            </li>
            <li>
              <strong>Adoption Process:</strong> The Foundation must follow the adoption procedure
              established by the Application, including the evaluation and selection of potential
              adopters.
            </li>
          </ul>
        </section>

        <section ref={useRef}>
          <h2>Use of the Application</h2>
          <ul>
            <li>
              <strong>Limited License:</strong> The Application grants the Foundation a limited,
              non-exclusive, non-transferable license to use the Application in connection with its
              pet adoption activities.
            </li>
            <li>
              <strong>Prohibitions:</strong> The Foundation agrees not to use the Application for
              illegal or fraudulent activities, nor to violate the rights of third parties.
            </li>
            <li>
              <strong>Security:</strong> The Foundation must take reasonable measures to maintain
              the confidentiality and security of its access credentials to the Application.
            </li>
          </ul>
        </section>

        <section ref={dataProtectionRef}>
          <h2>Data Protection</h2>
          <ul>
            <li>
              <strong>Confidentiality:</strong> The Foundation must handle any personal information
              obtained through the Application confidentially, respecting privacy policies.
            </li>
            <li>
              <strong>Regulatory Compliance:</strong> The Foundation must comply with all applicable
              laws and regulations regarding personal data protection.
            </li>
          </ul>
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

        <section ref={signaturesRef}>
          <h2>Signatures</h2>
          <p>
            <strong>On behalf of the Foundation:</strong>
            <br />
            Name:
            <br />
            Position:
            <br />
            Signature:
            <br />
            Date:
          </p>
          <p>
            <strong>On behalf of the Application:</strong>
            <br />
            Name:
            <br />
            Position:
            <br />
            Signature:
            <br />
            Date:
          </p>
        </section>
      </div>
    </div>
  )
}

export { TermsAndConditions }
