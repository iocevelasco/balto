import { Flex } from '@radix-ui/themes'
import { Button } from 'src/ui/design-system/Button'

const TermsAndConditions = () => {
  return (
    <Flex
      direction="column"
      gap="3"
      p={{
        initial: '3',
        md: '5',
        lg: '7',
      }}
    >
      <h1>Terms and Conditions for Using the Web Application for Pet Adoption</h1>

      <section>
        <h2>Introduction</h2>
        <p>
          Welcome to Balto, a platform dedicated to facilitating pet adoption through the
          participation of foundations. By using our Application, foundations agree to comply with
          the following terms and conditions
        </p>
      </section>

      <section>
        <h2>Termination and Suspension</h2>
        <ul>
          <li>
            <strong>Termination:</strong> The Application reserves the right to suspend or terminate
            the Foundation's access to the Application in case of violation of the Terms.
          </li>
          <li>
            <strong>Effects of Termination:</strong> Termination of access does not exempt the
            Foundation from its responsibilities for any actions or omissions occurring before the
            termination date.
          </li>
        </ul>
      </section>

      <section>
        <h2>Limitation of Liability</h2>
        <ul>
          <li>
            <strong>Limited Liability:</strong> The Application will not be responsible for any
            indirect, incidental, special, consequential, or punitive damages arising from the use
            of the Application.
          </li>
          <li>
            <strong>Warranties:</strong> The Application is provided "as is," without warranties of
            any kind, express or implied.
          </li>
        </ul>
      </section>

      <section>
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

      <section>
        <h2>Applicable Law and Jurisdiction</h2>
        <p>
          This contract will be governed by and interpreted in accordance with the laws of the
          country where the Application has its main headquarters, without regard to its conflict of
          law principles. Any dispute arising in connection with these Terms will be subject to the
          exclusive jurisdiction of the competent courts of said headquarters.
        </p>
      </section>
    </Flex>
  )
}

export { TermsAndConditions }
