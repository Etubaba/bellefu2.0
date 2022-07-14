import Head from "next/head";
import RegisterHeader from "../components/usercomponent/RegisterHeader";

const TermsandConditions = () => {
  return (
    <div className="mt-32">
      <Head>
        <title>Policy and Privacy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RegisterHeader
        firstLink={{
          firstLinkText: "Policy and Privacy",
          firstLinkUrl: "/policy",
        }}
        secondLink={{
          secondLinkText: "Terms and Conditions",
          secondLinkUrl: "/terms-and-conditions",
        }}
        customWidth={true}
      />
      <div className="md:mx-28">
        <h1 className="capitalize text-bellefuOrange underline font-bold text-xl md:text-2xl text-center">
          Bellefu Terms and Conditions
        </h1>
        <ol className="md:text-xl text-lg font-semibold md:font-bold">
          <li>
            <h3 className="mb-3">Acceptance of the terms</h3>
            <ol className="md:text-[16px] text-[10px] font-normal">
              <li className="mb-3">
                These Terms and Conditions (the “Terms”) constitute a binding
                and enforceable legal contract between Bellefu Agro Consult
                (“Bellefu”) and you. Please read these Terms carefully.
              </li>
              <li className="mb-3">
                Your access and use of the bellefu.com website and mobile
                applications, as well as any service, content, and data
                available via them (together, the “Service” or the “Platform”)
                are governed by these Terms.
              </li>
              <li className="mb-3">
                If you do not agree with any part of these Terms, or if you are
                not eligible or authorized to be bound by the Terms, then do not
                access or use the Service.
              </li>
              <li className="mb-3">
                Please also review our Privacy Policy. The terms of the Privacy
                Policy and other supplemental terms, rules, policies, or
                documents that may be posted on the Platform from time to time
                are hereby expressly incorporated herein by reference. We
                reserve the right, in our sole discretion, to make changes or
                modifications to these Terms at any time and for any reason with
                or without prior notice.
              </li>
            </ol>
          </li>
          <li>
            <h3 className="mb-3">Important Disclaimers</h3>
            <ol className="text-[16px] font-normal">
              <li className="mb-3">
                ALL SERVICES RENDERED BY THE BELLEFU ARE RENDERED “AS IS”, “AS
                AVAILABLE” AND “WITH ALL FAULTS”, AND BELLEFU DISCLAIMS ALL
                WARRANTIES, EXPRESSED OR IMPLIED, INCLUDING WITHOUT LIMITATION
                ANY GUARANTEES REGARDING CONDITION, QUALITY, LIFE DURATION,
                PERFORMANCE, ACCURACY, RELIABILITY, COMMERCIAL VALUE AND
                SUITABILITY FOR SPECIFIC PURPOSES. ALL SUCH WARRANTIES AND
                LIABILITIES ARE HEREBY EXCLUDED.
              </li>
              <li className="mb-3">
                BELLEFU HAS NO CONTROL OVER AND DOES NOT GUARANTEE THE
                EXISTENCE, QUALITY, SAFETY OR LEGALITY OF GOODS AND SERVICES
                PUBLISHED BY USERS ON THE PLATFORM; THE TRUSTWORTHINESS OR
                ACCURACY OF INFORMATION PROVIDED BY USERS IN THE ANNOUNCEMENTS;
                THE ABILITY OF SELLERS TO SELL GOODS OR TO PROVIDE SERVICES; THE
                ABILITY OF BUYERS TO PAY FOR GOODS OR SERVICES; OR THAT A USER
                WILL ACTUALLY COMPLETE A TRANSACTION. BELLEFU MAKES NO
                GUARANTEES CONCERNING THAT MANUFACTURING, IMPORT, EXPORT, OFFER,
                DISPLAYING, PURCHASE, SALE, ADVERTISING AND/OR USE OF PRODUCTS
                OR SERVICES, WHICH ARE OFFERED OR DISPLAYED ON THE PLATFORM DO
                NOT INFRINGE ANY THIRD PARTIES&apos; RIGHTS. THEREFORE, BELLEFU
                EXPRESSLY DISCLAIMS ANY LIABILITY IN CONNECTION TO MATERIALS AND
                INFORMATION POSTED BY USERS ON THE PLATFORM.
              </li>
              <li className="mb-3">
                YOU ARE ENCOURAGED TO CHECK THE GOODS BEFORE PAYMENT AND TO
                REQUEST THE SELLER TO PROVIDE DOCUMENTS CONFIRMING COMPLIANCE OF
                THE GOODS WITH APPLICABLE REQUIREMENTS OF LAWS, REGULATIONS,
                RULES, GUIDELINES, STANDARDS.
              </li>
              <li className="mb-3">
                YOU ACKNOWLEDGE THAT YOU ARE SOLELY RESPONSIBLE FOR YOUR SAFETY
                AND YOU UNDERSTAND THAT YOU SHOULD MEET WITH OTHER INDIVIDUALS
                FOR COMPLETION OF A TRANSACTION ONLY IN SAFE PUBLIC PLACES IN
                DAYLIGHT HOURS. YOU ARE SOLELY RESPONSIBLE FOR CONDUCTING DUE
                DILIGENCE OF ANY INDIVIDUAL OR ORGANIZATION REQUESTING A MEETING
                TO CONDUCT A JOB INTERVIEW OR TO COMPLETE A TRANSACTION. BELLEFU
                DISCLAIMS ANY RESPONSIBILITY FOR USER’S INTERACTION WITH ANY
                INDIVIDUAL OR ORGANIZATION.
              </li>
            </ol>
          </li>
          <li>
            <h3 className="mb-3">Account registration</h3>
            <ol className="text-[16px] font-normal">
              <li className="mb-3">
                In order to use certain features of the Service you may need to
                register an account on the Platform (the “Account”) and provide
                certain information about yourself as prompted by the
                registration form.
              </li>
              <li className="mb-3">
                You may create an Account as an individual or as an authorized
                representative of a company.
              </li>
              <li className="mb-3">
                You acknowledge that you are solely responsible for safeguarding
                and maintaining the confidentiality of access details to your
                Account and that you are fully responsible and liable for any
                activity performed using your Account access details.
              </li>
              <li className="mb-3">
                You hereby represent and warrant to us that you have reached the
                age of majority or are accessing the Service under the
                supervision of a parent or legal guardian. All users who are
                minors in the jurisdiction in which they reside (generally under
                the age of 18) must have the permission of, and be directly
                supervised by, their parent or guardian to use the Service. If
                you are a minor, you must have your parent or guardian read and
                agree to these Terms prior to you using the Service.
              </li>
              <li className="mb-3">
                {" "}
                We reserve the right to suspend or terminate your Account, or
                your access to the Service, with or without notice to you, in
                the event that you breach these Terms.
              </li>
              <li className="mb-3">
                You agree to immediately notify us of any unauthorized use, or
                suspected unauthorized use of your Account or any other breach
                of security. We cannot and will not be liable for any loss or
                damage arising from your failure to comply with the above
                requirements.
              </li>
            </ol>
          </li>
          <li>
            <h3 className="mb-3">Service</h3>
            <ol className="text-[16px] font-normal">
              <li className="mb-3">
                The Platform is an online service that allows users to create
                and publish announcements, to view announcements published by
                other users, to communicate with other users using the contact
                details provided in the announcements.
              </li>
              <li className="mb-3">
                The BELLEFU itself is not an importer, manufacturer,
                distributor, or seller of any item, as well as not a provider of
                any service posted by users on the Platform. In addition, the
                BELLEFU is neither a marketer nor a person acting on user's
                behalf with respect to the marketing of any goods or services
                posted on the Platform. The actual sale and purchase contracts
                or services contracts are entered into directly between the
                users, and the BELLEFU itself is not a party to such
                transactions. The BELLEFU provides users with an opportunity to
                communicate.
              </li>
              <li className="mb-3">
                Users shall be solely responsible to collect and remit any
                applicable taxes resulting from the sale of their goods or
                services posted on the Platform.
              </li>
              <li className="mb-3">
                The BELLEFU is authorized to delete or block announcements of
                users regardless of providing a user with the relevant
                substantiation.
              </li>
              <li className="mb-3">
                The BELLEFU retains the right to implement any changes to the
                Service (whether to free or paid features) at any time, with or
                without notice. You acknowledge that a variety of BELLEFU&apos;s
                actions may impair or prevent you from accessing the Service at
                certain times and/or in the same way, for limited periods or
                permanently, and agree that the BELLEFU has no responsibility or
                liability as a result of any such actions or results, including,
                without limitation, for the deletion of, or failure to make
                available to you, any content or services.
              </li>
              <li className="mb-3">
                Each user of the Service is solely responsible for any and all
                his or her User Content (as defined below). Because we do not
                control the User Content, you acknowledge and agree that we are
                not responsible for any User Content and we make no guarantees
                regarding the accuracy, currency, suitability, or quality of any
                User Content, and we assume no responsibility for any User
                Content. Your interactions with other Service users are solely
                between you and such user. You agree that the BELLEFU will not
                be responsible for any loss or damage incurred as the result of
                any such interactions. If there is a dispute between you and any
                Service user, we are under no obligation to become involved.
              </li>
              <li className="mb-3">
                The Service may contain links to third-party websites or
                resources and advertisements for third parties (collectively,
                "Third Party Ads"). Such Third-Party Ads are not under the
                control of the BELLEFU and the BELLEFU is not responsible for
                any Third-Party Ads. The BELLEFU provides these Third-Party Ads
                only as a convenience and does not review, approve, monitor,
                endorse, warrant, or make any representations with respect to
                Third-Party Ads. Advertisements and other information provided
                by online properties to which the Third Party Ads lead, may not
                be wholly accurate. You acknowledge sole responsibility for and
                assume all risk arising from your use of any such online
                properties. When you link to third party online properties, the
                applicable service provider's terms and policies, including
                privacy and data gathering practices, govern. You should make
                whatever investigation you feel necessary or appropriate before
                proceeding with any transaction with any third party. Your
                transactions and other dealings with Third-Party Ads that are
                found on or through the Service, including payment and delivery
                of related goods or services, are solely between you and such
                third party.
              </li>
              <li className="mb-3">
                You hereby release us, our officers, employees, agents, and
                successors from claims, demands any and all losses, damages,
                rights, claims, and actions of any kind including personal
                injuries, death, and property damage, that is either directly or
                indirectly related to or arises from any interactions with or
                conduct of any Service users or any Third Party Ads.
              </li>
            </ol>
          </li>
          <li>
            <h3 className="mb-3">Posting of Annoucements by users</h3>
            <ol className="text-[16px] font-normal">
              <li className="mb-3">
                A user shall provide to the BELLEFU any documents confirming the
                legitimacy of posting of announcements and identity documents
                upon the BELLEFU&apos;s request.
              </li>
              <li className="mb-3">
                A user, who posts announcements with regard to sale of goods or
                services on the Platform, shall provide precise and complete
                information about such goods and services, as well as about the
                terms and conditions of sale and services provision.
              </li>
              <li className="mb-3">
                The terms and conditions of sale and services provision
                developed by the user shall not interfere with these Terms and
                applicable laws.
              </li>
              <li className="mb-3">
                Price of goods or services shall be exact. If it is perceived to
                be changed due to any specific circumstances, this shall be
                provided in the announcement.
              </li>
            </ol>
          </li>
          <li>
            <h3 className="mb-3">Fees</h3>
            <ol className="text-[16px] font-normal">
              <li className="mb-3">
                The Platform is generally free; however, it may contain payable
                services. For instance, we may set limits for publishing
                announcements in certain categories or offer advertising options
                for announcements on the Platform.
              </li>
              <li className="mb-3">
                The fees we charge for using payable services and payment
                methods accepted by us are disclosed on the Platform.
              </li>
              <li className="mb-3">
                We reserve the right, in our sole discretion, to change the fees
                and acceptable payment methods from time to time and for any
                reason.
              </li>
              <li className="mb-3">
                Unless otherwise explicitly provided by mandatory rules of the
                applicable law, the fees are non-refundable due to the nature of
                online services.
              </li>
            </ol>
          </li>
          <li>
            <h3 className="mb-3">User presentation and Warranties</h3>
            <ol className="text-[16px] font-normal">
              <h4 className="mb-3">
                By using the Service, you represent and warrant that:
              </h4>
              {/* <li className="mb-3"><h4>By using the Service, you represent and warrant that:</h4></li> */}
              <li className="mb-3">
                You have the legal capacity and you agree to comply with the
                Terms;
              </li>
              <li className="mb-3">
                If you register yourself as a representative of a legal entity,
                you are authorized by the company to enter into an agreement
                with us and with users of the Platform;
              </li>
              <li className="mb-3">You are above 18 years of age;</li>
              <li className="mb-3">
                You will or have provided true, accurate, and complete
                information in your Account;
              </li>
              <li className="mb-3">
                You will update your information on your Account to maintain its
                truthfulness, accuracy, and completeness;
              </li>
              <li className="mb-3">
                You will immediately change data for access to the Platform if
                you have a suspicion that your Account access details were
                disclosed or probably used by the third parties;
              </li>
              <li className="mb-3">
                You will notify the BELLEFU of any unauthorized access to your
                Account;
              </li>
              <li className="mb-3">
                You will not provide any false or misleading information about
                your identity or location in your Account;
              </li>
              <li className="mb-3">
                You will use the Service in strict abidance by applicable laws,
                regulations, rules, guidelines;
              </li>
              <li className="mb-3">
                You will not use the Service for any illegal or unauthorized
                purpose;
              </li>
              <li className="mb-3">
                You will not post on the Platform announcements that offer for
                sale or exchange any Prohibited Items.
              </li>
              <li className="mb-3">
                You will not post on the Platform announcements that infringe
                other person’s rights or interests, including any intellectual
                property rights or any other personal or proprietary rights of
                any third party.
              </li>
              <li>
                <p className="mb-3">
                  You will not post on the Platform announcements that include:
                </p>
                <ol>
                  <li className="mb-3">
                    false, misleading or deceptive statements;
                  </li>
                  <li className="mb-3">
                    personal or identifying information about minors or other
                    persons without the proper consent;
                  </li>
                  <li className="mb-3">
                    pornographic, overtly sexual materials;
                  </li>
                  <li className="mb-3">
                    depictions that encourage illegal or reckless use of weapons
                    and dangerous objects, or facilitate the purchase of
                    firearms or ammunition;
                  </li>
                  <li className="mb-3">
                    defamatory, discriminatory, mean-spirited, threatening or
                    harassing, improper, unacceptable materials, vulgar or
                    abusive language;
                  </li>
                  <li className="mb-3">
                    advocacy of hate, violence, discrimination, racism,
                    xenophobia, ethnic conflicts;
                  </li>
                  <li className="mb-3">
                    appeals to violence and unlawful actions;
                  </li>
                  <li className="mb-3">
                    offers of prostitution or other services contradicting moral
                    or legal norms;
                  </li>
                  <li className="mb-3">
                    services, provision of which is prohibited by the applicable
                    law;
                  </li>
                  <li className="mb-3">
                    information of solely promotional nature with no offers of
                    specific goods or services;
                  </li>
                  <li className="mb-3">
                    counterfeit and imitated goods or unauthorized copies.
                    Unauthorized copies include also goods having been acquired
                    by illegal means, pirated or stolen; and
                  </li>
                  <li className="mb-3">
                    direct or indirect references to any other web sites,
                    references or information about websites competing with the
                    Platform;
                  </li>
                </ol>
              </li>
              <li className="mb-3">
                You will not use software and pursue any other actions aimed to
                interference with the normal operation of the Platform;
              </li>
              <li className="mb-3">
                You will not promote or distribute unsolicited commercial
                emails, chain letters, Ponzi schemes through the Platform or by
                any other means towards other users of the Platform;
              </li>
              <li className="mb-3">
                You will not copy, modify, distribute any other User Content
                without consent of the respective user;
              </li>
              <li className="mb-3">
                You will not harvest or otherwise collect information about
                users, including email addresses, phone numbers, without their
                consent or otherwise violate the privacy of another person;
              </li>
              <li className="mb-3">
                You will not download, store, post, distribute and provide
                access to, or in any other way use worms, viruses, trojans, and
                other malware;
              </li>
              <li className="mb-3">
                You have a legal title to the items offered for sale in your
                announcement; and
              </li>
              <li className="mb-3">
                You have the necessary license or are otherwise authorized, as
                required by applicable law, to offer for sale, to advertise and
                distribute goods described in your announcement.
              </li>
            </ol>
          </li>
          <li>
            <h1 className="mb-3">Indentity</h1>
            <p className="text-[16px] font-normal">
              You agree to indemnify and hold the BELLEFU, its successors,
              subsidiaries, affiliates, related companies, its suppliers,
              licensors and partners, and the officers, directors, employees,
              agents, and representatives of each of them harmless from any
              claim or demand, including costs and attorneys&apos; fees, made by
              any third party due to or arising out of: (i) your use of the
              Platform; (ii) your User Content; (iii) your violation of any
              representation, warranty, covenant, or obligation stipulated in
              these Terms; (iv) your violation of any applicable law,
              industry-standard, regulation, guideline, rule; (v) any
              transaction entered into by you via the Platform or your violation
              of terms of such transaction. The BELLEFU reserves the right, at
              your expense, to assume the exclusive defense and control of any
              matter for which you are required to indemnify us and you agree to
              cooperate with our defense of these claims.
            </p>
          </li>
          <li>
            <h1 className="mb-3">Limitation of Liability</h1>
            <ol className="text-[16px] font-normal">
              <li className="mb-3">
                IN NO EVENT SHALL BELLEFU (AND ITS AFFILIATES) BE LIABLE TO YOU
                OR ANY THIRD PARTY FOR ANY LOST PROFIT OR ANY INDIRECT,
                CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE
                DAMAGES ARISING FROM THESE TERMS OR YOUR USE OF, OR INABILITY TO
                USE, THE SERVICE, OR THIRD-PARTY ADS, EVEN IF WE HAVE BEEN
                ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. ACCESS TO, AND USE
                OF, THE SERVICE, AND THIRD-PARTY ADS ARE AT YOUR OWN DISCRETION
                AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO
                YOUR COMPUTING SYSTEM OR LOSS OF DATA RESULTING THEREFROM.
              </li>
              <li className="mb-3">
                NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, YOU
                AGREE THAT THE AGGREGATE LIABILITY OF THE BELLEFU TO YOU FOR ANY
                AND ALL CLAIMS ARISING FROM THE USE OF THE SERVICE, CONTENT OF
                ANNOUNCEMENTS, IS LIMITED TO THE LESSER OF THE AMOUNTS YOU HAVE
                PAID, IF ANY, TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY
                CAUSE OF ACTION ARISING OR NGN30,000.
              </li>
            </ol>
          </li>
          <li>
            <h1 className="mb-3">Intellectual Property rights</h1>
            <ol className="text-[16px] font-normal">
              <li className="mb-3">
                Information you submit to us as part of your registration, and
                any data, text, pictures and other materials that you may submit
                or post on the Platform (the “User Content”) remain your
                intellectual property, and the BELLEFU does not claim any
                ownership of the copyright or other proprietary intellectual
                property rights in such registration information and the User
                Content. Notwithstanding the foregoing, you agree that the
                BELLEFU may retain copies of all registration information and
                the User Content and use such information and the User Content
                as reasonably necessary for or incidental to its operation of
                the Service and as described in these Terms and the Privacy
                Policy.
              </li>
              <li className="mb-3">
                You grant the BELLEFU the non-exclusive, worldwide,
                transferable, perpetual, irrevocable right to publish,
                distribute, publicly display and perform the User Content in
                connection with the Service.
              </li>
              <li className="mb-3">
                You agree, and represent and warrant, that your use of the
                Service, or any portion thereof, will neither infringe nor
                violate the rights of any other party or breach any contract or
                legal duty to any other parties.
              </li>
              <li className="mb-3">
                Materials on the Platform, except those posted by the user,
                including but not limited to texts, software, scripts, graphics,
                photos, sounds, music, videos, interactive functions, etc.{" "}
                <span className="font-bold">("Materials")</span> and trademarks,
                service marks and logos included in it{" "}
                <span className="font-bold">("Marks")</span> belong to or are
                licensed by the BELLEFU representing items of copyright and of
                any other intellectual property rights. Any use of such
                Materials and Marks without prior notice of the BELLEFU is not
                allowed.{" "}
                <span className="font-bold">
                  Notice for Claims of Intellectual Property Violations and
                  Copyright Infringement
                </span>
              </li>
              <li className="mb-3">
                If you are a holder of intellectual property rights or a person
                authorized to act in the name of a holder of intellectual
                property rights and you reasonably believe that information
                which is posted to the Platform someway infringes your
                intellectual property rights or intellectual property rights of
                a person, in which name you act, you may provide notification to
                the BELLEFU requiring to delete such material. In this regard,
                you shall warrant that your appeal has a legal basis, and you
                act in good faith according to law.
              </li>
              <li className="mb-3">
                <p>
                  When providing relevant notification concerning infringement
                  of rights you shall ensure that your request corresponds to
                  the form below and includes the following:
                </p>
                <ol className="text-[16px] font-normal">
                  <li className="mb-3">
                    an appeal should include the physical or electronic
                    signature of a person empowered for acting in the name of a
                    holder of the right, which is believed to be infringed;
                  </li>
                  <li className="mb-3">
                    the objects of intellectual property right, rights on which
                    were supposedly infringed, shall be specified. If several
                    objects exist, the entire list of such items shall be
                    provided;
                  </li>
                  <li className="mb-3">
                    you shall specify materials (with an indication of specific
                    URL-pages), which are stated to infringe rights or
                    themselves are the objects of infringement;
                  </li>
                  <li className="mb-3">
                    you shall provide contact information so that the BELLEFU
                    would be able to contact you, for example, address, phone
                    number, and email address;
                  </li>
                  <li className="mb-3">
                    signed application with regard to your faithful and
                    reasonable belief in those materials being the objects of
                    complaint concerning infringement of intellectual property
                    rights are used without a right holder&apos;s or its
                    representative&apos;s consent, and also that this is not
                    allowed by law;
                  </li>
                  <li className="mb-3">
                    signed application with regard to that a holder of
                    intellectual property rights releases the BELLEFU from any
                    third parties' claims related to deletion of relevant
                    materials by the BELLEFU;
                  </li>
                  <li className="mb-3">
                    signed application with regard to that information contained
                    in a notification is accurate under penalty of perjury, and
                    you are authorized to act in the name of a holder of the
                    exclusive right, which has been supposedly infringed;
                  </li>
                  <li className="mb-3">
                    statutory regulations which you believe to be violated in
                    connection to using of disputable content;
                  </li>
                  <li className="mb-3">
                    state, in which territory you believe the rights to be
                    infringed;
                  </li>
                  <li className="mb-3">
                    copies of documents establishing rights for an object of
                    intellectual property right, which is subject to security,
                    as well as a document that confirms powers for acting in the
                    holder&apos;s name, in attachments to your appeal.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li>
            <h1 className="mb-3">Govering law and jurisdiction</h1>
            <ol className="text-[16px] font-normal">
              <li className="mb-3">
                These Terms shall be governed in accordance with the laws of the
                Republic of Nigeria.
              </li>
              <li className="mb-3">
                Any dispute arising out of or in connection with these Terms,
                including any question regarding its existence, validity or
                termination, shall be referred to and finally resolved by
                arbitration under the Arbitration and Conciliation Act (Cap.
                A18) of the Republic of Nigeria. The number of arbitrators shall
                be one. The seat of arbitration shall be Lagos, Nigeria. The
                language to be used in the arbitral proceedings shall be
                English.
              </li>
            </ol>
          </li>
          <li>
            <h1 className="mb-3">Miscellaneous Provisions</h1>
            <ol className="text-[16px] font-normal">
              <li className="mb-3">
                Except as otherwise provided, if any provision of these Terms is
                held to be invalid, void, or for any reason unenforceable, such
                provision shall be struck out and shall not affect the validity
                and enforceability of the remaining provisions.
              </li>
              <li className="mb-3">
                We may transfer and assign any and all of our rights and
                obligations under these Terms to any other person, by any way,
                including by novation, and by accepting these Terms you give us
                consent to any such transfer or assignment.
              </li>
              <li className="mb-3">
                If we fail to take any action with respect to your breach of
                these Terms, we will still be entitled to use our rights and
                remedies in any other situation where you breach these Terms.
              </li>
              <li className="mb-3">
                In no event shall the BELLEFU be liable for any failure to
                comply with these Terms to the extent that such failure arises
                from factors outside the BELLEFU's reasonable control.
              </li>
            </ol>
          </li>
          <li>
            <h1 className="mb-3">Bellefu Contest Rules</h1>
            <p className="text-[16px] font-normal">
              According to the applicable provisions of the tax legislation of
              Nigeria the Company will apply a withholding tax to your award,
              therefore you may receive your award less respective withholding
              tax as applied. You are hereby informed and acknowledge that the
              ultimate responsibility for your federal, state and municipal
              individual income taxes and/or other taxes related to the award
              and legally applicable to you, is and remains your responsibility
              and may exceed the amount actually withheld by the Company.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TermsandConditions;
