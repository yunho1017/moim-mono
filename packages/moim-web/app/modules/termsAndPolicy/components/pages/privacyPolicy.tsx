import * as React from "react";

import {
  Section,
  Description,
  UlWrapper,
  UlDashWrapper,
  StyledHeadingOne,
  StyledHeadingThree,
  StyledBodyOne,
} from "./styled";

export default function PrivacyPolicy() {
  return (
    <Section>
      <StyledHeadingOne>
        Privacy Policy
        <Description>Last Updated: April 20, 2020</Description>
      </StyledHeadingOne>

      <StyledBodyOne>
        Your access to, and use of, the Site and Services is subject to CAN's
        Terms of Use (each, the “Terms”). Subject to the provisions of
        applicable laws, any personal information you submit to CAN will not be
        used in any manner to which you have not consented. This privacy policy
        (“Privacy Policy”) describes how CAN protects the privacy and security
        of personally identifiable information of users of our Site and
        Services. Any capitalized terms used but not defined in this Privacy
        Policy have the respective meanings given them in the applicable Terms.
        By using the Site or Services, you consent to the collection and use of
        your personal information by CAN in accordance with this Privacy Policy.
        If you do not agree to the terms of this Privacy Policy, please do not
        use the Site or Services. If we decide to change our Privacy Policy, we
        will post those changes on this page. Policy changes will apply only to
        information collected after the date of the change.
      </StyledBodyOne>

      <UlWrapper>
        <li>
          <StyledHeadingThree id="What does this Privacy Policy cover?">
            1. What does this Privacy Policy cover?
          </StyledHeadingThree>
          <StyledBodyOne>
            This Privacy Policy covers how CAN treats personally identifiable
            information that it collects and receives through the Site or
            Services. Personal information is information about you that is
            personally identifiable (e.g., your name, address, email address or
            phone number) and not otherwise publicly available.
          </StyledBodyOne>
        </li>

        <li>
          <StyledHeadingThree id="What information do we collect?">
            2. What information do we collect?
          </StyledHeadingThree>
          <StyledBodyOne>
            We may collect personal information under the following
            circumstances.
          </StyledBodyOne>
          <UlDashWrapper>
            <StyledBodyOne>
              <li>
                When you create an account, we may ask you for your email
                address or other personal information. You may, however, visit
                our Site without providing such personal information.
              </li>
            </StyledBodyOne>
            <StyledBodyOne>
              <li>
                We use IP addresses and session identifiers to analyze trends,
                to administer the Site and Services, to track user activities,
                to infer user interests, and to otherwise induce, deduce, and
                gather information about individual users and market segments.
              </li>
            </StyledBodyOne>

            <StyledBodyOne>
              <li>
                We may also collect your geographic location, browser type,
                operating system and other software or hardware information.
              </li>
            </StyledBodyOne>

            <StyledBodyOne>
              <li>
                We use internal tools and third party applications and services
                (such as Google Analytics) to collect and analyze information.
              </li>
            </StyledBodyOne>

            <StyledBodyOne>
              <li>
                Like many websites, we use "cookies" to enhance your experience
                and gather information about visitors and visits to our Site.
                Please refer to the "Do we use 'cookies'?" section below for
                information about cookies and how we use them.
              </li>
            </StyledBodyOne>

            <StyledBodyOne>
              <li>
                We will also collect any information that you provide to us if
                you create a personal profile, search our Site or Services, post
                Member Content or correspond with CAN.
              </li>
            </StyledBodyOne>
          </UlDashWrapper>
        </li>

        <li>
          <StyledHeadingThree id="How do we use your information?">
            3. How do we use your information?
          </StyledHeadingThree>
          <StyledBodyOne>
            We may use the information we collect from you in the following
            ways:
          </StyledBodyOne>
          <UlDashWrapper>
            <StyledBodyOne>
              <li>
                To personalize your Site experience and the Services and to
                allow us to deliver the type of content and product offerings in
                which you are most interested.
              </li>
            </StyledBodyOne>

            <StyledBodyOne>
              <li>
                To allow us to provide better service and respond to your
                customer service requests.
              </li>
            </StyledBodyOne>

            <StyledBodyOne>
              <li>To quickly process your transactions.</li>
            </StyledBodyOne>

            <StyledBodyOne>
              <li>
                To administer a promotion, survey or other Site or Services
                feature.
              </li>
            </StyledBodyOne>

            <StyledBodyOne>
              <li>
                To respond to subpoenas, search warrants, judicial proceedings,
                court orders, legal process, or other law enforcement measures,
                to establish or exercise our legal rights, or to defend against
                legal claims.
              </li>
            </StyledBodyOne>

            <StyledBodyOne>
              <li>
                To investigate, prevent, or take action regarding alleged or
                actual illegal activities, including fraud, situations involving
                potential threats to the physical safety or other rights and
                interests of any person, violations of the applicable Terms, or
                as otherwise required by law.
              </li>
            </StyledBodyOne>

            <StyledBodyOne>
              <li>
                We may also share information about you for any other purposes
                disclosed to you at the time we collect your information or
                pursuant to your consent.
              </li>
            </StyledBodyOne>
          </UlDashWrapper>
        </li>

        <li>
          <StyledHeadingThree id="Do we disclose the information we collect to outside parties?">
            4. Do we disclose the information we collect to outside parties?
          </StyledHeadingThree>
          <StyledBodyOne>
            We generally do not sell, trade, or otherwise transfer to outside
            parties your personally identifiable information unless we provide
            you with advance notice, except as described in this Privacy Policy.
            The term "outside parties" does not include our affiliates and any
            other parties who assist us in offering Services, conducting our
            business, or servicing you, so long as those parties agree to keep
            this information confidential. If we sell our company, or otherwise
            transfer any assets of our company, we may provide your personal
            information to the purchaser so that you may continue the
            relationship or business with us and our products. We may also
            release your personal information when we believe release is
            appropriate to comply with the law, enforce our policies, or protect
            ours or others' rights, property, or safety.
            <br />
            However, non personally identifiable information may be provided to
            other parties for marketing, advertising, or other uses.
          </StyledBodyOne>
        </li>

        <li>
          <StyledHeadingThree id={`Do we use "cookies"?`}>
            5. Do we use "cookies"?
          </StyledHeadingThree>

          <StyledBodyOne>
            Yes. Cookies are small files that a site or its service provider
            transfers to your computer's hard drive through your browser (if you
            allow) that enables the site's or service provider's systems to
            recognize your browser and capture and remember certain information.
            For instance, we use cookies to help us remember items you have
            searched for in the past. Cookies are also used to help us
            understand your preferences based on previous or current site
            activity, which enables us to provide you with improved Services. We
            also use cookies to help us compile aggregate data about site
            traffic and site interaction so that we can offer better site
            experiences and tools in the future. We may contract with third
            party service providers to assist us in better understanding our
            Site visitors and Members. These service providers are not permitted
            to use the information collected on our behalf except to help us
            conduct and improve our business.
            <br />
            You can choose to have your computer warn you each time a cookie is
            being sent, or you can choose to turn off all cookies. You do this
            through your browser (such as Mozilla Firefox or Google Chrome)
            settings. Each browser is a little different, so look at your
            browser Help menu to learn the correct way to modify your cookies.
            If you turn cookies off, you won't have access to many features that
            make your Site experience more efficient and some of our services
            will not function properly, and registered users may not be able to
            login properly.
          </StyledBodyOne>
        </li>

        <li>
          <StyledHeadingThree id="How do I opt out information collection?">
            6. How do I opt out information collection?
          </StyledHeadingThree>

          <StyledBodyOne>
            You may opt out of information collection by deactivating your
            account. You can deactivate your account at any time by visiting the
            preference page of your profile. Although your account will be
            disabled, all of your posts and content submissions will remain on
            the website and publicly available. CAN is under no obligation to
            remove any publicly available Member Content after your account has
            been deactivated.
          </StyledBodyOne>
        </li>

        <li>
          <StyledHeadingThree id="How do we safeguard your personal information?">
            7. How do we safeguard your personal information?
          </StyledHeadingThree>
          <StyledBodyOne>
            CAN follows generally accepted industry security standards to
            safeguard and help prevent unauthorized access, maintain data
            security and correctly use your personally identifiable information.
            However, no commercial method of information transfer over the
            Internet or electronic data storage is known to be 100% secure. As a
            result, we cannot guarantee the absolute security of that
            information during its transmission or its storage in our systems.
          </StyledBodyOne>
        </li>

        <li>
          <StyledHeadingThree id="Does this Privacy Policy cover third party links?">
            8. Does this Privacy Policy cover third party links?
          </StyledHeadingThree>
          <StyledBodyOne>
            This Privacy Policy applies solely to information collected by our
            Site. In an attempt to provide you with increased value, we may
            include third party links on our Site. These linked sites have
            separate and independent privacy policies. We therefore have no
            responsibility or liability for the content and activities of these
            linked sites. Nonetheless, we seek to protect the integrity of our
            Site and welcome any feedback about these linked sites (including if
            a specific link does not work).
          </StyledBodyOne>
        </li>

        <li>
          <StyledHeadingThree id="Does this Privacy Policy apply to offline information?">
            9. Does this Privacy Policy apply to offline information?
          </StyledHeadingThree>
          <StyledBodyOne>
            This Privacy Policy applies only to information collected through
            our Site or Services and not to information collected offline.
          </StyledBodyOne>
        </li>

        <li>
          <StyledHeadingThree id="How do you ask questions and provide feedback?">
            10. How do you ask questions and provide feedback?
          </StyledHeadingThree>
          <StyledBodyOne>
            If you have questions about this Privacy Policy or any feedback,
            please contact our privacy team at support@canfoundation.io.
          </StyledBodyOne>
        </li>

        <li>
          <StyledHeadingThree id="What happens if you are a non Singapore resident?">
            11. What happens if you are a non Singapore resident?
          </StyledHeadingThree>
          <StyledBodyOne>
            It is important to note that the Site and Services are offered under
            Singapore law. If you are located outside of Singapore, please be
            aware that any visitor information you provide to us will be
            transferred to Singapore and/or other countries. By using the Site
            or Services and/or providing us with your visitor information, you
            consent to this transfer.
          </StyledBodyOne>
        </li>

        <li>
          <StyledHeadingThree id="How do you correct or update personal information?">
            12. How do you correct or update personal information?
          </StyledHeadingThree>
          <StyledBodyOne>
            You can correct or update your personal information by
            reregistering, updating your profile, or by contacting us by
            electronic mail at support@canfoundation.io.
            <br />
            However, we will maintain copies of your information to the extent
            retained as part of our standard backup/archive process. In
            addition, these procedures will not remove any of your information
            that you have provided to other users or third parties, or that has
            been collected from you by third parties linked from the Site or
            Services.
          </StyledBodyOne>
        </li>

        <li>
          <StyledHeadingThree>
            How do we protect children’s privacy?
          </StyledHeadingThree>
          <StyledHeadingThree className="withoutBottomPadding">
            Under Age 13
          </StyledHeadingThree>
          <StyledBodyOne>
            We understand the importance of protecting children’s privacy in the
            interactive online world. The Site and Services are not designed
            for, or intentionally targeted at, children thirteen (13) years of
            age or younger. It is not our policy to intentionally collect or
            maintain information about anyone under the age of thirteen (13). No
            one under the age of thirteen (13) should submit any personal
            information to CAN.
          </StyledBodyOne>
          <StyledHeadingThree className="withoutBottomPadding">
            Under Age 18
          </StyledHeadingThree>
          <StyledBodyOne>
            Minors under 18 years of age may have the personal information that
            they have provided to CAN while using this Site or the Services
            deleted by sending an email to support@canfoundation.io requesting
            deletion. Please note that, while we make reasonable efforts to
            comply with such requests, deletion of your personal information
            does not ensure complete and comprehensive removal of that data from
            all systems.
          </StyledBodyOne>
        </li>
      </UlWrapper>
    </Section>
  );
}
